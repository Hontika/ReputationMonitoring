import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/ui/Spinner";
import axios from "axios";
import Graph from "../components/ui/Graph";

export default function Home() {
  const { user, sendEmailVerificationLink, status, loading } = useAuthContext();
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [inputValue, setInputValue] = useState<string>("");
  const [graphData, setGraphData] = useState<
    { date: string; rating: number }[]
  >([]);
  const [label, setLabel] = useState<string>("");

  //console.log(import.meta.env.VITE_SERPAPI_KEY);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate fetching data based on the selected option and input value
    const fetchedData = [
      { date: "2024-01-01", rating: 4 },
      { date: "2024-01-02", rating: 5 },
      { date: "2024-01-03", rating: 3 },
    ]; // Replace this with your actual data fetching logic

    setGraphData(fetchedData);
    setLabel(inputValue);
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
      <h1 className="text-lg italic py-6">
        Hello, <strong className="not-italic">{user?.name}</strong>!
      </h1>
      <div className="flex flex-col gap-4 items-center justify-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="optionSelect"
            >
              Choose which platfrom you want a graph from
            </label>
            <select
              id="optionSelect"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-slate-800"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="option1">Company Reviews</option>
              <option value="option2">Reddit</option>
              <option value="option3" disabled>
                Twitter
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="textInput">
              {getLabel()}
            </label>
            <input
              type="text"
              id="textInput"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
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
