import React from 'react';
import './styles.css';

export default function Form(props) {
  if (!props) return;
  const { handleClick, setSearch, search } = props;

  return (
    <form
      onClick={(e) => {
        handleClick();
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
