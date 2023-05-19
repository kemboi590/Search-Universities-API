import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const res = await fetch(`http://universities.hipolabs.com/search?country=${searchQuery}`);
      const universities = await res.json();
      setUniversities(universities);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUniversities();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredResults = universities.filter((university) =>
      university.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchQuery, universities]);

  return (
    <div className='container'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search University"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div className="container-box">
        {searchResults.length > 0 ? (
          searchResults.map((university, index) => (
            <div className="cards" key={index}>
              <h4>{university.name}</h4>
              <p className='domains'>{university.domains}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
