import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./weatherSlice";
import favCitiesSlice from "./favCitiesSlice";

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
    favCities: favCitiesSlice,
  },
});
