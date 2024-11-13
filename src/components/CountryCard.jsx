import React from "react"; 
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  // Yerel adları almak için bir yardımcı fonksiyon
  const getNativeName = () => {
    if (country.name.nativeName) {
      // nativeName'de en az bir dil varsa
      const names = Object.values(country.name.nativeName);
      // İlk mevcut olan dili döndür
      return names.length > 0 ? names[0].common : "N/A"; 
    }
    return "N/A"; // nativeName yoksa "N/A" döndür
  };

  return (
    <div className="card" style={{ margin: "10px", width: "200px" }}>
      <div className="card-body">
        <h3 className="card-title">{country.name.common}</h3>
        <p>
          <Link to={`/${country.name.common}`}>
            {getNativeName()} {/* Yerel adı burada göster */}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
