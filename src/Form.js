import React from 'react';

export default function Form(props) {
  if (!props) return;
  const { handleClick, setSearch, search } = props;

  return (
    <form
      onClick={(e) => {
        handleClick(search);
        e.preventDefault();
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
