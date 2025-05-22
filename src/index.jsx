import React from 'react';
import ReactDOM from 'react-dom/client';





import { useEffect, useState } from "react";


export function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((finalData) => setData(finalData))
      .catch((error) => console.error("Error fetching countries: " + error));
  }, []);

  const hasResults = data.some((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "50vw", padding: "10px", margin: "20px" }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {!hasResults && search !== "" && <h3>No results found</h3>}

        {data.map((country) => {
          if (country.common.toLowerCase().includes(search.toLowerCase())) {
            return (
              <div
                className="countryCard"
                key={country.common}
                style={{
                  border: "2px solid black",
                  width: "150px",
                  margin: "10px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <img
                  src={country.png}
                  alt={country.common}
                  style={{ width: "100px", height: "100px", margin: "10px" }}
                />
                <h2>{country.common}</h2>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
