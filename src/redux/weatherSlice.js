import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import axios from "axios";

const initialState = {
  weather: {},
  weatherStatus: STATUS.IDLE,
};

const url = "https://api.openweathermap.org/data/2.5/";

const key = "20eeb77940277784d1ca22f9261f2dea";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (cityName) => {
    try {
      const response = await axios.get(
        `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
      );

      return response.data;
    } catch (error) {
      throw Error("Weather data could not be fetched", error);
    }
  }
);
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    //     addToLocal:(state, action) => {
    // const
    //     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.weatherStatus = STATUS.LOADING;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.weatherStatus = STATUS.SUCCESS;
      })
      .addCase(getWeather.rejected, (state) => {
        state.weatherStatus = STATUS.FAIL;
      });
  },
});

export default weatherSlice.reducer;
