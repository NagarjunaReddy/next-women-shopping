import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import products from "../../utils/data/products";

type AutoSuggestProps = {
  fetchSuggestions: (query: string) => Promise<string[]>;
};

const fetchId =  (query: string): string => {
  return products.filter((item) =>
    item.name.includes(query)
  )[0].id ?? 1;
};

const AutoSuggest: React.FC<AutoSuggestProps> = ({ fetchSuggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query).then(setSuggestions);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, fetchSuggestions]);

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowSuggestions(false);
    router.push(`/product/${fetchId(value)}`);
  };

  return (
    <div className="auto-suggest">
      <input
        type="text" 
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="search for products..."
        className="suggest-text"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
          listStyle: 'none',
          background: 'grey',
          border: '1px solid #ccc',
          zIndex: 10,
        }}>
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSelect(item)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
