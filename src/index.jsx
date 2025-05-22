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
      .then((rawData) => rawData.json().then((finalData) => setData(finalData)))
      .catch((error) => console.error("got wrong" + error));
  }, []);
  let filteredData = data.filter((ele) =>
    ele.common.includes(search)
  );
  return (
    <div style={{textAlign:"center"}}>
      <input style={{width:"50vw"}}
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="countryCard" style={{display:"flex",
      flexWrap:"wrap"
      
      }}>
      {filteredData.length > 0 && filteredData.map((ele) => (
        <div 
          style={{
            border: "2px solid black",
            width: "150px",
            margin: "10px",
            borderRadius: "10px",
            textAlign:"center"
          }}
        >
          <img
            style={{ width: "100px", height: "100px", margin: "10px"}}
            src={ele.png}
            alt={ele.common}
          />
          <h4>{ele.common}</h4>
        </div>
      ))}
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
