import WeatherItems from "./Components/WeatherItems";
import WeatherSearch from "./Components/WeatherSearch";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  return (
    <div className="app-main-div flex justify-around items-center p-5 gap-x-5 h-screen w-screen bg-[url('/img/weatherBgc.jpg')] bg-cover bg-center">
      <WeatherSearch />
      <WeatherItems />
    </div>
  );
}

export default App;
