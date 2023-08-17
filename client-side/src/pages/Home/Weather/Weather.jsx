import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import moment from "moment/moment";


const Weather = () => {
    const [weather, setWeather] = useState([]);
    useEffect(() => {
        const city = "dhaka";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`;
        // const url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=3&appid=${import.meta.env.VITE_WEATHER_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setWeather(data))

    }, [])
    console.log(weather)
    const unix = weather?.sys?.sunrise;
    const sunrise = new Date(unix * 1000);
    const unix2 = weather?.sys?.sunset;
    const sunset = new Date(unix2 * 1000);
    console.log(unix, sunrise)
    return (
        <div>
            <SectionTitle sectionTitle="Weather Report"></SectionTitle>

            <div className="py-6 relative mx-auto xl:px-10 bg-gradient-to-bl to-blue-900 from-cyan-600">
                <span className="bg-[#00000032] absolute top-0 left-0 w-full h-full "></span>
                <div className="md:w-7/12 x-10 mx-auto p-5 opacity-100  text-white">
                    <p className="text-center">{moment(sunrise).format("MMM Do YYYY")}</p>
                    <h2 className="text-xl text-center ">{weather?.name}</h2>

                    <h4 className="text-center text-3xl">{((weather?.main?.temp) - 273.15).toFixed(1)} C</h4>
                    <div className="flex justify-between sm:justify-around mt-4">
                        <div className="space-y-2">
                            <h4>Feels Like: <span className="text-lg">{((weather?.main?.feels_like) - 273.15).toFixed(2)} C</span></h4>
                            <p>Humidity: <span className="text-lg">{(weather?.main?.humidity)}%</span></p>
                            <p>Wind: <span className="text-lg">WNW {(weather?.wind?.speed)} mph</span></p>

                            <p>Sunrise: <span className="text-lg">{moment(sunrise).format('LT')}</span> </p>
                            <p>Sunset: <span className="text-lg">{moment(sunset).format('LT')}</span> </p>
                        </div>
                        <div>

                            {
                                weather?.weather?.[0]?.main === "Rain" ?
                                    <>
                                        <img src="https://i.ibb.co/12wFypt/cloudy.png" alt="" className="w-20 h-20" />
                                        <h3 className="text-center text-xl">{weather?.weather?.[0]?.main}</h3>
                                    </> :

                                    <>
                                        <img src="https://i.ibb.co/qRvHCpd/4102314-cloud-cloudy-sun-sunny-weather-icon.png" alt="" className="w-20 h-20" />
                                        <h3 className="text-center text-xl">{weather?.weather?.[0]?.main}</h3>
                                    </>
                            }


                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Weather;
