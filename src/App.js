import logo from './logo.svg';
import 'antd/dist/antd.css';
import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './App.css';
import api from './components/services/api';
import latlonapi from './components/services/latlonapi';
import { useState } from 'react';
import moment from 'moment';
import SkeletonImage from 'antd/lib/skeleton/Image';
const { Search } = Input;
function App() {
const [data,setData] = useState(null);
const [msg,setMsg] = useState(null);
const [iconImg,setIconImage] = useState("");
const [situation,setSituation] = useState("");
const [lat,setLat] = useState();
const [lon,setLon] = useState();
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const getLocation = () =>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("not supported")
    }
  }
  
 const showPosition = async(position) => {
    try{
      //let response = await api.currentWeather(value);
      let response = await latlonapi.currentWeather(position.coords.latitude,position.coords.longitude);
      console.log(response)
      if(response.success === false){
       setMsg("Request fail!")
       
      }
      else{
        setMsg(null);
        setData(response);
        setIconImage(response.current["condition"].icon)
        setSituation(response.current["condition"].text)
        console.log(response.current["weather_icons"])
        // setIconImage(response.current["weather_icons"][0])
        // setSituation(response.current["weather_descriptions"][0])
        console.log(response.current["condition"])

      }
    }catch{
        console.log("fail")
    }

    
   
  }
  const onSearch = async(value) => {
    if(value !== ""){
      try{
        //let response = await api.currentWeather(value);
        let response = await latlonapi.currentWeatherByInputBox(value);
        console.log(response)
        if(response.success === false){
         setMsg("Request fail!")
         
        }
        else{
          setMsg(null);
          setData(response);
          setIconImage(response.current["condition"].icon)
          setSituation(response.current["condition"].text)
          console.log(response.current["weather_icons"])
          // setIconImage(response.current["weather_icons"][0])
          // setSituation(response.current["weather_descriptions"][0])
          console.log(response.current["condition"])

        }
      }catch{
          console.log("fail")
      }
    
    }else return;
    
  };
 
  React.useEffect(()=>{
    getLocation();
  },[])
  return (
    <div>
      <Search placeholder="input search text"  enterButton onSearch={onSearch} suffix={suffix}/>
      {msg !== null && <h3>{msg}</h3>}
        <div className="widget">
             
              <div className="left-panel panel">
                  <div className="date">
                      {moment().format('LL')}
                     
                  </div>
                  {situation}
                  <div className="city">
                    {data !== null ?<>
                      {data.location["region"]}
                     <span> {data.location["name"]}</span>
                     
                    </> : <>MUMBAI</>}
                 
                  </div>
                  <div className="temp">
                    <img src={iconImg} alt="" width="60"/>
                    {data !== null ? <>{data.current["temp_c"]}</> : <>26</>}&deg;
                   
                  </div>
              </div>
              <div className="right-panel panel">
                  <img src="https://codefrog.tech/cp/wp/mumbai.png" alt="" width="160"/>
              </div>

        </div>
    </div>
  );
}

export default App;
