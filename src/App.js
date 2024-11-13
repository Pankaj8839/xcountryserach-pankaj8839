import { useEffect, useState } from 'react';
import './App.css';


const CountryCard = ({flag, name}) => {
  return (
    <div className="card">
      <img src={flag} alt={name} />
      <h6>{name}</h6> 
    </div>
  )
}
function App() {
  const [countryArray, setCountryArray] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);

  const handleChange = (e) => {
    if(e.target.value){
      let filteredCountry = countryArray.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
      setSearchCountry(filteredCountry);
    }else{
      setSearchCountry(countryArray);
    }
  }



  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountryArray(data);
        setSearchCountry(data);
      }catch(error){
        console.error(error+"error");
      }
    
    }
    fetchData();
  },[])
  return (
    <div className='main-container'>
     <div className='nav-bar'>
      <input type="text" placeholder='Search for country' onChange={(e) =>handleChange(e)}/>
     </div>
     <div className='country-card'>
      {
        searchCountry.map((country) => (
          <CountryCard flag={country.flags.png} name={country.name.common} />
        ))
      }
     </div>

    </div>
  );
}

export default App;
