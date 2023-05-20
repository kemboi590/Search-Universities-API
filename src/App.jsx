import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]); //stores the list of universities
  const [searchParam, setSearchParam] = useState('');  //takes the value of the search input

  useEffect(() => {
    const fetchData = async () => {
      let url = 'http://universities.hipolabs.com/search';
       //if searchParam is not empty, add the country to the url
      if (searchParam) {  
        url += `?country=${searchParam}`; 
        const response = await fetch(url);
        const data = await response.json();
        const names = data.map((university) => university.name);
        setUniversities(names);
      } else {
        setUniversities([]);
      }
    };

    fetchData();
  }, [searchParam]);
  //the dependency array is set to searchParam, so the effect will only run once, searchParam change

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.search-bar');
    setSearchParam(searchInput.value); //set the searchParam to the value of the search input
  };

  let today = new Date();
let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
console.log(today);

  return (
    <div className='container'>
      <h1 className='number-of-universities'>Welcome to Search Universities</h1>
      <form>
        <input type='text' placeholder='Search University' className='search-bar' />
        <button type='submit' className='search-btn' onClick={handleSearch}>
          Search
        </button>
      </form>

      <div className='container-box'>
        {
          universities.length > 0 ? (
<h1 className='number-of-universities'>{searchParam} has {universities.length} universities</h1>
          ) : (
              <h2 className='number-of-universities'>Search for a country</h2>
          )
        }
       
        {
        universities.length > 0 ? (
          universities.map((name, index) => (
            
            <div className='cards' key={index}>
              <h3>{name}</h3>
            </div>

          ))
        ) : null
        }

      </div>
      
     
      {
        universities.length > 0 ?  <footer>
        <ul>
          <li>created by Brian Kemboi</li>
          <li className='footerList'>Date - <span>{date }</span></li>
       </ul>
      </footer> : null
      }



      
    </div>
  );
}

export default App;


{/* <footer>
<ul>
  <li>created by Brian Kemboi</li>
  <li className='footerList'>Date - <span>{date }</span></li>
</ul>
</footer> */}
