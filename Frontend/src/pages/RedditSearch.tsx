import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/useAuthContext";
import Spinner from '../components/ui/Spinner';

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

interface RedditOembed {
  provider_url: string;
  title: string;
  html: string;
  thumbnail_width: number;
  height: number;
  width: number;
  version: string;
  author_name: string;
  provider_name: string;
  thumbnail_url: string;
  type: string;
  thumbnail_height: number;
  author_url: string;
}

interface RedditMedia {
  oembed: RedditOembed;
  type: string;
}

interface RedditPost {
  title: string;
  upvote_ratio: number;
  thumbnail: string;
  selftext: string;
  author: string;
  permalink: string;
  is_video: boolean;
  subreddit: string;
  media: RedditMedia | null;
  icon_img: string;
}


interface RedditUserProfile {
  total_karma: number;
}

export default function RedditSearch() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [influencerAuthors, setInfluencerAuthors] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceTimeoutRef = useRef<number | null>(null);
  const { user, sendEmailVerificationLink, status, loading, incrementSearches, incrementInfluencer } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponse = await axios.get(`http://www.reddit.com/r/${searchTerm}/new.json?sort=new`);
        const postList = searchResponse.data.data.children.map((child: any) => ({
          title: child.data.title,
          upvote_ratio: child.data.upvote_ratio,
          thumbnail: child.data.thumbnail,
          selftext: child.data.selftext,
          author: child.data.author,
          permalink: child.data.permalink,
          is_video: child.data.is_video,
          subreddit: child.data.subreddit,
          media: child.data.media,
          icon_img: '',
        }));

        setPosts(postList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (searchTerm != "" && searchTerm != null) {
        fetchData();
        incrementSearches();
      }
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  useEffect(() => {
    const checkInfluencers = async () => {
      const newInfluencerAuthors = new Set<string>();
      for (const post of posts) {
        try {
          const userResponse = await axios.get(`https://www.reddit.com/user/${post.author}/about.json`);
          if (userResponse.data.data.total_karma > 50000) {
            newInfluencerAuthors.add(post.author);
          }
          post.icon_img = userResponse.data.data.icon_img
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setInfluencerAuthors(newInfluencerAuthors);
    };

    checkInfluencers();
  }, [posts]);


  const getPostUrl = (post: RedditPost) => {
    return `https://www.reddit.com${post.permalink}`;
  };

  const getUserProfileUrl = (username: string) => {
    return `https://www.reddit.com/user/${username}`;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = async () => {
    await incrementInfluencer();
  }

  return (
    <div className="p-4">
      {!user?.email_verified_at && (
        <div className="p-4 emailconfirm flex items-center gap-x-10">
          <p className="text-sm font-bold emailconfirm">
            Please verify your email address.
          </p>
          <button
            className="emailconfirmbtn py-1.5 px-4 text-lg flex items-center gap-x-2 disabled:cursor-not-allowed"
            onClick={sendEmailVerificationLink}
            disabled={loading}
          >
            {loading && <Spinner loading={loading} />}
            <span>Verify</span>
          </button>
        </div>
      )}
      <div className="flex space-x-4 pt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a Subreddit..."
          className="block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6"
        />
      </div>

      <div className="mt-4">
        {posts.map((post, index) => (
          <a
            key={index}
            href={getPostUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col md:flex-row items-start border p-2 mb-4 shadow-md ${influencerAuthors.has(post.author) ? 'emailconfirm ' : ' notactivelink'}`}
            onClick={influencerAuthors.has(post.author) ? handleClick :  undefined}
          >
            <div className="md:mr-4 md:w-1/4">
              {post.subreddit && (
                <div className="flex items-center">
                  <a href={"https://reddit.com/r/" + post.subreddit}>
                    <img
                      src={post.icon_img}
                      alt={`${post.subreddit} Icon`}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className={`text-sm hover:underline ${influencerAuthors.has(post.author) ? 'emailconfirm ' : ''}`}>r/{post.subreddit}</span>
                  </a>
                </div>
              )}
              <p className="text-sm mt-1 text-gray-500">
                <a
                  href={getUserProfileUrl(post.author)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm hover:underline ${influencerAuthors.has(post.author) ? 'emailconfirm ' : ''}`}
                >
                  Posted by: {post.author}
                </a>
              </p>
              <p className="mt-1">Upvote Ratio: {Math.round(post.upvote_ratio * 100)}%</p>
            </div>

            <div className="flex-grow md:w-3/4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              {post.media && post.media.oembed && (
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: decodeHtml(post.media.oembed.html) }} />
              )}
              {post.selftext && (
                <p className="mt-2">
                  {post.selftext.length > 600 ? `${post.selftext.slice(0, 600)}...` : post.selftext}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};