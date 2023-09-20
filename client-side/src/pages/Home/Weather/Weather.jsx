import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import moment from "moment/moment";
import "./weather.css";
import { useSelector } from "react-redux";
import sky from "../../../assets/gif/sky.mp4";

const Weather = () => {
  const toDestination = useSelector(
    (state) => state?.searchFilter?.toCityInfo?.destination
  );
  // console.log(toDestination, "destinationTo");

  const arrivalCity = toDestination.split(",")[0];

  const [weather, setWeather] = useState();
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${arrivalCity}&appid=${
      import.meta.env.VITE_WEATHER_KEY
    }`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [arrivalCity]);

  const unix = weather?.sys?.sunrise;
  const sunrise = new Date(unix * 1000);
  const unix2 = weather?.sys?.sunset;
  const sunset = new Date(unix2 * 1000);
  const humidity = weather?.main?.humidity;
  const windSpeed = weather?.wind?.speed.toFixed();
  const weatherCondition = weather?.weather?.map((d) => d?.description);

  const [conditionalImg, setImg] = useState("");
  const [weatherAlert, setAlert] = useState("The Day is Perfect For");

  useEffect(() => {
    if (weatherCondition == "light rain") {
      setImg("https://i.ibb.co/12wFypt/cloudy.png");
    } else if (weatherCondition == "clear sky") {
      setImg("https://i.ibb.co/pzg3qMr/3222800.png");
    } else if (weatherCondition == "overcast clouds") {
      setImg("https://i.ibb.co/CHdnRqH/overcast-removebg-preview.png");
    } else if (weatherCondition == "haze") {
      setImg("https://cdn-icons-png.flaticon.com/512/1779/1779807.png");
    } else if (weatherCondition == "moderate rain") {
      setImg(
        "https://cdn3.iconfinder.com/data/icons/sunnyday-2/142/light_cloudy_heavy_rain-512.png"
      );
    } else if (weatherCondition == "broken clouds") {
      setImg("https://i.ibb.co/8BYhhjn/brokenclouds-removebg-preview.png");
    } else if (weatherCondition == "heavy intensity rain") {
      setImg("https://cdn-icons-png.flaticon.com/512/3937/3937493.png");
    }
  }, [weatherCondition]);

  return (
    <div className="mb-5 top-2">
      <div className="main-container  ">
        <video autoPlay muted loop className="background-video">
          <source src={sky} type="video/mp4" />
        </video>
        <div className="absolute w-full   dark:h-[450px] dark:bg-white/10 dark:backdrop-blur-lg  dark:shadow-sm dark:shadow-gray-500">
          <h1 className="text-white text-center md:text-2xl font-bold">
            Weather Update For Safe Journey
          </h1>
          {arrivalCity ? (
            <div className="backdrop-blur-sm  text-black w mt-2 ">
              <h2 className="text-5xl pt-5 text-center">{weather?.name}</h2>
              <p className="text-center mb-5">
                {moment(sunrise).format("MMM Do YYYY")}
              </p>
              <h4 className="text-center text-5xl">
                {(weather?.main?.temp - 273.15).toFixed(1)}&#xB0;
                <span className="text-xl">c</span>
              </h4>
              <h1 className="text-2xl my-2 text-center">
                The Day is Perfect For Traveling
              </h1>
              <div>
                <div className="grid font-semibold grid-cols-3 md:grid-cols-3 gap-4 md:mx-52 ">
                  <div className="bg-white/10 flex flex-col glass justify-center text-2xl rounded-md">
                    <img
                      className="object-cover w-24 mx-auto"
                      src="https://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/512/Humidity-icon.png"
                      alt=""
                    />
                    <p className="text-center text-sm md:text-2xl p-2 text-mt-2">
                      {humidity}% Humidity
                    </p>
                  </div>
                  <div className="bg-white/10 glass rounded-md">
                    <img
                      className="object-cover w-24 mx-auto"
                      src={conditionalImg}
                      alt=""
                    />
                    <p className="text-center text-sm md:text-2xl p-2 text-mt-2">
                      {weatherCondition}
                    </p>
                  </div>

                  <div className="bg-white/10 flex flex-col justify-center text-2xl glass rounded-md">
                    <img
                      className="object-cover w-24 mx-auto"
                      src="https://cdn-icons-png.flaticon.com/512/2691/2691887.png"
                      alt=""
                    />
                    <p className="text-center text-sm md:text-2xl p-2 text-mt-2">
                      {windSpeed}km/h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading............</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
