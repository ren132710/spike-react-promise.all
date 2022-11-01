import { useState, useEffect } from 'react';

const URL = 'https://hn.algolia.com/api/v1/search';
// const URL = 'https://hn.algolia.com/api/v1/search-BAD';

export default function useHackerNews() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) return;
    let ignore = false;

    console.log(parseSearchValue(search));

    const fetchData = async () => {
      setIsLoading(true);
      const results = await getSearchResults(
        parseSearchValue(search),
      );
      setData(results);
      setIsLoading(false);
    };

    if (!ignore) fetchData();
    // prevent setting component state if component is unmounted
    // (i.e.user navigates away from page before fetch completes)
    return () => {
      ignore = true;
    };
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

    try {
      const response = await fetch(`${URL}?query=${query.query}`);
      console.log('response: ', response);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log('ERROR: ', error);
      setIsError(true);
    }
  }

  return [{ data, isError, isLoading }, setSearch];
}

function parseSearchValue(value) {
  //remove white spaces
  const v = value.replace(/\s/g, '');
  // return array of search terms
  return v.split(',').map((item) => {
    return { query: item };
  });
}
