import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';
import List from './List';
import '../styles.css';

/**
 * Axios without hook - no Cors errors
 */

const AXIOS_TIMEOUT = 10000;
const URL = 'https://hn.algolia.com/api/v1/search';
// const URL = 'https://hn.algolia.com/api/v1/search-BAD';

export default function AppAxiosNoHook() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(
    'react,hooks,promise.all,ethereum',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // initialize page with results from default search terms
  useEffect(() => {
    console.log('useEffect: I run only once');
    handleClick();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queries = parseSearchValue(search);
  // console.log('queries: ', queries);

  async function getHackerNewsData(options) {
    const { query } = options;
    setIsError(false);

    try {
      const result = await axios.get(URL, {
        // mode: 'no-cors',
        timeout: `${AXIOS_TIMEOUT}`,
        params: { query },
      });

      // console.log('result: ', result);
      return result.data;
    } catch (error) {
      console.log('ERROR: ', error);
      setIsError(true);
    }
  }

  async function getSearchResults(queries) {
    let promises = [];

    queries.forEach((query) => {
      const promise = getHackerNewsData(query);
      promises.push(promise);
    });

    const searchResults = await Promise.all(promises);
    return searchResults;
  }

  async function handleClick() {
    setIsLoading(true);
    const results = await getSearchResults(queries);
    setData(results);
    setIsLoading(false);
  }

  function parseSearchValue(value) {
    //remove white spaces
    const v = value.replace(/\s/g, '');
    // return array of search terms
    return v.split(',').map((item) => {
      return { query: item };
    });
  }

  return (
    <div className="container">
      <h3>Enter search terms separated by comma</h3>
      <Form
        search={search}
        handleClick={handleClick}
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
