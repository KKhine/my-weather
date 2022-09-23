import axios from "axios";

const api = axios.create({
    baseURL: `http://api.weatherstack.com/`
  });
function currentWeather(location) {
    return api.get(`current?access_key=71f2644e6610a4b5a292e04da6ecc1db&query=`+location)
            .then((response) => response.data)
            .then(err=>err);
            
  }

export default{currentWeather}
