import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const fetchFromLocalStorage = () => {
  const data = localStorage.getItem("favCities");
  if (data) {
    try {
      const parsedData = JSON.parse(data);
      // Eğer parsedData bir dizi değilse, onu bir diziye dönüştür
      return Array.isArray(parsedData) ? parsedData : [parsedData];
    } catch (error) {
      console.error("JSON parsing error:", error);
      return []; // JSON parse hatasında boş dizi döndür
    }
  }
  return []; // localStorage'da veri yoksa boş dizi döndür
};

// localstorage içerisine itemleri/dataları eklediğimiz yer
const storeInLocalStorage = (city) => {
  localStorage.setItem("favCities", JSON.stringify(city));
};

//! localden sonra gelmesi gerekli
const initialState = {
  favCities: fetchFromLocalStorage(),
};

const favCitiesSlice = createSlice({
  name: "favCities",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Öncelikle, action.payload'daki şehir zaten listede mi kontrol ediyoruz.
      const cityExists = state.favCities.some(
        (city) => city.id === action.payload.id
      );

      if (cityExists) {
        // Eğer şehir zaten ekliyse, kullanıcıya bir uyarı mesajı ver
        message.warning("Bu şehir zaten favorilerinizde mevcut!");
      } else {
        // Şehir listede değilse, favori şehirler dizisine ekle ve localStorage'a kaydet
        state.favCities.push(action.payload);
        // localStorage'a kaydet
        storeInLocalStorage(state.favCities);

        message.success("Şehir favorilere eklendi!");
      }
    },

    removeFromCart: (state, action) => {
      const tempCart = state.favCities.filter(
        (item) => item.id !== action.payload
      );
      state.favCities = tempCart;
      storeInLocalStorage(state.favCities);
    },
  },
});

export const { addToCart, removeFromCart } = favCitiesSlice.actions;

export default favCitiesSlice.reducer;
