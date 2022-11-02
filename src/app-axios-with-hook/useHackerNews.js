import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Axios with hook - causes Cors errors, which do not seem to be resolvable
 */

const AXIOS_TIMEOUT = 10000;
const URL = 'https://hn.algolia.com/api/v1/search';
// const URL = 'https://hn.algolia.com/api/v1/search-BAD';

export default function useHackerNews() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    const fetchData = async () => {
      setIsLoading(true);
      const results = await getSearchResults(
        parseSearchValue(search),
      );
      setData(results);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function getSearchResults(queries) {
    let promises = [];

    queries.forEach((query) => {
      const promise = getHackerNews(query);
      promises.push(promise);
    });

    const searchResults = await Promise.all(promises);
    return searchResults;
  }

  async function getHackerNews(query) {
    setIsError(false);

    // options fail to resolve Cors error
    try {
      const result = await axios.get(URL, {
        // mode: 'no-cors',
        timeout: `${AXIOS_TIMEOUT}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Methods':
          //   'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        params: { query },
      });

      return result.data;
    } catch (error) {
      console.log('ERROR: ', error);
      setIsError(true);
    }
  }

  return [{ data, isError, isLoading }, setSearch];
}

function parseSearchValue(value) {
  console.log('parseSearchValue: ', value);
  //remove white spaces
  const v = value.replace(/\s/g, '');
  // return array of search terms
  return v.split(',').map((item) => {
    return { query: item };
  });
}
