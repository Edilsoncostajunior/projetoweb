'use client'
import React from 'react';
import style from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  return (
    <div className={`${style.search_bar}`}>
      <button>
        <i className="fa fa-search text-black" />
      </button>
      <input
        className={`${style.search_bar_input}`}
        type="search"
        placeholder="Buscar"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
