import React from 'react';
import { v4 } from 'uuid';

export default function List(props) {
  if (!props.results) return;
  const { results } = props;

  return (
    <ul>
      {results.hits.map((item) => (
        <li key={v4()}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
