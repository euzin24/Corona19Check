import { useEffect, useState } from "react";
import { getCovid19InfStateJson } from "../api";

const TotalStatus = ({date}) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log("전체현황 renders");
 
  useEffect(()=>{
    const fetchData = async ()=>{
      setIsLoading(true)

      const res = await getCovid19InfStateJson(date)
      setData(res)

      setIsLoading(false)
    }
    
    fetchData()
  }, [])

  return(
    <div className="container" style={{paddingTop:"10em"}}>
      <div className="status-board">
        <p className="sb-title">대한민국 코로나 19 현황</p>
        <p>2020년 1월 31일 00:00 ~ {date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 00:00</p>
        
        <div className="status-list">
          {isLoading ? 
          (
            <div>loading...</div>
          ) : (
            <>
              <ul className="sb-ul">
                <li className="sb-li">
                  <p className="sb-li-title">확진자 수</p>
                  <p className="sb-li-value">{data.decideCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">검사 진행 수</p>
                  <p className="sb-li-value">{data.examCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">격리 해제 수</p>
                  <p className="sb-li-value">{data.clearCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">사망자 수</p>
                  <p className="sb-li-value">{data.deathCnt}</p>
                </li>
              </ul>

              <ul className="sb-ul">
                <li className="sb-li">
                  <p className="sb-li-title">누적 검사 수</p>
                  <p className="sb-li-value">{data.accExamCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">치료 중 환자 수</p>
                  <p className="sb-li-value">{data.careCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">결과 음성 수</p>
                  <p className="sb-li-value">{data.resutlNegCnt}</p>
                </li>
                <li className="sb-li">
                  <p className="sb-li-title">누적 확진률</p>
                  <p className="sb-li-value">{data.accDefRate===undefined? null : data.accDefRate.toString().slice(0, 4)}</p>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalStatus