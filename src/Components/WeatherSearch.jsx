import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Components/Loading.jsx";
import { getWeather } from "../redux/weatherSlice.js";
import { CiSearch } from "react-icons/ci";
import { addToCart } from "../redux/favCitiesSlice.js";
import { message } from "antd";

function WeatherSearch() {
  const dispatch = useDispatch();
  const { weather, weatherStatus } = useSelector((state) => state.weather);

  const [cityName, setCityName] = useState("");

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const sendCityName = () => {
    const trimmedCityName = cityName.trim().toLowerCase();
    if (trimmedCityName) {
      dispatch(getWeather(trimmedCityName)); // Doğru cityName değeri iletildi
      setCityName(""); // Input temizleme
    }
  };

  const addToFav = () => {
    if (!weather || !weather.name) {
      // Eğer weather boşsa veya weather.name mevcut değilse
      message.warning("Please search for a city or country.");
      return; // İşlem yapılmasın
    }
    dispatch(addToCart(weather));
  };
  return (
    <>
      {weatherStatus === "LOADING" ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-start items-center item-blur w-2/6 h-6/6 p-5 gap-32 ">
          <div className="text-black text-3xl font-bold mt-8 whitespace-nowrap max-w-full">
            Weather App With Redux Toolkit
          </div>

          <div className="w-3/4 flex flex-col gap-10">
            <div className="flex justify-center items-center bg-cyan-400 rounded">
              <input
                type="text"
                className="rounded bg-transparent outline-none text-white p-1 w-5/6"
                onChange={handleInputChange}
                value={cityName}
              />
              <div
                className="border-l w-1/6 items-center flex justify-center"
                onClick={sendCityName}
              >
                <CiSearch className="text-2xl text-white font-bold cursor-pointer" />
              </div>
            </div>

            <div className="content flex flex-col items-center justify-center gap-5 text-white">
              <div className="city text-5xl">{weather?.name || "Şehir"}</div>
              <div className="temp text-3xl font-bold">
                {weather?.main?.temp_max ? `${weather.main.temp_min} °C` : "C°"}
              </div>
              <div className="desc">
                {weather?.weather?.[0]?.description || "---"}
              </div>
              <div className="minmax text-lg font-bold">
                {weather?.main
                  ? `${weather.main.temp_min} °C / ${weather.main.temp_max} °C`
                  : "-C° / -C°"}
              </div>
              <div className="w-[350px] p-2 flex justify-center items-center mt-10">
                <button
                  className=" w-full p-2 bg-cyan-400 rounded"
                  onClick={addToFav}
                >
                  Add To Favorites City
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherSearch;
