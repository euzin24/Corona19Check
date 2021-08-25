import { useState, useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import ProvincialStatusData from './ProvincialStatusData';

const ProvincialStatus = ()=>{
  console.log("시도별현황 renders")

  const sido=["서울", "제주", "경남", "경북", "전남", "전북", "충남", "충북", "강원", "경기", "세종", "울산", "대전", "광주", "인천", "대구", "부산", "강원"];
  const today = new Date();

  const [isLoading, setIsLoading] = useState(0)
  let stDate = today;
  let edDate = today;
  // const [stDate, setStDate] = useState(today);
  // const [edDate, setEdDate] = useState(today);
  const lastUpdatedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

  let selectedSido = "서울"; //default

  const onChange = e => {
    selectedSido = e.target.value;
  }

  const btnOnClick = e => {
    e.preventDefault()
    console.log(selectedSido, stDate, edDate)
    setIsLoading(1)
    console.log("loading...")
    setTimeout(() => {
      setIsLoading(0);
      console.log("loads end!");
    }, 3000);
    
  }

  const getData = () =>{
    return "sdawdasdaw"
  }

  useEffect(()=>{
    console.log("시도별현황 useEffect")
  }, [])

  return(
    <div className="container">
      <p className="psb-title">시도별 현황</p>
      <span>
        위치  
        <select id="sido" className="sel" onChange={onChange}>
          {sido.map((val, idx)=><option key={idx}>{val}</option>)}
        </select>
        시작일
        <Flatpickr
          className="sel-date"
          value={stDate}
          options={{ minDate: "2020-03-02", maxDate: `${edDate.getFullYear()}-${edDate.getMonth()+1}-${edDate.getDate()}` }}
          onChange={([date])=>stDate=date} ></Flatpickr>
        종료일
        <Flatpickr
          className="sel-date"
          value={edDate}
          options={{ minDate: `${stDate.getFullYear()}-${stDate.getMonth()+1}-${stDate.getDate()}`, maxDate: lastUpdatedDate }}
          onChange={([date])=>edDate=date} ></Flatpickr>
        <button className="sel-btn" onClick={btnOnClick}>확인하기</button>
      </span>
      <div className="ps-board">
        <ProvincialStatusData isLoading={isLoading}></ProvincialStatusData>
      </div>
    </div>
  );
}

export default ProvincialStatus;