import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import "./infoBox.css"

const formatCityTime = (timestamp, timezone) => {
    if (!timestamp) return "Local time unavailable";

    return new Intl.DateTimeFormat("en", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
    }).format(new Date((timestamp + timezone) * 1000));
};

const formatDescription = (description = "") => (
    description.charAt(0).toUpperCase() + description.slice(1)
);

export default function InfoBox({ info }) {
    const details = [
        {
            label: "Feels like",
            value: `${Math.round(info.feelsLike)}°`,
            Icon: DeviceThermostatRoundedIcon,
        },
        {
            label: "Humidity",
            value: `${info.humidity}%`,
            Icon: WaterDropRoundedIcon,
        },
        {
            label: "Wind",
            value: `${Math.round(info.windSpeed * 3.6)} km/h`,
            Icon: AirRoundedIcon,
        },
        {
            label: "Visibility",
            value: info.visibility == null ? "—" : `${(info.visibility / 1000).toFixed(1)} km`,
            Icon: VisibilityRoundedIcon,
        },
    ];

    return (
        <section className="weather-result" aria-label={`Current weather in ${info.city}`} aria-live="polite">
            <div className="weather-current">
                <div className="weather-location">
                    <div>
                        <p className="weather-overline">CURRENT CONDITIONS</p>
                        <h2>{info.city}<span>{info.country}</span></h2>
                    </div>
                    <p className="local-time">{formatCityTime(info.observedAt, info.timezone)} local</p>
                </div>

                <div className="weather-reading">
                    <div>
                        <p className="weather-overline">RIGHT NOW</p>
                        <p className="temperature"><span>{Math.round(info.temp)}</span><sup>°</sup></p>
                        <p className="condition-description">{formatDescription(info.description)}</p>
                    </div>
                    <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${info.icon}@4x.png`}
                        alt={formatDescription(info.description)}
                    />
                </div>

                <div className="temperature-range">
                    <span>LOW <strong>{Math.round(info.tempMin)}°</strong></span>
                    <span className="range-divider" aria-hidden="true" />
                    <span>HIGH <strong>{Math.round(info.tempMax)}°</strong></span>
                </div>
            </div>

            <div className="weather-details">
                <div className="details-heading">
                    <p className="eyebrow">THE DETAILS</p>
                    <h3>At a glance</h3>
                </div>
                <dl className="details-list">
                    {details.map(({ label, value, Icon }) => (
                        <div className="detail-item" key={label}>
                            <dt><Icon aria-hidden="true" /><span>{label}</span></dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}