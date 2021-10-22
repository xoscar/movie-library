import { FunctionComponent, useCallback, useState } from 'react';
import styles from './searchBar.module.css';

type SearchBarProps = {
  onSearch(search: string): void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = useCallback((event) => {
    const newValue = event.target.value;
    setSearch(newValue);
    onSearch(newValue);
  }, []);

  return (
    <div className={styles.container}>
      <input value={search} onChange={onSearchChange} className={styles.input} type="text" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
