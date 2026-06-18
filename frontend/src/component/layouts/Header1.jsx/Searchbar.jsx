import React from "react";
import { SearchOutlined, CloseOutlined } from "@mui/icons-material";
import "./Searchbar.css";

const Search = ({
  handleSearchButtonClick,
  handleCrossButtonClick,
  searchBarActive,
  handleSearchFormSubmit,
  handleSearchInputChange,
  searchValue,
}) => {
  if (!searchBarActive) {
    return (
      <button
        type="button"
        className="searchToggleButton"
        onClick={handleSearchButtonClick}
        aria-label="Open search"
      >
        <SearchOutlined />
      </button>
    );
  }

  return (
    <form className="searchBarRoot" onSubmit={handleSearchFormSubmit}>
      <button
        type="submit"
        className="searchInsideButton searchInsideSearchButton"
        aria-label="Search"
      >
        <SearchOutlined />
      </button>

      <input
        type="text"
        className="searchInput"
        placeholder="Search cricket gear..."
        value={searchValue}
        onChange={handleSearchInputChange}
        autoFocus
      />

      <button
        type="button"
        className="searchInsideButton searchInsideCloseButton"
        onClick={handleCrossButtonClick}
        aria-label="Close search"
      >
        <CloseOutlined />
      </button>
    </form>
  );
};

export default Search;