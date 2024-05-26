import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuthContext from "../hooks/useAuthContext";

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
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();

  const test = {
    "kind": "Listing",
    "data": {
      "after": "t3_1cximeg",
      "dist": 25,
      "modhash": "51t8ri1j7l4cba125b68ea0430c631c9cce7f2d8940f546742",
      "geo_filter": "",
      "children": [
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "Welcome to the Daily Advice Thread for /r/Apple. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.\n\nHave a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.\n\nJoin our Discord and IRC chat rooms for support:\n\n* [Discord](https://discord.gg/apple)\n* [IRC](https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME)\n\nNote: Comments are sorted by /new for your convenience.\n\n[Here is an archive](https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;sort=new&amp;t=all) of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar \\[author:\"AutoModerator\" title:\"Daily Advice Thread\" or title:\"Daily Tech Support Thread\"\\] (without the brackets, and including the quotation marks around the titles and author.)\n\n**The Daily Advice Thread is posted each day at 06:00 AM EST (**[Click HERE for other timezones](https://www.wolframalpha.com/input/?i=6+AM+USA+EST)**) and then the old one is archived.** It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.",
            "author_fullname": "t2_6l4z3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Daily Advice Thread - May 26, 2024",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Support Thread"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "megathread",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": true,
            "name": "t3_1d0y307",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.89,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 7,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Support Thread",
            "can_mod_post": false,
            "score": 7,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716717631,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Welcome to the Daily Advice Thread for &lt;a href=\"/r/Apple\"&gt;/r/Apple&lt;/a&gt;. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.&lt;/p&gt;\n\n&lt;p&gt;Have a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.&lt;/p&gt;\n\n&lt;p&gt;Join our Discord and IRC chat rooms for support:&lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;&lt;a href=\"https://discord.gg/apple\"&gt;Discord&lt;/a&gt;&lt;/li&gt;\n&lt;li&gt;&lt;a href=\"https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME\"&gt;IRC&lt;/a&gt;&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;p&gt;Note: Comments are sorted by /new for your convenience.&lt;/p&gt;\n\n&lt;p&gt;&lt;a href=\"https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;amp;sort=new&amp;amp;t=all\"&gt;Here is an archive&lt;/a&gt; of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar [author:&amp;quot;AutoModerator&amp;quot; title:&amp;quot;Daily Advice Thread&amp;quot; or title:&amp;quot;Daily Tech Support Thread&amp;quot;] (without the brackets, and including the quotation marks around the titles and author.)&lt;/p&gt;\n\n&lt;p&gt;&lt;strong&gt;The Daily Advice Thread is posted each day at 06:00 AM EST (&lt;/strong&gt;&lt;a href=\"https://www.wolframalpha.com/input/?i=6+AM+USA+EST\"&gt;Click HERE for other timezones&lt;/a&gt;&lt;strong&gt;) and then the old one is archived.&lt;/strong&gt; It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": "new",
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "c2a1fcec-af92-11eb-9b65-0e0f3ca038eb",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#5a74cc",
            "id": "1d0y307",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "AutoModerator",
            "discussion_type": null,
            "num_comments": 0,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1d0y307/daily_advice_thread_may_26_2024/",
            "parent_whitelist_status": "all_ads",
            "stickied": true,
            "url": "https://www.reddit.com/r/apple/comments/1d0y307/daily_advice_thread_may_26_2024/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716717631,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_90oxbhct",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Craig Federighi Running Meme | Apple WWDC 2022",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPadOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 105,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1d0w3ue",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.45,
            "author_flair_background_color": null,
            "ups": 0,
            "total_awards_received": 0,
            "media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/1WQpPWV95KY?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Apple WWDC 2022 Did I just Watch Craig Federighi Running?\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "height": 200
            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": {
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "title": "Apple WWDC 2022 Did I just Watch Craig Federighi Running?",
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/1WQpPWV95KY?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Apple WWDC 2022 Did I just Watch Craig Federighi Running?\"&gt;&lt;/iframe&gt;",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "version": "1.0",
                "author_name": "AxRm ",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/1WQpPWV95KY/hqdefault.jpg",
                "type": "video",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@axrmtech"
              },
              "type": "youtube.com"
            },
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/1WQpPWV95KY?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Apple WWDC 2022 Did I just Watch Craig Federighi Running?\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "media_domain_url": "https://www.redditmedia.com/mediaembed/1d0w3ue",
              "height": 200
            },
            "link_flair_text": "iPadOS",
            "can_mod_post": false,
            "score": 0,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/X247omcMktijHC7__MwxecPwOser6C_7tNgOrtwAYTU.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "rich:video",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716708510,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "youtu.be",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://youtu.be/1WQpPWV95KY",
            "view_count": null,
            "archived": false,
            "no_follow": true,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/kbmo6Cv_s83SshtD5mGeWHKCkidGWLGWIuu1SrbQFu8.jpg?auto=webp&amp;s=e2a1c7d0681f14f40f5124d30f685d6a02765171",
                    "width": 480,
                    "height": 360
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/kbmo6Cv_s83SshtD5mGeWHKCkidGWLGWIuu1SrbQFu8.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=a896fa7f99c146422e0fef6b9215be4748f244b2",
                      "width": 108,
                      "height": 81
                    },
                    {
                      "url": "https://external-preview.redd.it/kbmo6Cv_s83SshtD5mGeWHKCkidGWLGWIuu1SrbQFu8.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=b7401b1af716d5e8ec604435bff4b7d553c6971b",
                      "width": 216,
                      "height": 162
                    },
                    {
                      "url": "https://external-preview.redd.it/kbmo6Cv_s83SshtD5mGeWHKCkidGWLGWIuu1SrbQFu8.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=fa741be2f72ee2916ac1676a77bf0b2f6b6813bc",
                      "width": 320,
                      "height": 240
                    }
                  ],
                  "variants": {

                  },
                  "id": "huWxc67yI-CPqCpMU62VGdlUwHhWR454Q2YVlLs-ZjA"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "eccfafe6-5701-11e9-95da-0e66e94b17fc",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#d43a7f",
            "id": "1d0w3ue",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "Wonderful_Land5953",
            "discussion_type": null,
            "num_comments": 5,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1d0w3ue/craig_federighi_running_meme_apple_wwdc_2022/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://youtu.be/1WQpPWV95KY",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716708510,
            "num_crossposts": 0,
            "media": {
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "title": "Apple WWDC 2022 Did I just Watch Craig Federighi Running?",
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/1WQpPWV95KY?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Apple WWDC 2022 Did I just Watch Craig Federighi Running?\"&gt;&lt;/iframe&gt;",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "version": "1.0",
                "author_name": "AxRm ",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/1WQpPWV95KY/hqdefault.jpg",
                "type": "video",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@axrmtech"
              },
              "type": "youtube.com"
            },
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "My ranking\n\n1. Mac (my favorite computer)\n\n2. AirPods (AirPods Pro is the best sounding earbuds I can fir in my pocket)\n\n3. AirTag (lifesaver but useless without an iPhone)\n\n4. iPhone (recent iteration kinda good)\n\n5. iPad (recent M4 is beautiful but still an iPad, love the iPad but it seems that there is no innovation, longer battery life please)\n\n6. Apple Watch (sorry but I don’t want it, it is not bad, but I can do all of that on iPhone except for health tracking)\n\n7. Apple TV (some enjoyed it, some don’t)\n\n8. HomePod (Siri do I even need to explain)\n\n  \nHaven’t used Vision Pro before\n\n",
            "author_fullname": "t2_em88qizwg",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "How would you rank the current product categories of Apple",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Low Quality Article 👎"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1d0rkmi",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.32,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 0,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Low Quality Article 👎",
            "can_mod_post": false,
            "score": 0,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716690502,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;My ranking&lt;/p&gt;\n\n&lt;ol&gt;\n&lt;li&gt;&lt;p&gt;Mac (my favorite computer)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;AirPods (AirPods Pro is the best sounding earbuds I can fir in my pocket)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;AirTag (lifesaver but useless without an iPhone)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;iPhone (recent iteration kinda good)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;iPad (recent M4 is beautiful but still an iPad, love the iPad but it seems that there is no innovation, longer battery life please)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;Apple Watch (sorry but I don’t want it, it is not bad, but I can do all of that on iPhone except for health tracking)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;Apple TV (some enjoyed it, some don’t)&lt;/p&gt;&lt;/li&gt;\n&lt;li&gt;&lt;p&gt;HomePod (Siri do I even need to explain)&lt;/p&gt;&lt;/li&gt;\n&lt;/ol&gt;\n\n&lt;p&gt;Haven’t used Vision Pro before&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": true,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "9cc39d20-6997-11ee-a102-0ee23dd82c64",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#dadada",
            "id": "1d0rkmi",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "Zestyclose_Cake_5644",
            "discussion_type": null,
            "num_comments": 57,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1d0rkmi/how_would_you_rank_the_current_product_categories/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reddit.com/r/apple/comments/1d0rkmi/how_would_you_rank_the_current_product_categories/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716690502,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "Welcome to the Daily Advice Thread for /r/Apple. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.\n\nHave a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.\n\nJoin our Discord and IRC chat rooms for support:\n\n* [Discord](https://discord.gg/apple)\n* [IRC](https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME)\n\nNote: Comments are sorted by /new for your convenience.\n\n[Here is an archive](https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;sort=new&amp;t=all) of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar \\[author:\"AutoModerator\" title:\"Daily Advice Thread\" or title:\"Daily Tech Support Thread\"\\] (without the brackets, and including the quotation marks around the titles and author.)\n\n**The Daily Advice Thread is posted each day at 06:00 AM EST (**[Click HERE for other timezones](https://www.wolframalpha.com/input/?i=6+AM+USA+EST)**) and then the old one is archived.** It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.",
            "author_fullname": "t2_6l4z3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Daily Advice Thread - May 25, 2024",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Support Thread"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "megathread",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1d08o2k",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.67,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 9,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Support Thread",
            "can_mod_post": false,
            "score": 9,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716631230,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Welcome to the Daily Advice Thread for &lt;a href=\"/r/Apple\"&gt;/r/Apple&lt;/a&gt;. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.&lt;/p&gt;\n\n&lt;p&gt;Have a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.&lt;/p&gt;\n\n&lt;p&gt;Join our Discord and IRC chat rooms for support:&lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;&lt;a href=\"https://discord.gg/apple\"&gt;Discord&lt;/a&gt;&lt;/li&gt;\n&lt;li&gt;&lt;a href=\"https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME\"&gt;IRC&lt;/a&gt;&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;p&gt;Note: Comments are sorted by /new for your convenience.&lt;/p&gt;\n\n&lt;p&gt;&lt;a href=\"https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;amp;sort=new&amp;amp;t=all\"&gt;Here is an archive&lt;/a&gt; of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar [author:&amp;quot;AutoModerator&amp;quot; title:&amp;quot;Daily Advice Thread&amp;quot; or title:&amp;quot;Daily Tech Support Thread&amp;quot;] (without the brackets, and including the quotation marks around the titles and author.)&lt;/p&gt;\n\n&lt;p&gt;&lt;strong&gt;The Daily Advice Thread is posted each day at 06:00 AM EST (&lt;/strong&gt;&lt;a href=\"https://www.wolframalpha.com/input/?i=6+AM+USA+EST\"&gt;Click HERE for other timezones&lt;/a&gt;&lt;strong&gt;) and then the old one is archived.&lt;/strong&gt; It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": "new",
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "c2a1fcec-af92-11eb-9b65-0e0f3ca038eb",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#5a74cc",
            "id": "1d08o2k",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "AutoModerator",
            "discussion_type": null,
            "num_comments": 35,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1d08o2k/daily_advice_thread_may_25_2024/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reddit.com/r/apple/comments/1d08o2k/daily_advice_thread_may_25_2024/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716631230,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_5n4nhzvz",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Fortnite returning to iOS in the UK in second half of 2025",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 78,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czx1ar",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.84,
            "author_flair_background_color": null,
            "ups": 262,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iOS",
            "can_mod_post": false,
            "score": 262,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/nRzmlXHo6Hf0xbRqMSpwj9cOqj5EiqCEZomF3T_bYwU.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716589329,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "x.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://x.com/fortnitegame/status/1794096002762244392?s=46",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?auto=webp&amp;s=c9856c2e42474ad08f7dbdb7ec825e2626d36b72",
                    "width": 1920,
                    "height": 1080
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=bd2ff9c99bf398ab3bb90fa1283f2e01fe9fbcf4",
                      "width": 108,
                      "height": 60
                    },
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=c982d2c445e1423560804d6dce5bcad097bacb41",
                      "width": 216,
                      "height": 121
                    },
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=84b39836f4adb0fb2a1c47aeba3898d8493e8649",
                      "width": 320,
                      "height": 180
                    },
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=2f77b8e1a2591f7cd3a01c6a4a08c0713fc1b274",
                      "width": 640,
                      "height": 360
                    },
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=c5179215ca69da3931b9e77f4250ce5138511cbb",
                      "width": 960,
                      "height": 540
                    },
                    {
                      "url": "https://external-preview.redd.it/T946uVftX8XnQgjg-zYOSRPg2cW8tVifBHVK4fdIcio.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=0979ce270e941041db0331369b94eab1f8931842",
                      "width": 1080,
                      "height": 607
                    }
                  ],
                  "variants": {

                  },
                  "id": "kv3WN6FYTgdBeEPr3rjonaJo2qLV3zYPVxkUpfY_VUk"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "e9b1d532-5701-11e9-87f1-0edf28c73d02",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#f4a221",
            "id": "1czx1ar",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "digidude23",
            "discussion_type": null,
            "num_comments": 57,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czx1ar/fortnite_returning_to_ios_in_the_uk_in_second/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://x.com/fortnitegame/status/1794096002762244392?s=46",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716589329,
            "num_crossposts": 1,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_iwmgb",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "What the Hell Happened to Apple?",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPhone"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 93,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czsyub",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.15,
            "author_flair_background_color": null,
            "ups": 0,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPhone",
            "can_mod_post": false,
            "score": 0,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/wA2-VHiKSDOKk7RfsqJ1HnDbXqP8Qu74PRldc57KIso.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716578602,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "slate.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://slate.com/technology/2024/05/apple-100-best-albums-list-crush-commercial-downfall.html",
            "view_count": null,
            "archived": false,
            "no_follow": true,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?auto=webp&amp;s=cfda788ea44ea83bf70e27a2eacfbe70b959c373",
                    "width": 1560,
                    "height": 1040
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=64af71995ae606c098a59a6cd33064da8dfe7c57",
                      "width": 108,
                      "height": 72
                    },
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=ea7c6df797ec9c10dd334d53f761646dbb4144fc",
                      "width": 216,
                      "height": 144
                    },
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=82c26759784d50c128e326665d4697bc6bfcca55",
                      "width": 320,
                      "height": 213
                    },
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=fb2fb44c8f770eaf844270a0c568d889e502635d",
                      "width": 640,
                      "height": 426
                    },
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=d91b66b13da0841cc3e749b9186454335e71c291",
                      "width": 960,
                      "height": 640
                    },
                    {
                      "url": "https://external-preview.redd.it/dqVTYGA_gQKo-ybZzAqpnaygVzvFgvVSMbFtRB_wZ1c.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=a26f5a4318423914fd908833e10bcd75ed7b227a",
                      "width": 1080,
                      "height": 720
                    }
                  ],
                  "variants": {

                  },
                  "id": "VyIU7unU-8K6D3x5rB1JSj_wVSDTx0AB8ZnjwgZEyb4"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "cf1ba144-5701-11e9-bb30-0e88b6a1dfbc",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#314c57",
            "id": "1czsyub",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "PurplePlan",
            "discussion_type": null,
            "num_comments": 86,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czsyub/what_the_hell_happened_to_apple/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://slate.com/technology/2024/05/apple-100-best-albums-list-crush-commercial-downfall.html",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716578602,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_osqx4",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "The UK passes its version of the EU's Digital Markets Act",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Discussion"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 93,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czs8wr",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.94,
            "author_flair_background_color": null,
            "ups": 249,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Discussion",
            "can_mod_post": false,
            "score": 249,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://a.thumbs.redditmedia.com/3IVxR-8ysskSONfGMw5bQk9yxpW2ifbjHcQcwEt1Ru4.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716576767,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "engadget.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.engadget.com/the-uk-passes-its-version-of-the-eus-digital-markets-act-175642166.html?src=rss&amp;guccounter=1",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?auto=webp&amp;s=dfa5c60db9ac8bea2f488778b4c8aa5b8b3edb67",
                    "width": 1199,
                    "height": 800
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=783bd22c70faf8b49513f8cfc716b09c7b9aaa3e",
                      "width": 108,
                      "height": 72
                    },
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=9a1f7cf89b99019aec28b72f0df6034ec7c327da",
                      "width": 216,
                      "height": 144
                    },
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=77ff1d4d539518fe94104db5bdab89ef57eb1bc0",
                      "width": 320,
                      "height": 213
                    },
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=179df21b9201545019336dfd1d733c41dd78233d",
                      "width": 640,
                      "height": 427
                    },
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=1a0275866505cf663a43e5b857c395f1f96d0d90",
                      "width": 960,
                      "height": 640
                    },
                    {
                      "url": "https://external-preview.redd.it/SLMB1PD4mEKVSFHHmM1PA5hesIOedw2h1xkEIyOeg80.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=6cee1c01b5f0821a7a15a050563c48c4cd682c2b",
                      "width": 1080,
                      "height": 720
                    }
                  ],
                  "variants": {

                  },
                  "id": "tTIIFa4h7lGenxDWmnua78qW4Gxl7L1QTgCM1z_DkPU"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "86b258de-5702-11e9-98ce-0eebcac587ec",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#ff66ac",
            "id": "1czs8wr",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "ssg509",
            "discussion_type": null,
            "num_comments": 63,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czs8wr/the_uk_passes_its_version_of_the_eus_digital/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.engadget.com/the-uk-passes-its-version-of-the-eus-digital-markets-act-175642166.html?src=rss&amp;guccounter=1",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716576767,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_b6gspa7s",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple built a Tetris clone for the iPod but never released it",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPod"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 78,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czrdfu",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.97,
            "author_flair_background_color": null,
            "ups": 465,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPod",
            "can_mod_post": false,
            "score": 465,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/x3-0by2EkT74PGF421N-UytrLq4KpT7mEZdL40mhOeg.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716574503,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "engadget.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.engadget.com/apple-built-a-tetris-clone-for-the-ipod-but-never-released-it-173810144.html",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?auto=webp&amp;s=4c3361afebd1e3809464e350b3d77101566bbd44",
                    "width": 1200,
                    "height": 675
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=fe4fc1daca3beef52afcd087629817738fcf916f",
                      "width": 108,
                      "height": 60
                    },
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=188c3c6346ebf551da134c63ccd3bb03e5f6640d",
                      "width": 216,
                      "height": 121
                    },
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=3936ac5d41337a2aedef9deaabf3e9544ef15fc2",
                      "width": 320,
                      "height": 180
                    },
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=f23f4d66ebe97410a58b9dfbb82757ea568fa508",
                      "width": 640,
                      "height": 360
                    },
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=fe94bf6c15a1eb346c7706240796e06f6e2cbe21",
                      "width": 960,
                      "height": 540
                    },
                    {
                      "url": "https://external-preview.redd.it/wgSOe9n0Cav6VYNQ4iL-xSINGN1e2PV07irwFKHoD30.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=d5d6e8b1c8f72d0f14105cea53745ba2b51f6726",
                      "width": 1080,
                      "height": 607
                    }
                  ],
                  "variants": {

                  },
                  "id": "lxIy5oKq9FQitPA-VaRx8QcjHl0mVi5msfa82J8LKII"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "d37b0cc0-5701-11e9-a3f7-0ee35a59e0fa",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#e4d2bc",
            "id": "1czrdfu",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "ScootSchloingo",
            "discussion_type": null,
            "num_comments": 41,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czrdfu/apple_built_a_tetris_clone_for_the_ipod_but_never/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.engadget.com/apple-built-a-tetris-clone-for-the-ipod-but-never-released-it-173810144.html",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716574503,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_8nhu3tn3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple Reportedly Developing OLED iPad Mini for 2026",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPad"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 78,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czkml1",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.95,
            "author_flair_background_color": null,
            "ups": 948,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPad",
            "can_mod_post": false,
            "score": 948,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/4JVl8NQpfVApMhJQ4K2GON8Iz3qycthDN3E3S_A-duw.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716556976,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "macrumors.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.macrumors.com/2024/05/24/apple-developing-oled-ipad-mini-for-2026/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?auto=webp&amp;s=8eee06f918de5aad0177f1cbe2faff136b0f5caf",
                    "width": 1920,
                    "height": 1080
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=671861b07bfb18e0993010d1dbfb048b79fcb4af",
                      "width": 108,
                      "height": 60
                    },
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=012e79163ee7b179871efa544a38de14970da7a4",
                      "width": 216,
                      "height": 121
                    },
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=3b3b8e0cc7f1cdcd4fdf7684db964990f410f0f7",
                      "width": 320,
                      "height": 180
                    },
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=75c361826e5e51a52fdae656b360b803e335a479",
                      "width": 640,
                      "height": 360
                    },
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=80aab01377649a7006530cc3b170f77cab78f259",
                      "width": 960,
                      "height": 540
                    },
                    {
                      "url": "https://external-preview.redd.it/A-svYH-nUxF295qakWHK6femyzdZt_8yFI_XtjrvYvc.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=696c5f0368badb5722b15c0b5f13619a94bc0abc",
                      "width": 1080,
                      "height": 607
                    }
                  ],
                  "variants": {

                  },
                  "id": "Ony-45Cf4_8110qOQFqNkGKacfdDy0e_jKOchuvZzCg"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "d1c5f976-5701-11e9-a2bd-0e424fabf6d2",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#eac2ba",
            "id": "1czkml1",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "ReBeLwInGs1994",
            "discussion_type": null,
            "num_comments": 317,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czkml1/apple_reportedly_developing_oled_ipad_mini_for/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.macrumors.com/2024/05/24/apple-developing-oled-ipad-mini-for-2026/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716556976,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "Welcome to the Daily Advice Thread for /r/Apple. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.\n\nHave a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.\n\nJoin our Discord and IRC chat rooms for support:\n\n* [Discord](https://discord.gg/apple)\n* [IRC](https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME)\n\nNote: Comments are sorted by /new for your convenience.\n\n[Here is an archive](https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;sort=new&amp;t=all) of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar \\[author:\"AutoModerator\" title:\"Daily Advice Thread\" or title:\"Daily Tech Support Thread\"\\] (without the brackets, and including the quotation marks around the titles and author.)\n\n**The Daily Advice Thread is posted each day at 06:00 AM EST (**[Click HERE for other timezones](https://www.wolframalpha.com/input/?i=6+AM+USA+EST)**) and then the old one is archived.** It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.",
            "author_fullname": "t2_6l4z3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Daily Advice Thread - May 24, 2024",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Support Thread"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "megathread",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1czh5xn",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.3,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 0,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Support Thread",
            "can_mod_post": false,
            "score": 0,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716544839,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Welcome to the Daily Advice Thread for &lt;a href=\"/r/Apple\"&gt;/r/Apple&lt;/a&gt;. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.&lt;/p&gt;\n\n&lt;p&gt;Have a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.&lt;/p&gt;\n\n&lt;p&gt;Join our Discord and IRC chat rooms for support:&lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;&lt;a href=\"https://discord.gg/apple\"&gt;Discord&lt;/a&gt;&lt;/li&gt;\n&lt;li&gt;&lt;a href=\"https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME\"&gt;IRC&lt;/a&gt;&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;p&gt;Note: Comments are sorted by /new for your convenience.&lt;/p&gt;\n\n&lt;p&gt;&lt;a href=\"https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;amp;sort=new&amp;amp;t=all\"&gt;Here is an archive&lt;/a&gt; of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar [author:&amp;quot;AutoModerator&amp;quot; title:&amp;quot;Daily Advice Thread&amp;quot; or title:&amp;quot;Daily Tech Support Thread&amp;quot;] (without the brackets, and including the quotation marks around the titles and author.)&lt;/p&gt;\n\n&lt;p&gt;&lt;strong&gt;The Daily Advice Thread is posted each day at 06:00 AM EST (&lt;/strong&gt;&lt;a href=\"https://www.wolframalpha.com/input/?i=6+AM+USA+EST\"&gt;Click HERE for other timezones&lt;/a&gt;&lt;strong&gt;) and then the old one is archived.&lt;/strong&gt; It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": "new",
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": true,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "c2a1fcec-af92-11eb-9b65-0e0f3ca038eb",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#5a74cc",
            "id": "1czh5xn",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "AutoModerator",
            "discussion_type": null,
            "num_comments": 34,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1czh5xn/daily_advice_thread_may_24_2024/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reddit.com/r/apple/comments/1czh5xn/daily_advice_thread_may_24_2024/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716544839,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_yuw3j",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple elaborates on iOS 17.5 bug that resurfaced deleted photos",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPhone"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 73,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cz7dsu",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.96,
            "author_flair_background_color": null,
            "ups": 985,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPhone",
            "can_mod_post": false,
            "score": 985,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/9hxbSyv3AoVUj78CfQH5yPzecG0oNyrFj9btyrhYkzQ.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716508361,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "9to5mac.com",
            "allow_live_comments": true,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://9to5mac.com/2024/05/23/apple-deleted-photos-resurfacing-explanation/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?auto=webp&amp;s=2ef8e60dc41cdc194d723c7742f629a16f8b3f1e",
                    "width": 1200,
                    "height": 628
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=ec3c2d6181b7af69632b6a0c5999e6efde8b486b",
                      "width": 108,
                      "height": 56
                    },
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=4daf89c4b9828cde2f5eee30448d25a4462fa058",
                      "width": 216,
                      "height": 113
                    },
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=aef484e329d5b3c4bf4729ea22de173a3372f492",
                      "width": 320,
                      "height": 167
                    },
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=bb7a9778fc99f50a2c4e253dbf431f5917ceed31",
                      "width": 640,
                      "height": 334
                    },
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=c576c29f80a5bec17684416ebeb0d07fc52ac614",
                      "width": 960,
                      "height": 502
                    },
                    {
                      "url": "https://external-preview.redd.it/nU0avNgMkAlti7S7pNxIuXMZGQoi6M-ua9vUDIKeBzw.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=5bb97215eb52e8e09c00c998bc218458a56f6756",
                      "width": 1080,
                      "height": 565
                    }
                  ],
                  "variants": {

                  },
                  "id": "ldci2pOWfWjc-Ld2lWCqlYQdNWNzLnEyc5pI6TOWp9w"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "cf1ba144-5701-11e9-bb30-0e88b6a1dfbc",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#314c57",
            "id": "1cz7dsu",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "M337ING",
            "discussion_type": null,
            "num_comments": 207,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cz7dsu/apple_elaborates_on_ios_175_bug_that_resurfaced/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://9to5mac.com/2024/05/23/apple-deleted-photos-resurfacing-explanation/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716508361,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_5yeaq",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "macOS 15 will include new UI elements and reorganized system settings",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "macOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 78,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cz2o9x",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.96,
            "author_flair_background_color": "",
            "ups": 1059,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "macOS",
            "can_mod_post": false,
            "score": 1059,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "https://b.thumbs.redditmedia.com/gFqtMHz9hupFcAT4agvo5GiT8D14NC6qzewXf8aWMxM.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716495737,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "appleinsider.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://appleinsider.com/articles/24/05/23/system-settings-getting-shuffled-again-in-macos-15-among-other-ui-tweaks",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?auto=webp&amp;s=bf3ff183020d1dc7648304875b84b41d601cb373",
                    "width": 1312,
                    "height": 738
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=e95983a3ef6441341718ff39e478850ceb92c9fb",
                      "width": 108,
                      "height": 60
                    },
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=91e1bc8ae7e2d08217146287df380623fb21e900",
                      "width": 216,
                      "height": 121
                    },
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=f6eb9fb48df66cdf7ed66ad3af9687bbb3873b3a",
                      "width": 320,
                      "height": 180
                    },
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=e580e30c2214cba4848a895f9fa7f10f627ea413",
                      "width": 640,
                      "height": 360
                    },
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=f360f75360bfd6b24c04f91e567d05d6f492578c",
                      "width": 960,
                      "height": 540
                    },
                    {
                      "url": "https://external-preview.redd.it/cju8J0s93PC2IeAugtaNZumRrBXL6eb381755XcnZlk.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=a57c688242986720ef30ea5a230e2fb55bcb7d0b",
                      "width": 1080,
                      "height": 607
                    }
                  ],
                  "variants": {

                  },
                  "id": "knrF8kVQasz1tlQbOv9-HtY6N5vtTmBvs2aPBwmzScQ"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "ee3e47ca-5701-11e9-80c7-0e9eeaee42a6",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": "",
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#1d93f7",
            "id": "1cz2o9x",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "walktall",
            "discussion_type": null,
            "num_comments": 301,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": "",
            "permalink": "/r/apple/comments/1cz2o9x/macos_15_will_include_new_ui_elements_and/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://appleinsider.com/articles/24/05/23/system-settings-getting-shuffled-again-in-macos-15-among-other-ui-tweaks",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716495737,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_eqz7pw6yo",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Tandem OLED Explained | The New iPad Pro's REAL Magic",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPad"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 105,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cyx3ze",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.85,
            "author_flair_background_color": null,
            "ups": 182,
            "total_awards_received": 0,
            "media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/OAyEPaQ3YnM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Tandem OLED Explained | The New iPad Pro&amp;#39;s REAL Magic\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "height": 200
            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": {
              "type": "youtube.com",
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "version": "1.0",
                "title": "Tandem OLED Explained | The New iPad Pro's REAL Magic",
                "type": "video",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/OAyEPaQ3YnM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Tandem OLED Explained | The New iPad Pro&amp;#39;s REAL Magic\"&gt;&lt;/iframe&gt;",
                "author_name": "Digital Trends",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/OAyEPaQ3YnM/hqdefault.jpg",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@digitaltrends"
              }
            },
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/OAyEPaQ3YnM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Tandem OLED Explained | The New iPad Pro&amp;#39;s REAL Magic\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "media_domain_url": "https://www.redditmedia.com/mediaembed/1cyx3ze",
              "height": 200
            },
            "link_flair_text": "iPad",
            "can_mod_post": false,
            "score": 182,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/XjeLCbrCC_3Dz3YfJaxC-R5zqxQuJMhQClWryRq203A.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "rich:video",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716481929,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "youtube.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.youtube.com/watch?v=OAyEPaQ3YnM",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/6pTNxP9QKIMItRDERV6nMSQwvumD35buH-KX_yGfnqw.jpg?auto=webp&amp;s=219f05f463924d98db53201bb19618a057b067e6",
                    "width": 480,
                    "height": 360
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/6pTNxP9QKIMItRDERV6nMSQwvumD35buH-KX_yGfnqw.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=175314bc56c3332370e82ab2dcafe3cec0068388",
                      "width": 108,
                      "height": 81
                    },
                    {
                      "url": "https://external-preview.redd.it/6pTNxP9QKIMItRDERV6nMSQwvumD35buH-KX_yGfnqw.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=9ff039fdd7ddd65de3501344685574b8fa968ab7",
                      "width": 216,
                      "height": 162
                    },
                    {
                      "url": "https://external-preview.redd.it/6pTNxP9QKIMItRDERV6nMSQwvumD35buH-KX_yGfnqw.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=34275daa53b36e95dc095e10dee13e6bf7486d05",
                      "width": 320,
                      "height": 240
                    }
                  ],
                  "variants": {

                  },
                  "id": "1kHEwWLN2nJSRRx5d211OIHPTuaftGc0jE1fal0gbx0"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "d1c5f976-5701-11e9-a2bd-0e424fabf6d2",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#eac2ba",
            "id": "1cyx3ze",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "atlwhore_",
            "discussion_type": null,
            "num_comments": 117,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cyx3ze/tandem_oled_explained_the_new_ipad_pros_real_magic/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.youtube.com/watch?v=OAyEPaQ3YnM",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716481929,
            "num_crossposts": 0,
            "media": {
              "type": "youtube.com",
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "version": "1.0",
                "title": "Tandem OLED Explained | The New iPad Pro's REAL Magic",
                "type": "video",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/OAyEPaQ3YnM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"Tandem OLED Explained | The New iPad Pro&amp;#39;s REAL Magic\"&gt;&lt;/iframe&gt;",
                "author_name": "Digital Trends",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/OAyEPaQ3YnM/hqdefault.jpg",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@digitaltrends"
              }
            },
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_4b37s",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Pixelmator Pro 3.6 Archipelago supercharges masking with AI and vector masks",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "macOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 73,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cywzo9",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.95,
            "author_flair_background_color": null,
            "ups": 102,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "macOS",
            "can_mod_post": false,
            "score": 102,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/PUCHVr-s5SkSXEX7B3rCC2_wy-0w7IyHzPzAm3ChwWY.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716481628,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "pixelmator.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.pixelmator.com/blog/2024/05/23/pixelmator-pro-3-6-adds-vector-masks-and-lets-you-hide-backgrounds-with-a-click/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?auto=webp&amp;s=e7b73c6360bcb5596148d63635e5241b6de15893",
                    "width": 1200,
                    "height": 627
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=88fa7a9d492f75384bb9225007a8bf8bff05d7b0",
                      "width": 108,
                      "height": 56
                    },
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=c4391568282451b41c15f8457db79fc412d9dccd",
                      "width": 216,
                      "height": 112
                    },
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=3ad83b76534923323e02642a35d455451b06537f",
                      "width": 320,
                      "height": 167
                    },
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=6b28d37933fc7ff29fde63c3e3d21de0e934a25a",
                      "width": 640,
                      "height": 334
                    },
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=22caaca3a6cf5344b52e4ef2de86d95d41ab0c11",
                      "width": 960,
                      "height": 501
                    },
                    {
                      "url": "https://external-preview.redd.it/Aw9T1IrmaHFD-WlrP63fTSrZOI6FtqoJ3Ffv-yw-GQI.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=bfffcea542e92bbd38620933caf13359259da961",
                      "width": 1080,
                      "height": 564
                    }
                  ],
                  "variants": {

                  },
                  "id": "5QpHyd10HUh32K2LSiwn6Qx6RO2t-vfObwMHoxLSAe8"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "ee3e47ca-5701-11e9-80c7-0e9eeaee42a6",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#1d93f7",
            "id": "1cywzo9",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "SciGuy013",
            "discussion_type": null,
            "num_comments": 20,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cywzo9/pixelmator_pro_36_archipelago_supercharges/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.pixelmator.com/blog/2024/05/23/pixelmator-pro-3-6-adds-vector-masks-and-lets-you-hide-backgrounds-with-a-click/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716481628,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_cx89x",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple Launches Tap to Pay on iPhone in Canada",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Apple Retail"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 73,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cywvjt",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.95,
            "author_flair_background_color": null,
            "ups": 390,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Apple Retail",
            "can_mod_post": false,
            "score": 390,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/lO_f5zbpxzH0tyFjv_hCOuGTgUl_uKPIcmlkW2oiQHM.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716481341,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "apple.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.apple.com/ca/newsroom/2024/05/apple-launches-tap-to-pay-on-iphone-in-canada/#:~:text=Tap%20to%20Pay%20on%20iPhone%20enables%20businesses%20to%20seamlessly%20and,a%20partner%2Denabled%20iOS%20app.",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?auto=webp&amp;s=387358dd9fb3c0c7c4950cc63e2fd6ae186db33b",
                    "width": 1200,
                    "height": 630
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=41c3a1c931856b86d19e5e82d009dba035bdab97",
                      "width": 108,
                      "height": 56
                    },
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=8634dbf7cb3b2aaae366ab950732843d95fc4672",
                      "width": 216,
                      "height": 113
                    },
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=6334b24b1e986461699a21cba3fb71eccf39e38b",
                      "width": 320,
                      "height": 168
                    },
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=e5ff0f39ef2f4783d67924f25d499a2e49aed939",
                      "width": 640,
                      "height": 336
                    },
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=a7c69024b63a17b7cce8018ae5c576f0dfc9267e",
                      "width": 960,
                      "height": 504
                    },
                    {
                      "url": "https://external-preview.redd.it/bxgrYuAGwcG_v-DNgto_Xxr3Org41LrNQ85EXjVK3VA.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=12bf079930b4fdc3dcd41f9b91e23d584f0228e3",
                      "width": 1080,
                      "height": 567
                    }
                  ],
                  "variants": {

                  },
                  "id": "gF3qmS3X1Low2B_7AY9QusKyHuZ0XVwGGqOanq5ARqU"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "7eddd214-5702-11e9-ba86-0edb459f6e1e",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#00a6a5",
            "id": "1cywvjt",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "FreshAsFebreze",
            "discussion_type": null,
            "num_comments": 84,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cywvjt/apple_launches_tap_to_pay_on_iphone_in_canada/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.apple.com/ca/newsroom/2024/05/apple-launches-tap-to-pay-on-iphone-in-canada/#:~:text=Tap%20to%20Pay%20on%20iPhone%20enables%20businesses%20to%20seamlessly%20and,a%20partner%2Denabled%20iOS%20app.",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716481341,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_yuw3j",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Nightdive Studios confirm Linux and macOS ports of System Shock are cancelled",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Mac"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 79,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cyvg2m",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.95,
            "author_flair_background_color": null,
            "ups": 480,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Mac",
            "can_mod_post": false,
            "score": 480,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/jADG0LsFv2kssKAHJKDjaIDgiXP1Idgvn6Opg1TKJmA.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716477826,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "gamingonlinux.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.gamingonlinux.com/2024/05/nightdive-studios-confirm-linux-and-macos-ports-of-system-shock-are-cancelled/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/S9pQw6Xmanw-MUSGzHHn87umZv6-gLDrE85vT9IgnqU.jpg?auto=webp&amp;s=fd99cb504ea4c8f81c2fd571fc1ed22d5d15bd45",
                    "width": 740,
                    "height": 420
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/S9pQw6Xmanw-MUSGzHHn87umZv6-gLDrE85vT9IgnqU.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=76510fe5f1f5652fce70d7b3417c3356c8eae0d1",
                      "width": 108,
                      "height": 61
                    },
                    {
                      "url": "https://external-preview.redd.it/S9pQw6Xmanw-MUSGzHHn87umZv6-gLDrE85vT9IgnqU.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=ec2437c70e82e905a09f26ed15b004e28dd0cb30",
                      "width": 216,
                      "height": 122
                    },
                    {
                      "url": "https://external-preview.redd.it/S9pQw6Xmanw-MUSGzHHn87umZv6-gLDrE85vT9IgnqU.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=6e2f18426ae815452204cfc5c4bd0f6d34ac78ec",
                      "width": 320,
                      "height": 181
                    },
                    {
                      "url": "https://external-preview.redd.it/S9pQw6Xmanw-MUSGzHHn87umZv6-gLDrE85vT9IgnqU.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=3e610576d2e6f4e5ce32a817b16b4e67a6b9b7b5",
                      "width": 640,
                      "height": 363
                    }
                  ],
                  "variants": {

                  },
                  "id": "1gkKFlM4UtYDo1RRQVH_k_Fb2C9QQ-bRQHDAk_tJLQQ"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "cb64da0c-5701-11e9-afcb-0ef51e89245a",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#fbd58c",
            "id": "1cyvg2m",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "M337ING",
            "discussion_type": null,
            "num_comments": 121,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cyvg2m/nightdive_studios_confirm_linux_and_macos_ports/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.gamingonlinux.com/2024/05/nightdive-studios-confirm-linux-and-macos-ports-of-system-shock-are-cancelled/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716477826,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "Welcome to the Daily Advice Thread for /r/Apple. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.\n\nHave a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.\n\nJoin our Discord and IRC chat rooms for support:\n\n* [Discord](https://discord.gg/apple)\n* [IRC](https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME)\n\nNote: Comments are sorted by /new for your convenience.\n\n[Here is an archive](https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;sort=new&amp;t=all) of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar \\[author:\"AutoModerator\" title:\"Daily Advice Thread\" or title:\"Daily Tech Support Thread\"\\] (without the brackets, and including the quotation marks around the titles and author.)\n\n**The Daily Advice Thread is posted each day at 06:00 AM EST (**[Click HERE for other timezones](https://www.wolframalpha.com/input/?i=6+AM+USA+EST)**) and then the old one is archived.** It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.",
            "author_fullname": "t2_6l4z3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Daily Advice Thread - May 23, 2024",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Support Thread"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "megathread",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cyp56g",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.63,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 4,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Support Thread",
            "can_mod_post": false,
            "score": 4,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716458435,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Welcome to the Daily Advice Thread for &lt;a href=\"/r/Apple\"&gt;/r/Apple&lt;/a&gt;. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.&lt;/p&gt;\n\n&lt;p&gt;Have a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.&lt;/p&gt;\n\n&lt;p&gt;Join our Discord and IRC chat rooms for support:&lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;&lt;a href=\"https://discord.gg/apple\"&gt;Discord&lt;/a&gt;&lt;/li&gt;\n&lt;li&gt;&lt;a href=\"https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME\"&gt;IRC&lt;/a&gt;&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;p&gt;Note: Comments are sorted by /new for your convenience.&lt;/p&gt;\n\n&lt;p&gt;&lt;a href=\"https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;amp;sort=new&amp;amp;t=all\"&gt;Here is an archive&lt;/a&gt; of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar [author:&amp;quot;AutoModerator&amp;quot; title:&amp;quot;Daily Advice Thread&amp;quot; or title:&amp;quot;Daily Tech Support Thread&amp;quot;] (without the brackets, and including the quotation marks around the titles and author.)&lt;/p&gt;\n\n&lt;p&gt;&lt;strong&gt;The Daily Advice Thread is posted each day at 06:00 AM EST (&lt;/strong&gt;&lt;a href=\"https://www.wolframalpha.com/input/?i=6+AM+USA+EST\"&gt;Click HERE for other timezones&lt;/a&gt;&lt;strong&gt;) and then the old one is archived.&lt;/strong&gt; It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": "new",
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "c2a1fcec-af92-11eb-9b65-0e0f3ca038eb",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#5a74cc",
            "id": "1cyp56g",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "AutoModerator",
            "discussion_type": null,
            "num_comments": 62,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cyp56g/daily_advice_thread_may_23_2024/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reddit.com/r/apple/comments/1cyp56g/daily_advice_thread_may_23_2024/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716458435,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_d4vuc",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple challenges $2 bln EU antitrust fine at EU court",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 73,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cyjidc",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.92,
            "author_flair_background_color": null,
            "ups": 224,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iOS",
            "can_mod_post": false,
            "score": 224,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://a.thumbs.redditmedia.com/z_IuflcgRiuKLiBZ_Tw6gEFU2ejgGmFZPjGgY3Tlca8.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716435865,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "reuters.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.reuters.com/technology/apple-challenges-2-bln-eu-antitrust-fine-eu-court-2024-05-22/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?auto=webp&amp;s=c92c112cd29514713c9cf12ab21f11f57b4f368c",
                    "width": 1920,
                    "height": 1005
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=cfb90f493cbc620ab27d41f9a2b24784de548126",
                      "width": 108,
                      "height": 56
                    },
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=e4337352aeda97df6ea2bc6640f9d3c23bdd9bb4",
                      "width": 216,
                      "height": 113
                    },
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=a7db94b8e6dbb8f2e905ff0be12ca757923827b6",
                      "width": 320,
                      "height": 167
                    },
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=99a1442ec017107751eb17a9d2a8346f4e96b393",
                      "width": 640,
                      "height": 335
                    },
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=402e9437ad6dd42c5d38d53fbbbaa0c0681e1d9c",
                      "width": 960,
                      "height": 502
                    },
                    {
                      "url": "https://external-preview.redd.it/XbLq135t2-hdf96T26efytaNk0P6reMSVno-C72zqpk.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=8b1f258e8fe438d605b77f2a962a1dd9deaa6d0c",
                      "width": 1080,
                      "height": 565
                    }
                  ],
                  "variants": {

                  },
                  "id": "qso-vxf26bYeffFiRE-mhpO2pLCBhuHsyUBxbXuRNdY"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "e9b1d532-5701-11e9-87f1-0edf28c73d02",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#f4a221",
            "id": "1cyjidc",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "Zipoo",
            "discussion_type": null,
            "num_comments": 66,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cyjidc/apple_challenges_2_bln_eu_antitrust_fine_at_eu/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reuters.com/technology/apple-challenges-2-bln-eu-antitrust-fine-eu-court-2024-05-22/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716435865,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_w899mf4n",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Japan aims to curb Apple and Google's smartphone app duopoly",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPhone"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 92,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cyaotn",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.94,
            "author_flair_background_color": null,
            "ups": 646,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPhone",
            "can_mod_post": false,
            "score": 646,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/ccThYUQp9QmQ7qMSnQvouJOjJk5-bEl9dVnFbOdxi-M.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716410368,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "japantimes.co.jp",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.japantimes.co.jp/business/2024/05/22/tech/smartphone-apps-competition-bill/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?auto=webp&amp;s=3e15319502f0c3235c3ad20281fcc20d79ba3e4e",
                    "width": 1000,
                    "height": 663
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=8090f5a498ab8df0f20f9033105b038a3731859a",
                      "width": 108,
                      "height": 71
                    },
                    {
                      "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=e7990574fc0bfccc24474be6e6f893f0a7ae7ec1",
                      "width": 216,
                      "height": 143
                    },
                    {
                      "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=59a195e95a84e47582fff88503340d15f407c8ca",
                      "width": 320,
                      "height": 212
                    },
                    {
                      "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=7abadd5f65f9a4a50fb14ab2b77498aeac3b3516",
                      "width": 640,
                      "height": 424
                    },
                    {
                      "url": "https://external-preview.redd.it/LmbVUs-i9DEFAN9X9O10V___jx_jAf8ZkvcPGBeeQEw.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=f140c260bcfc035a2d8807720f0416b7119d95ad",
                      "width": 960,
                      "height": 636
                    }
                  ],
                  "variants": {

                  },
                  "id": "rcuMbuthmCbxAMyrdeNe_-zXV6Wa1gr__aXouIHov78"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "cf1ba144-5701-11e9-bb30-0e88b6a1dfbc",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#314c57",
            "id": "1cyaotn",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "FollowingFeisty5321",
            "discussion_type": null,
            "num_comments": 263,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cyaotn/japan_aims_to_curb_apple_and_googles_smartphone/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.japantimes.co.jp/business/2024/05/22/tech/smartphone-apps-competition-bill/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716410368,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_6en525oc",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "M4 Performance Analysis - Geekrwan - English Subtitles",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPad"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 105,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cy9xpv",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.86,
            "author_flair_background_color": null,
            "ups": 105,
            "total_awards_received": 0,
            "media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/EbDPvcbilCs?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"苹果M4性能分析：尽力了，但芯片工艺快到头了！\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "height": 200
            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": {
              "type": "youtube.com",
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "version": "1.0",
                "title": "苹果M4性能分析：尽力了，但芯片工艺快到头了！",
                "type": "video",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/EbDPvcbilCs?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"苹果M4性能分析：尽力了，但芯片工艺快到头了！\"&gt;&lt;/iframe&gt;",
                "author_name": "极客湾Geekerwan",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/EbDPvcbilCs/hqdefault.jpg",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@geekerwan1024"
              }
            },
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/EbDPvcbilCs?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"苹果M4性能分析：尽力了，但芯片工艺快到头了！\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "media_domain_url": "https://www.redditmedia.com/mediaembed/1cy9xpv",
              "height": 200
            },
            "link_flair_text": "iPad",
            "can_mod_post": false,
            "score": 105,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/Uq28QRVfbqp8oHS1jwaj-wibIqHFz08RdaRHMQF2-3U.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "rich:video",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716408425,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "youtu.be",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://youtu.be/EbDPvcbilCs?si=rfrgbN7KE-Ufn1vb",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/3D2NHDUEcRZI--O9DQSlrdB6JNE-UmNuNCDbIUIqIyM.jpg?auto=webp&amp;s=3441436a205a0b37fc82a368a15fb3fcea447664",
                    "width": 480,
                    "height": 360
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/3D2NHDUEcRZI--O9DQSlrdB6JNE-UmNuNCDbIUIqIyM.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=e1e259ee3acd1bdfdef374cc4fdd4f0fd19c5ca8",
                      "width": 108,
                      "height": 81
                    },
                    {
                      "url": "https://external-preview.redd.it/3D2NHDUEcRZI--O9DQSlrdB6JNE-UmNuNCDbIUIqIyM.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=303d26efa8890d6f37ad95f2ca5992538ce9e7e7",
                      "width": 216,
                      "height": 162
                    },
                    {
                      "url": "https://external-preview.redd.it/3D2NHDUEcRZI--O9DQSlrdB6JNE-UmNuNCDbIUIqIyM.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=d91480f4608045f62dd95f3c7c88ad9ecefbb760",
                      "width": 320,
                      "height": 240
                    }
                  ],
                  "variants": {

                  },
                  "id": "PM_3YhF9ULVAecO0N2QG-_szsx4JR48x-601GP-tiAI"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "d1c5f976-5701-11e9-a2bd-0e424fabf6d2",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#eac2ba",
            "id": "1cy9xpv",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "Alive_Wedding",
            "discussion_type": null,
            "num_comments": 56,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cy9xpv/m4_performance_analysis_geekrwan_english_subtitles/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://youtu.be/EbDPvcbilCs?si=rfrgbN7KE-Ufn1vb",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716408425,
            "num_crossposts": 0,
            "media": {
              "type": "youtube.com",
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "version": "1.0",
                "title": "苹果M4性能分析：尽力了，但芯片工艺快到头了！",
                "type": "video",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/EbDPvcbilCs?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"苹果M4性能分析：尽力了，但芯片工艺快到头了！\"&gt;&lt;/iframe&gt;",
                "author_name": "极客湾Geekerwan",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/EbDPvcbilCs/hqdefault.jpg",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@geekerwan1024"
              }
            },
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_r7jd7",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Marvel's 'What If…?' app launching May 30",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Apple Vision"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 73,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cy6uh5",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.88,
            "author_flair_background_color": null,
            "ups": 252,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Apple Vision",
            "can_mod_post": false,
            "score": 252,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/1gjNXOIQP9003Z_aBDlFwpXRgW5YCwqdLG1w8biJLPo.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716400987,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "9to5mac.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://9to5mac.com/2024/05/22/ready-to-become-a-vision-pro-superhero/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?auto=webp&amp;s=f5873bdb0862429cdea4f2b116b53f4fe810f126",
                    "width": 1200,
                    "height": 628
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=3ef33344a1acdd4d3b52d137c4b01f78a0cc8697",
                      "width": 108,
                      "height": 56
                    },
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=5fb5a046864de6485d14088ce0a34df0b203d60b",
                      "width": 216,
                      "height": 113
                    },
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=096ef444c7bbd82873ca6a7b5d6d08e10543f0a5",
                      "width": 320,
                      "height": 167
                    },
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=d7a193cfb0041759203cf3cae416a17f2baf7316",
                      "width": 640,
                      "height": 334
                    },
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=9b610a712e2ee0e4deb752da1fa68a4387080cfa",
                      "width": 960,
                      "height": 502
                    },
                    {
                      "url": "https://external-preview.redd.it/aIFRpKP1_5pc9APjgmu-8BLHdmviNsra3mHJL0k1fyY.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=6a11f81db8d5bdce0ef0490508eab3fa5a5255a5",
                      "width": 1080,
                      "height": 565
                    }
                  ],
                  "variants": {

                  },
                  "id": "5uAHJyUQpwrAoSjY7Tc8yJn5dPMjndgDbwGPP7ltdiQ"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "8781a81e-03d8-11ee-8702-52d617fb8e78",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#00a6a5",
            "id": "1cy6uh5",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "Furkansimsir",
            "discussion_type": null,
            "num_comments": 21,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cy6uh5/marvels_what_if_app_launching_may_30/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://9to5mac.com/2024/05/22/ready-to-become-a-vision-pro-superhero/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716400987,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_hejs1",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Updating from macOS Ventura to Sonoma silently enables iCloud Keychain",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "macOS"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cy1usj",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.89,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 462,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "macOS",
            "can_mod_post": false,
            "score": 462,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "default",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": false,
            "mod_note": null,
            "created": 1716388778,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "lapcatsoftware.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://lapcatsoftware.com/articles/2024/5/3.html",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "ee3e47ca-5701-11e9-80c7-0e9eeaee42a6",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#1d93f7",
            "id": "1cy1usj",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "IronCraftMan",
            "discussion_type": null,
            "num_comments": 72,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cy1usj/updating_from_macos_ventura_to_sonoma_silently/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://lapcatsoftware.com/articles/2024/5/3.html",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716388778,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "Welcome to the Daily Advice Thread for /r/Apple. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.\n\nHave a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.\n\nJoin our Discord and IRC chat rooms for support:\n\n* [Discord](https://discord.gg/apple)\n* [IRC](https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME)\n\nNote: Comments are sorted by /new for your convenience.\n\n[Here is an archive](https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;sort=new&amp;t=all) of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar \\[author:\"AutoModerator\" title:\"Daily Advice Thread\" or title:\"Daily Tech Support Thread\"\\] (without the brackets, and including the quotation marks around the titles and author.)\n\n**The Daily Advice Thread is posted each day at 06:00 AM EST (**[Click HERE for other timezones](https://www.wolframalpha.com/input/?i=6+AM+USA+EST)**) and then the old one is archived.** It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.",
            "author_fullname": "t2_6l4z3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Daily Advice Thread - May 22, 2024",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "Support Thread"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "megathread",
            "downs": 0,
            "thumbnail_height": null,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cxwjyo",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.65,
            "author_flair_background_color": null,
            "subreddit_type": "public",
            "ups": 5,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": null,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "Support Thread",
            "can_mod_post": false,
            "score": 5,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": true,
            "thumbnail": "self",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "content_categories": null,
            "is_self": true,
            "mod_note": null,
            "created": 1716372038,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "self.apple",
            "allow_live_comments": false,
            "selftext_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Welcome to the Daily Advice Thread for &lt;a href=\"/r/Apple\"&gt;/r/Apple&lt;/a&gt;. This thread can be used to ask for technical advice regarding Apple software and hardware, to ask questions regarding the buying or selling of Apple products or to post other short questions.&lt;/p&gt;\n\n&lt;p&gt;Have a question you need answered? Ask away! Please remember to adhere to our rules, which can be found in the sidebar.&lt;/p&gt;\n\n&lt;p&gt;Join our Discord and IRC chat rooms for support:&lt;/p&gt;\n\n&lt;ul&gt;\n&lt;li&gt;&lt;a href=\"https://discord.gg/apple\"&gt;Discord&lt;/a&gt;&lt;/li&gt;\n&lt;li&gt;&lt;a href=\"https://kiwiirc.com/client/irc.snoonet.org/apple?nick=CHANGE_ME\"&gt;IRC&lt;/a&gt;&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;p&gt;Note: Comments are sorted by /new for your convenience.&lt;/p&gt;\n\n&lt;p&gt;&lt;a href=\"https://www.reddit.com/r/apple/search?q=author%3A%22AutoModerator%22+title%3A%22Daily+Advice+Thread%22+or+title%3A%22Daily+Tech+Support+Thread%22&amp;amp;sort=new&amp;amp;t=all\"&gt;Here is an archive&lt;/a&gt; of all previous Daily Advice Threads. This is best viewed on a browser. If on mobile, type in the search bar [author:&amp;quot;AutoModerator&amp;quot; title:&amp;quot;Daily Advice Thread&amp;quot; or title:&amp;quot;Daily Tech Support Thread&amp;quot;] (without the brackets, and including the quotation marks around the titles and author.)&lt;/p&gt;\n\n&lt;p&gt;&lt;strong&gt;The Daily Advice Thread is posted each day at 06:00 AM EST (&lt;/strong&gt;&lt;a href=\"https://www.wolframalpha.com/input/?i=6+AM+USA+EST\"&gt;Click HERE for other timezones&lt;/a&gt;&lt;strong&gt;) and then the old one is archived.&lt;/strong&gt; It is advised to wait for the new thread to post your question if this time is nearing for quickest answer time.&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
            "likes": null,
            "suggested_sort": "new",
            "banned_at_utc": null,
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "c2a1fcec-af92-11eb-9b65-0e0f3ca038eb",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "num_reports": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "removal_reason": null,
            "link_flair_background_color": "#5a74cc",
            "id": "1cxwjyo",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "AutoModerator",
            "discussion_type": null,
            "num_comments": 28,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cxwjyo/daily_advice_thread_may_22_2024/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.reddit.com/r/apple/comments/1cxwjyo/daily_advice_thread_may_22_2024/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716372038,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_lv3m3",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "[MKBHD] 5 Weird iPad Pro (M4) Decisions",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPad"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 105,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cxpmq1",
            "quarantine": false,
            "link_flair_text_color": "dark",
            "upvote_ratio": 0.81,
            "author_flair_background_color": null,
            "ups": 413,
            "total_awards_received": 0,
            "media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/PHcDrXeyguM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"5 Weird iPad Pro (M4) Decisions\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "height": 200
            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": {
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "title": "5 Weird iPad Pro (M4) Decisions",
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/PHcDrXeyguM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"5 Weird iPad Pro (M4) Decisions\"&gt;&lt;/iframe&gt;",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "version": "1.0",
                "author_name": "Marques Brownlee",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/PHcDrXeyguM/hqdefault.jpg",
                "type": "video",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@mkbhd"
              },
              "type": "youtube.com"
            },
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {
              "content": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/PHcDrXeyguM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"5 Weird iPad Pro (M4) Decisions\"&gt;&lt;/iframe&gt;",
              "width": 356,
              "scrolling": false,
              "media_domain_url": "https://www.redditmedia.com/mediaembed/1cxpmq1",
              "height": 200
            },
            "link_flair_text": "iPad",
            "can_mod_post": false,
            "score": 413,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://b.thumbs.redditmedia.com/au2mopgiidTmk3304vhz2XZPTYGXlUsI7T0RgTsU4QM.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "rich:video",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716344978,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "youtu.be",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://youtu.be/PHcDrXeyguM?si=Bo08ryxKONfJiYC4",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/RIiEuRid-wDjf_NucvRyNpBIqo-hEGUf1A--tdH-0Vw.jpg?auto=webp&amp;s=627b3ba4996a5d91ece68a03abd80e508edd5f64",
                    "width": 480,
                    "height": 360
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/RIiEuRid-wDjf_NucvRyNpBIqo-hEGUf1A--tdH-0Vw.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=386a31ffd757ceee6372182a07a4a603aca46b19",
                      "width": 108,
                      "height": 81
                    },
                    {
                      "url": "https://external-preview.redd.it/RIiEuRid-wDjf_NucvRyNpBIqo-hEGUf1A--tdH-0Vw.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=f33d598d5e476a4f7ac00a75fc89d18ca69523a7",
                      "width": 216,
                      "height": 162
                    },
                    {
                      "url": "https://external-preview.redd.it/RIiEuRid-wDjf_NucvRyNpBIqo-hEGUf1A--tdH-0Vw.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=a5e366caddbdfb5a7c296547e9bf64b058f467cc",
                      "width": 320,
                      "height": 240
                    }
                  ],
                  "variants": {

                  },
                  "id": "ynLsq-HbGJoXURHQ91uoRyKtYUZKX1WSIPkVHfR0qrc"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "d1c5f976-5701-11e9-a2bd-0e424fabf6d2",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#eac2ba",
            "id": "1cxpmq1",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "waddup121",
            "discussion_type": null,
            "num_comments": 366,
            "send_replies": true,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cxpmq1/mkbhd_5_weird_ipad_pro_m4_decisions/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://youtu.be/PHcDrXeyguM?si=Bo08ryxKONfJiYC4",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716344978,
            "num_crossposts": 0,
            "media": {
              "oembed": {
                "provider_url": "https://www.youtube.com/",
                "title": "5 Weird iPad Pro (M4) Decisions",
                "html": "&lt;iframe width=\"356\" height=\"200\" src=\"https://www.youtube.com/embed/PHcDrXeyguM?feature=oembed&amp;enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen title=\"5 Weird iPad Pro (M4) Decisions\"&gt;&lt;/iframe&gt;",
                "thumbnail_width": 480,
                "height": 200,
                "width": 356,
                "version": "1.0",
                "author_name": "Marques Brownlee",
                "provider_name": "YouTube",
                "thumbnail_url": "https://i.ytimg.com/vi/PHcDrXeyguM/hqdefault.jpg",
                "type": "video",
                "thumbnail_height": 360,
                "author_url": "https://www.youtube.com/@mkbhd"
              },
              "type": "youtube.com"
            },
            "is_video": false
          }
        },
        {
          "kind": "t3",
          "data": {
            "approved_at_utc": null,
            "subreddit": "apple",
            "selftext": "",
            "author_fullname": "t2_w899mf4n",
            "saved": false,
            "mod_reason_title": null,
            "gilded": 0,
            "clicked": false,
            "title": "Apple Asks Judge to Dismiss U.S. Antitrust Lawsuit",
            "link_flair_richtext": [
              {
                "e": "text",
                "t": "iPhone"
              }
            ],
            "subreddit_name_prefixed": "r/apple",
            "hidden": false,
            "pwls": 6,
            "link_flair_css_class": "user",
            "downs": 0,
            "thumbnail_height": 78,
            "top_awarded_type": null,
            "hide_score": false,
            "name": "t3_1cximeg",
            "quarantine": false,
            "link_flair_text_color": "light",
            "upvote_ratio": 0.9,
            "author_flair_background_color": null,
            "ups": 342,
            "total_awards_received": 0,
            "media_embed": {

            },
            "thumbnail_width": 140,
            "author_flair_template_id": null,
            "is_original_content": false,
            "user_reports": [],
            "secure_media": null,
            "is_reddit_media_domain": false,
            "is_meta": false,
            "category": null,
            "secure_media_embed": {

            },
            "link_flair_text": "iPhone",
            "can_mod_post": false,
            "score": 342,
            "approved_by": null,
            "is_created_from_ads_ui": false,
            "author_premium": false,
            "thumbnail": "https://a.thumbs.redditmedia.com/NpRSx2WSebIYcATYfNG0AV7D1DnVtwPq35T-0WB_qI4.jpg",
            "edited": false,
            "author_flair_css_class": null,
            "author_flair_richtext": [],
            "gildings": {

            },
            "post_hint": "link",
            "content_categories": null,
            "is_self": false,
            "subreddit_type": "public",
            "created": 1716325090,
            "link_flair_type": "richtext",
            "wls": 6,
            "removed_by_category": null,
            "banned_by": null,
            "author_flair_type": "text",
            "domain": "macrumors.com",
            "allow_live_comments": false,
            "selftext_html": null,
            "likes": null,
            "suggested_sort": null,
            "banned_at_utc": null,
            "url_overridden_by_dest": "https://www.macrumors.com/2024/05/21/apple-dismiss-antitrust-lawsuit/",
            "view_count": null,
            "archived": false,
            "no_follow": false,
            "is_crosspostable": true,
            "pinned": false,
            "over_18": false,
            "preview": {
              "images": [
                {
                  "source": {
                    "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?auto=webp&amp;s=b627d212fcb30e05680551580af18c127a96fd2e",
                    "width": 2500,
                    "height": 1406
                  },
                  "resolutions": [
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=39e3c7eb41cab4068c20b056e8a1558eefd38b17",
                      "width": 108,
                      "height": 60
                    },
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=da636c855c9a8d076239b5ee638a516d121d5d4d",
                      "width": 216,
                      "height": 121
                    },
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=18dc2e065c78c1c5b5462ad18774191b9bbfa34d",
                      "width": 320,
                      "height": 179
                    },
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=dfc4f90b1261264950a95b3af1e14c03062496b3",
                      "width": 640,
                      "height": 359
                    },
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=2ec9aa8e89ad33f920550dc6cf5fd9eaca2ee7a9",
                      "width": 960,
                      "height": 539
                    },
                    {
                      "url": "https://external-preview.redd.it/X3DsOispYlPF8pcDnNQRXJtyo90TBONQJ3zf_2TXAsU.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=da6f81b59c8581a5f64c58a134b8fbb2cfefcabe",
                      "width": 1080,
                      "height": 607
                    }
                  ],
                  "variants": {

                  },
                  "id": "25JuLsXLxtBN5yVg74nOj5LMyg4KtPn9jK3NmvYpMyY"
                }
              ],
              "enabled": false
            },
            "all_awardings": [],
            "awarders": [],
            "media_only": false,
            "link_flair_template_id": "cf1ba144-5701-11e9-bb30-0e88b6a1dfbc",
            "can_gild": false,
            "spoiler": false,
            "locked": false,
            "author_flair_text": null,
            "treatment_tags": [],
            "visited": false,
            "removed_by": null,
            "mod_note": null,
            "distinguished": null,
            "subreddit_id": "t5_2qh1f",
            "author_is_blocked": false,
            "mod_reason_by": null,
            "num_reports": null,
            "removal_reason": null,
            "link_flair_background_color": "#314c57",
            "id": "1cximeg",
            "is_robot_indexable": true,
            "report_reasons": null,
            "author": "FollowingFeisty5321",
            "discussion_type": null,
            "num_comments": 140,
            "send_replies": false,
            "whitelist_status": "all_ads",
            "contest_mode": false,
            "mod_reports": [],
            "author_patreon_flair": false,
            "author_flair_text_color": null,
            "permalink": "/r/apple/comments/1cximeg/apple_asks_judge_to_dismiss_us_antitrust_lawsuit/",
            "parent_whitelist_status": "all_ads",
            "stickied": false,
            "url": "https://www.macrumors.com/2024/05/21/apple-dismiss-antitrust-lawsuit/",
            "subreddit_subscribers": 5043446,
            "created_utc": 1716325090,
            "num_crossposts": 0,
            "media": null,
            "is_video": false
          }
        }
      ],
      "before": null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResponse = await axios.get(`http://www.reddit.com/r/${searchTerm}/new.json?sort=new`);
        // const searchResponse = test;
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

        const checkInfluencers = async () => {
          const newInfluencerAuthors = new Set<string>();
          // const newInfluencerAuthors = new Set([
          //   "AutoModerator",
          // ]);
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
        setPosts(postList);
        checkInfluencers();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm, influencerAuthors]);

  const getPostUrl = (post: RedditPost) => {
    return `https://www.reddit.com${post.permalink}`;
  };

  const getUserProfileUrl = (username: string) => {
    return `https://www.reddit.com/user/${username}`;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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