import React, { useState, useEffect } from 'react';
import useHackerNews from './useHackerNews';
import Form from './Form';
import List from './List';

export default function App() {
  const [search, setSearch] = useState(
    'react,hooks,promise.all,ethereum',
  );
  const [{ data, isLoading, isError }, fetchHackerNews] =
    useHackerNews();

  // initialize page
  useEffect(() => {
    console.log('search: ', search);
    console.log('useEffect: I run only once');
    fetchHackerNews(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h3>Enter search terms separated by comma</h3>
      <Form
        search={search}
        handleClick={fetchHackerNews}
        setSearch={setSearch}
      />
      {isError ? (
        <div
          style={{
            padding: '.5rem',
            color: 'red',
          }}
        >
          Oops, something went wrong...
        </div>
      ) : (
        <>
          {isLoading ? (
            <div
              style={{
                padding: '.5rem',
              }}
            >
              Loading...
            </div>
          ) : (
            data.map((results) => <List results={results} />)
          )}
        </>
      )}
    </div>
  );
}
