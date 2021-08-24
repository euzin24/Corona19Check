import { useEffect } from "react";
import { getCovid19InfStateJson } from "../api";

export default function TotalStatus(props){
  const date = props.date
  console.log("전체현황 renders");

  // getCovid19InfStateJson();


  return(
    <div className="container" style={{paddingTop:"10em"}}>
      <div className="status-board">
        <p className="sb-title">대한민국 코로나 19 현황</p>
        <p>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 00:00 기준</p>
        <ul className="sb-ul">
          <li className="sb-li">
            <p className="sb-li-title">누적 확진자</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">누적 검사 진행</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">누적 격리 해제</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">누적 사망자</p>
            <p className="sb-li-value">값</p>
          </li>
        </ul>

        <ul className="sb-ul">
          <li className="sb-li">
            <p className="sb-li-title">일일 확진자</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">일일 검사 진행</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">일일 격리 해제</p>
            <p className="sb-li-value">값</p>
          </li>
          <li className="sb-li">
            <p className="sb-li-title">일일 사망자</p>
            <p className="sb-li-value">값</p>
          </li>
        </ul>
      </div>
    </div>
  );
}