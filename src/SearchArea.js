import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import useDropdown from "./useDropdown";

const SearchArea = () => {
  const [keyword, setKeyword] = useState("");
  const [videos, setVideos] = useState([]);
  
  const [checked, setChecked] = useState(false);
  const [order, OrderDropdown] = useDropdown("Order By", "relevance", [
    "date",
    "relevance",
    "rating",
  ]);
  const [safeSearch, SafesearchDropdown] = useDropdown("Safe Search", "none", [
    "moderate",
    "none",
    "strict",
  ]);

  async function requestSearch() {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=25&q=${keyword}&key=${process.env.API_KEY}`
      )
      .then((res) => {
        const { items } = res.data;
        console.log(items);
        setVideos(items || []);
      })
      .catch((err) => console.log(err));

    console.log("Video request submitted");
  }

  return (
    <div className="search-area">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestSearch();
        }}
      >
        <label htmlFor="keyword">
          Search
          <input
            id="keyword"
            value={keyword}
            placeholder="Search Keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <label htmlFor="advance">
          Advance Search 
        <input
            type="checkbox"
            id="advance"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </label>
        {checked ? (
          <div>
            <OrderDropdown />
            <SafesearchDropdown />
          </div>
        ) : null}
        <OrderDropdown />
        <button>Submit</button>
      </form>
      <Results videos={videos} />
    </div>
  );
};

export default SearchArea;
