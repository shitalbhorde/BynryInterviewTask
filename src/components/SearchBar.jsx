import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(ProfileContext);

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        className="btn btn-outline-secondary" 
        type="button"
        onClick={() => setSearchTerm('')}
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;