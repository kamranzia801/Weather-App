import SearchBox from "./searchBox"
import InfoBox from "./infoBox"
import { useState } from "react"
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import "./App.css"

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);

    const dateLabel = new Intl.DateTimeFormat("en", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date());

    return (
        <main className="app-shell">
            <header className="topbar">
                <div className="brand">
                    <span className="brand-icon"><WbSunnyOutlinedIcon aria-hidden="true" /></span>
                    <span className="brand-name">DAYLIGHT<span>WEATHER JOURNAL</span></span>
                </div>
                <time className="topbar-date">{dateLabel}</time>
            </header>

            <section className="intro">
                <p className="eyebrow">THE WORLD, RIGHT NOW</p>
                <h1>Weather <em>today.</em></h1>
                <p className="intro-copy">A little clarity for wherever you’re headed.</p>
            </section>

            <SearchBox onWeatherFound={setWeatherInfo} />

            {weatherInfo ? (
                <InfoBox info={weatherInfo} />
            ) : (
                <section className="empty-state" aria-live="polite">
                    <div className="empty-weather-icon"><CloudQueueRoundedIcon aria-hidden="true" /></div>
                    <div>
                        <p className="eyebrow">YOUR WEATHER, ON THE MAP</p>
                        <h2>Pick a place to begin.</h2>
                        <p>Search for a city to see its current conditions.</p>
                    </div>
                    <span className="empty-coordinate" aria-hidden="true">40° 43′ N&nbsp;&nbsp; 73° 56′ W</span>
                </section>
            )}

            <footer className="app-footer">
                <span>Current conditions from OpenWeather</span>
                <span>METRIC&nbsp; · &nbsp;°C</span>
            </footer>
        </main>
    )
}