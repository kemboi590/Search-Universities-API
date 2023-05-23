import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]);
  const [searchParam, setSearchParam] = useState('');  

  useEffect(() => {
    const fetchData = async () => {
      let url = 'https://universitiesapi.onrender.com/v1/api/universities';
       //if searchParam is not empty, add the country to the url
      if (searchParam) {  
        url += `/${searchParam}`
        const response = await fetch(url)
        const data = await response.json()
        const names = data.map((university) => {
          return university
        } )
        setUniversities(names)
      } else {
        setUniversities([]);
      }
    };

    fetchData();
  }, [searchParam]);
  //the dependency array is set to searchParam, so the effect will only run once, searchParam change

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.search-bar')
    setSearchParam(searchInput.value)
  };

  let today = new Date()
let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();


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
          universities.map((item, index) => (
            
            <div className='cards' key={index}>
              <h3>{item.name}</h3> <br />
              <p className='domain'>{item.domains}</p>
              <p className='webPage'>{ item.web_pages}</p>
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
  )
}

export default App;



