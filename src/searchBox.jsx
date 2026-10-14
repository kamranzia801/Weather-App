import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const featuredCities = ["London", "Tokyo", "New York", "Sydney"];

export default function SearchBox({ onWeatherFound }) {
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "d883b8b89b86c5f39b38a6e084829b2a";

    const searchForCity = async (searchCity) => {
        const cityName = searchCity.trim();
        if (!cityName || isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Weather could not be loaded.");
            }

            if (!data.main || !data.weather?.[0]) {
                throw new Error("The weather service returned an incomplete result.");
            }

            onWeatherFound({
                city: data.name,
                country: data.sys?.country,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind?.speed ?? 0,
                visibility: data.visibility,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                observedAt: data.dt,
                timezone: data.timezone ?? 0,
            });
        } catch (requestError) {
            setError(requestError.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        void searchForCity(city);
        setCity("");
    }

    const handleChange = (event) => {
        setCity(event.target.value);
    }

    return (
        <section className="search-section" aria-label="Search weather by city">
            <form className="search-form" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="city-search">City name</label>
                <div className="search-field">
                    <input
                        id="city-search"
                        type="search"
                        placeholder="Search a city..."
                        autoComplete="off"
                        value={city}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                    />
                    <button type="submit" disabled={isLoading || !city.trim()}>
                        <SearchRoundedIcon aria-hidden="true" />
                        <span>{isLoading ? "Searching" : "Search"}</span>
                    </button>
                </div>
            </form>
            <div className="city-shortcuts" aria-label="Popular cities">
                <span className="shortcuts-label">TRY</span>
                {featuredCities.map((featuredCity) => (
                    <button
                        className="city-shortcut"
                        key={featuredCity}
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                            setCity(featuredCity);
                            void searchForCity(featuredCity);
                        }}
                    >
                        {featuredCity}
                    </button>
                ))}
            </div>
            {error && <p className="search-error" role="alert">{error}</p>}
        </section>
    );
}