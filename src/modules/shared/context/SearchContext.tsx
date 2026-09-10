import React, { createContext, useContext, useState } from 'react';

interface SearchContextValue {
  isActive: boolean;
  query: string;
  placeholder: string;
  setQuery: (value: string) => void;
  registerSearch: (
    placeholder: string,
    query: string,
    onChange: (value: string) => void,
  ) => void;
  unregisterSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [query, setQueryState] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const [onChangeCb, setOnChangeCb] = useState<
    ((value: string) => void) | null
  >(null);

  const registerSearch = (
    ph: string,
    initialQuery: string,
    onChange: (value: string) => void,
  ) => {
    setPlaceholder(ph);
    setQueryState(initialQuery);
    setOnChangeCb(() => onChange);
    setIsActive(true);
  };

  const unregisterSearch = () => {
    setIsActive(false);
    setOnChangeCb(null);
    setQueryState('');
  };

  const setQuery = (value: string) => {
    setQueryState(value);
    onChangeCb?.(value);
  };

  return (
    <SearchContext.Provider
      value={{
        isActive,
        query,
        placeholder,
        setQuery,
        registerSearch,
        unregisterSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export function useSearchContext() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
}

export function usePageSearch(
  active: boolean,
  placeholder: string,
  query: string,
  onChange: (value: string) => void,
) {
  const { registerSearch, unregisterSearch } = useSearchContext();

  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    registerSearch(placeholder, query, onChange);

    return () => unregisterSearch();
  }, [active, placeholder]);

  React.useEffect(() => {
    if (active) {
      registerSearch(placeholder, query, onChange);
    }
  }, [query]);
}
