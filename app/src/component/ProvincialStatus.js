import { useState, useEffect } from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { getCovid19SidoInfStateJson } from '../api'
import BarChart from './BarChart';

const ProvincialStatus = ({date})=>{
  const sido=["합계", "서울", "제주", "경남", "경북", "전남", "전북", "충남", "충북", "강원", "경기", "세종", "울산", "대전", "광주", "인천", "대구", "부산", "강원"];
  const today = new Date(date)
  const aWeekBeforeToday = new Date(date)
  aWeekBeforeToday.setDate(today.getDate()-7)

  const [isLoading, setIsLoading] = useState(false)
  const [stDate, setStDate] = useState(aWeekBeforeToday);
  const [edDate, setEdDate] = useState(today);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedSido, setSelectedSido] = useState("합계"); //default

  const onChange = e => {
    setSelectedSido(e.target.value)
  }

  const dateToString = (date)=>{
    return `${date.getFullYear()}-${("0" + (1 + date.getMonth())).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
  }

  const btnOnClick = () => {
    setCount(count+1);
  }

  useEffect(()=>{
    console.log("시도별현황 useEffect")

    const fetchData = async ()=>{
      setIsLoading(true)

      const res = await getCovid19SidoInfStateJson(stDate, edDate)
      setData(res)

      setIsLoading(false)
    }
    
    fetchData()
  }, [count])

  return(
    <div className="container">
      <p className="psb-title">시도별 현황</p>
      <span>
        위치  
        <select id="sido" className="sel-loc" onChange={onChange}>
          {sido.map((val, idx)=><option key={idx}>{val}</option>)}
        </select>
        시작일
        <Flatpickr
          className="sel-date"
          value={stDate}
          options={{ minDate: "2020-03-02", maxDate: dateToString(edDate) }}
          onChange={([date])=>setStDate(date)} ></Flatpickr>
        종료일
        <Flatpickr
          className="sel-date"
          value={edDate}
          options={{ minDate: dateToString(stDate), maxDate: dateToString(today) }}
          onChange={([date])=>setEdDate(date)} ></Flatpickr>
        <button className="sel-btn" onClick={btnOnClick}>조회하기</button>
      </span>
      <div className="ps-board">
        {isLoading ? (
          <div>loading...</div>
        ):(
          <>
            {data===undefined ? (
              <div>데이터가 없습니다.</div>
            ):(
              <>
              <div className="ps-datalist">
              <table className="ps-table">
                <thead>
                  <tr>
                    <th>기준일시</th>
                    <th>누적 확진자<br></br>(전일대비 증감 수)</th>
                    <th>격리중 환자</th>
                    <th>지역 발생</th>
                    <th>해외 유입</th>
                    <th>누적 사망자</th>
                  </tr>
                </thead>
                <tbody>
                  {data.reverse().map((val, idx)=>{
                    return val.gubun===selectedSido ? (
                      <tr key={idx}>
                        <td>{val.createDt.slice(0, 10)}</td>
                        <td>{val.defCnt} (+{val.incDec})</td>
                        <td>{val.isolIngCnt}</td>
                        <td>{val.localOccCnt}</td>
                        <td>{val.overFlowCnt}</td>
                        <td>{val.deathCnt}</td>
                      </tr>
                    ) : null
                  })}
                </tbody>
              </table>
              </div>
              <div className="bar-chart">
                <BarChart data={data} selectedSido={selectedSido}></BarChart>
              </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProvincialStatus;