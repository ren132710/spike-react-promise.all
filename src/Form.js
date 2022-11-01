import React from 'react';

export default function Form(props) {
  if (!props) return;
  const { fetchHackerNews, setSearch, search } = props;

  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        fetchHackerNews(search);
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
