import { useSelector } from "react-redux";
import WeatherItem from "./WeatherItem";

function WeatherItems() {
  const favCities = useSelector((state) => state.favCities.favCities);

  return (
    <div className="  flex justify-start items-start p-5 rounded-md border border-black  w-4/6  flex-wrap">
      <div className=" w-full flex justify-center items-center text-blac font-bold text-5xl p-5  item-blur">
        Your Favorite Cities
      </div>

      <div className="grid grid-cols-3 w-full h-full gap-5  mt-5 ">
        {favCities.map((city, index) => (
          <WeatherItem key={index} city={city} />
        ))}
      </div>
    </div>
  );
}

export default WeatherItems;
