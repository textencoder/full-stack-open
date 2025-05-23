import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(
          data.filter((d) => d.name.common.toLowerCase().includes(input))
        );
        let filtered = data.filter((d) =>
          d.name.common.toLowerCase().includes(input)
        );
        setCountries(filtered.map((d) => d.name.common));
        setLoading(false);
      });
  }, [input]);

  return (
    <>
      <label htmlFor="search" style={{ display: "flex" }}>
        find countries
        <input type="text" id="search" name="search" onChange={handleChange} />
      </label>
      <div>
        {loading && input ? (
          "loading..."
        ) : countries.length > 10 && input ? (
          "Too many matches, specify another filter"
        ) : countries.length > 1 && input ? (
          countries.map((name) => {
            return <CountryName key={name} name={name} countries={countries} setCountries={setCountries} />;
          })
        ) : countries.length === 1 ? (
          <CountryInfo name={countries} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function CountryInfo(props) {
  const [capital, setCapital] = useState(null);
  const [area, setArea] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [conditions, setConditions] = useState(null);
  const [wind, setWind] = useState(null);

  useEffect(() => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${props.name}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCapital(String(data.capital));
        setArea(data.area);
        setLanguages(Object.values(data.languages));
        setFlag({ src: data.flags.png, alt: data.flags.alt });
      });
  }, []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
      console.log("effect ran. capital: ", capital)
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?unitGroup=us&key=${apiKey}&contentType=json`, { mode: "cors" })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setTemperature(data.currentConditions.temp);
        setConditions(data.currentConditions.conditions)
        setWind(data.currentConditions.windspeed);
      })
  
    
  }, [capital])

  return (
    <>
      <h1>{props.name}</h1>

      <div>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
      </div>

      <div>
        <h2>Languages</h2>
        <ul>
          {languages.map((lang) => {
            return <li key={lang}>{lang}</li>;
          })}
        </ul>

        <img src={flag.src} alt={flag.alt} />
      </div>

      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {temperature} degrees Fahrenheit</p>
        <p>Current Conditions: {conditions}</p>
        <p>Wind: {wind} mph</p>
      </div>
    </>
  );
}

function CountryName(props) {
  const handleClick = () => {
    props.setCountries([props.name]);
  }

  return (
    <div style={{display: "flex"}}>
    <p>{props.name}</p>
    <button onClick={handleClick}>Show</button>
    </div>
  )
}

export default App;
