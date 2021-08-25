import TotalStatus from './component/TotalStatus';
import ProvincialStatus from './component/ProvincialStatus';
import VaccinationCenter from './component/VaccinationCenter';
import './App.css';
import { getCovid19VaccineCenter } from './api';
import { useEffect, useState } from 'react';

const App = ()=>{
  console.log("앱 renders")
  const date = new Date();
  const provinceList = new Set();
  const provincesDataObj = new Object();

  useEffect(()=>{
    // console.log("앱 useEffect")

    // if(localStorage.getItem("vaccineCenter")===null){
    //   console.log("vaccineCenter API call");
    //   getVaccineCenterData();
    // }
  }, [])

  return (
    <div className="App">
      <nav className="nav-bar">
        <p className="app-title">CORONA19Check</p>
        <ul className="nav-ul">
          <li className="nav-li"><a href="#total-status">전체 현황</a></li>
          <li className="nav-li"><a href="#provincial-status">시도별 현황</a></li>
          <li className="nav-li"><a href="#vaccination">예방접종센터 찾기</a></li>
        </ul>
      </nav>
      <div>
        <div id="total-status" className="section">
          {/* <TotalStatus date={date}></TotalStatus> */}
        </div>
        <div id="provincial-status" className="section">
          {/* <ProvincialStatus date={date}></ProvincialStatus> */}
        </div>
        <div id="vaccination" className="section">
          <VaccinationCenter
            provinceList={provinceList}
            provincesDataObj={provincesDataObj}
          ></VaccinationCenter>
        </div>
      </div>
      <footer>
        dlsadlkjwkljd
      </footer>
    </div>
  );
}

export default App;
