import React from "react";
import CountryCard from "./CountryCard"; // CountryCard bileşenini içe aktarın
import axios from "axios"; // axios'u doğru bir şekilde içe aktarın

class CountryList extends React.Component {
  state = {
    countries: [], // Başlangıçta countries dizisi boş
    loading: false, // Yükleme durumu
    error: null, // Hata durumu
  };

  componentDidMount() {
    this.fetchCountries(); // Ülkeleri ilk yükleme
  }

  fetchCountries = () => {
    this.setState({ loading: true }); // Yüklemeyi başlat
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common) // Ülkeleri harf sırasına göre sıralıyoruz
        );
        this.setState({ countries: sortedCountries, loading: false }); // Sıralanmış verileri state'e kaydediyoruz
      })
      .catch((error) => {
        console.error("Bir hata oluştu:", error); // Hata durumunda konsola hata mesajı yazdırıyoruz
        this.setState({ loading: false, error: "Ülkeler yüklenemedi." });
      });
  };

  searchHandler = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm === "") {
      // Eğer arama kutusu boşsa, tüm ülkeleri geri getir
      this.fetchCountries();
    } else {
      axios
        .get("https://restcountries.com/v3.1/name/" + searchTerm)
        .then((res) => {
          const sortedCountries = res.data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common) // Arama sonuçlarını da harf sırasına göre sıralıyoruz
          );
          this.setState({ countries: sortedCountries, error: null }); // API'den gelen verileri state'e kaydediyoruz
        })
        .catch((error) => {
          console.error("Bir hata oluştu:", error); // Hata durumunda konsola hata mesajı yazdırıyoruz
          this.setState({ error: "Ülke bulunamadı." }); // Kullanıcıya hata mesajı göster
        });
    }
  };

  render() {
    const { countries, loading, error } = this.state; // State'ten değerleri alıyoruz

    // Yükleme durumunda yükleniyor mesajı göster
    if (loading) {
      return <div>Yükleniyor...</div>;
    }

    return (
      <div className="container">
        <input
          type="text"
          name="search"
          className="form-control"
          onChange={this.searchHandler}
          placeholder="Ülke Adı Giriniz"
        />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Hata mesajını göster */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            marginTop: "10px", // Ülke kartları ile arama alanı arasında boşluk bırakın
          }}
        >
          {countries.length > 0 ? (
            countries.map((ct) => <CountryCard key={ct.cca3} country={ct} />)
          ) : (
            <p>Hiçbir ülke bulunamadı.</p>
          )}
        </div>
      </div>
    );
  }
}

export default CountryList;
