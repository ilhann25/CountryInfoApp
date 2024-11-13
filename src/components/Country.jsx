import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Country = () => {
  const { name } = useParams(); 
  const [country, setCountry] = useState({}); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(response.data[0]); 
        setLoading(false); 
      } catch (error) {
        console.error("Bir hata oluştu:", error);
        setError("Ülke bilgileri yüklenemedi."); 
        setLoading(false); 
      }
    };

    fetchCountry();
  }, [name]); 

 
  const nativeNames =
    country.name && country.name.nativeName
      ? Object.values(country.name.nativeName)
          .map((n) => n.common)
          .join(", ") 
      : "N/A";

  if (loading) {
    return <div>Yükleniyor...</div>; 
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>; // Hata durumu
  }

  return (
    <div>
        <h2>{country.nativeName}</h2>
        <div className="card-columns">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{country.name.common}</h3>
          <img src={country.flags.png} alt={`${country.name.common} Bayrağı`} />
          <dl className="row">
            <dt className="col-sm-4">Başkent:</dt>
            <dd className="col-sm-8">{country.capital && country.capital[0]}</dd>

            <dt className="col-sm-4">Nüfus:</dt>
            <dd className="col-sm-8">{country.population}</dd>

            <dt className="col-sm-4">Alan:</dt>
            <dd className="col-sm-8">{country.area} km²</dd>

            <dt className="col-sm-4">Diller:</dt>
            <dd className="col-sm-8">{Object.values(country.languages || {}).join(", ")}</dd>

            <dt className="col-sm-4">Para Birimi:</dt>
            <dd className="col-sm-8">{country.currencies && Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ")}</dd>

            <dt className="col-sm-4">Zaman Dilimi:</dt>
            <dd className="col-sm-8">{country.timezones.join(", ")}</dd>

            <dt className="col-sm-4">Bölge:</dt>
            <dd className="col-sm-8">{country.region}</dd>

            <dt className="col-sm-4">Coğrafi Koordinatlar:</dt>
            <dd className="col-sm-8">Lat: {country.latlng[0]}, Lng: {country.latlng[1]}</dd>

            <dt className="col-sm-4">Google Maps:</dt>
            <dd className="col-sm-8"><a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">Haritada Görüntüle</a></dd>
            
            <dt className="col-sm-4">Yerel Ad:</dt>
            <dd className="col-sm-8">{nativeNames}</dd>

          </dl>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default Country;
