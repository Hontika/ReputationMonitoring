import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import axios from "axios";
import Graph from "../components/ui/Graph";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Home() {
  const { user, sendEmailVerificationLink, status, loading, incrementGraph } =
    useAuthContext();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [companyInput, setCompanyInput] = useState<string>("");
  const [redditInput, setRedditInput] = useState<string>("");
  const [graphData, setGraphData] = useState<{ date: string; y: number }[]>([]);
  const [label, setLabel] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeID, setPlaceID] = useState<string>("");

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesService({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    });

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/companies");
      setSuggestions(response.data);
    } catch (error) {
      toast.error("Error fetching companies");
    }
  };

  const fetchReviews = async () => {
    if (!placeID) {
      toast.error("No place ID available");
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY; // Secure handling is crucial
    const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.result) {
        console.log("Fetched place details:", response.data.result);
        const { reviews, name, rating, user_ratings_total } =
          response.data.result;

        if (reviews && reviews.length) {
          // Extracting and preparing review data
          const latestReviews = reviews.slice(0, 5).map((review) => ({
            authorName: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time * 1000, // Keep as milliseconds for sorting
          }));

          // Sort reviews by date in ascending order
          latestReviews.sort((a, b) => a.time - b.time);

          // Optionally convert times to readable dates or use as-is in graph
          const sortedGraphData = latestReviews.map((review) => ({
            date: new Date(review.time).toLocaleDateString(), // Convert time back to a readable date
            y: review.rating,
          }));

          console.log("Sorted reviews by date:", sortedGraphData);
          setGraphData(sortedGraphData);
          setLabel(`${name} - 5 latest reviews`);
        }
      }
    } catch (error) {
      toast.error("Error fetching review details: " + error.message);
    }
  };

  useEffect(() => {
    if (selectedOption === "option1" && companyInput) {
      getPlacePredictions({ input: companyInput });
    }
  }, [companyInput, selectedOption]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphData([]);
    setLabel("");
    setSelectedOption(event.target.value);
    setInputValue("");
    setCompanyInput("");
    setRedditInput("");
    if (event.target.value === "option2") {
      fetchCompanies();
    } else {
      setSuggestions([]);
    }
  };

  const handleCompanyInputChange = (event) => {
    setCompanyInput(event.target.value);
    if (event.target.value) {
      getPlacePredictions({ input: event.target.value });
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectPrediction = (prediction) => {
    setCompanyInput(prediction.description);
    setInputValue(prediction.description);
    setLabel(prediction.description);
    setPlaceID(prediction.place_id);
    setShowSuggestions(false); // Hide suggestions when a prediction is selected
  };

  /*const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (selectedOption === "option1") {
      setCompanyInput(value);
    } else if (selectedOption === "option2") {
      setRedditInput(value);
      const filteredSuggestions = suggestions.filter((company) =>
        company.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };*/

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Input field cannot be empty");
      return;
    }
    if (selectedOption === "option1") {
      await incrementGraph();
      fetchReviews();
    }
    if (selectedOption === "option2") {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/company_data/${inputValue}`
        );
        const fetchedData = response.data.map((item) => ({
          date: item.created_at,
          y: item.y,
        }));
        setGraphData(fetchedData);
        setLabel(selectedOption === "option2" ? `r/${inputValue}` : inputValue);
        await incrementGraph();
      } catch (error) {
        toast.error("Error fetching subreddit data");
      }
    }
  };

  useEffect(() => {
    if (status) {
      toast.success(status);
    }
  }, [status]);

  const getLabel = () => {
    switch (selectedOption) {
      case "option1":
        return "Company Name";
      case "option2":
        return "Subreddit Name";
      case "option3":
        return "Twitter Username";
      default:
        return "Text Input";
    }
  };

  return (
    <>
      {user && !user?.email_verified_at && (
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
      {user && (
        <h1 className="text-lg italic py-6">
          Hello, <strong className="not-italic">{user?.name}</strong>!
        </h1>
      )}
      <div className="flex flex-col gap-4 items-center justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="optionSelect"
            >
              Choose which platform you want a graph from
            </label>
            <select
              id="optionSelect"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-800"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select your platform
              </option>
              <option value="option1">Company Reviews</option>
              <option value="option2">Reddit</option>
              <option value="option3" disabled>
                Twitter
              </option>
            </select>
          </div>
          {selectedOption === "option1" && (
            <div className="mb-4 relative">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="textInput"
              >
                {getLabel()}
              </label>
              <input
                type="text"
                id="textInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
                value={companyInput}
                onChange={handleCompanyInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
              />
              {isPlacePredictionsLoading && <div>Loading...</div>}
              {showSuggestions && placePredictions.length > 0 && (
                <ul className="absolute z-10 list-none bg-white mt-1 w-full rounded shadow-lg">
                  {placePredictions.map((prediction, index) => (
                    <li
                      key={index}
                      className="border-t border-gray-300 last:border-b hover:bg-gray-100 cursor-pointer px-3 py-2 text-slate-800"
                      onClick={() => selectPrediction(prediction)}
                    >
                      {prediction.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {selectedOption === "option2" && (
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="selectInput"
              >
                {getLabel()}
              </label>
              {Array.isArray(suggestions) && suggestions.length > 0 && (
                <select
                  id="selectInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  value={redditInput}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setRedditInput(e.target.value);
                    setLabel(`r/${e.target.value}`); // Update label when selecting a subreddit
                  }}
                >
                  <option value="" disabled>
                    Select a subreddit
                  </option>
                  {suggestions.map((suggestion) => (
                    <option key={suggestion.id} value={suggestion.reddit}>
                      {suggestion.reddit}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
        {graphData.length > 0 && <Graph data={graphData} label={label} />}
      </div>
    </>
  );
}
