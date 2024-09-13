import PropTypes from "prop-types";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/favCitiesSlice";

function WeatherItem({ city }) {
  const dispatch = useDispatch();

  return (
    <div
      className="relative flex flex-wrap justify-center  flex-col
      item-blur items-center rounded border p-3 border-black  "
    >
      <div className=" absolute top-0 right-0 ">
        <TiDeleteOutline
          className="text-red-700 text-2xl cursor-pointer"
          onClick={() => dispatch(removeFromCart(city?.id))}
        />
      </div>
      <div className="city text-4xl font-bold uppercase">
        {city.name || "Şehir"}
      </div>
      <div className="border w-3/4 mt-2 border-black"></div>
      <div className="temp text-2xl mb-2">{city.main.temp || "C°"}</div>
      <div className="text-center text-sm uppercase">
        {city.weather[0].description || "Açıklama"}
      </div>
    </div>
  );
}

WeatherItem.propTypes = {
  city: PropTypes.object,
};

export default WeatherItem;
