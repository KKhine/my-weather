import axios from "axios";
const api = axios.create({
    baseURL : `https://weatherapi-com.p.rapidapi.com`,
    headers: {
        'X-RapidAPI-Key': 'e4853c38e4mshd7e3cce21b3f811p1288c5jsn687f630d0841',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
});
function currentWeather (lat,lon){

    return api.get(`/current.json?q=`+lat+"%2C"+lon)
    .then((response) => response.data)
    .then(err=>err);
}
function currentWeatherByInputBox(value){
    let pos = value.split(",");
    return api.get(`/current.json?q=`+pos[0]+"%2C"+pos[1])
    .then((response) => response.data)
    .then(err=>err);
}
export default {currentWeather,currentWeatherByInputBox}