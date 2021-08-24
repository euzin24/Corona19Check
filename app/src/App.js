import TotalStatus from './component/TotalStatus';
import ProvincialStatus from './component/ProvincialStatus';
import VaccinationCenter from './component/VaccinationCenter';
import './App.css';
import { getCovid19InfStateJson, getCovid19SidoInfStateJson, getCovid19VaccineCenter } from './api';
import { useEffect } from 'react';

function App() {
  console.log("앱 renders")
  const date = new Date();
  const provinceList = new Set();
  const provincesDataObj = new Object();
  
  // getCovid19InfStateJson();
  // getCovid19SidoInfStateJson();
  const getVaccineCenterData = async()=>{
    const vaccineCenter = await getCovid19VaccineCenter();
    localStorage.setItem("vaccineCenter", JSON.stringify(vaccineCenter));
  }

  console.log("vaccine center data processing")

  const data = JSON.parse(localStorage.getItem("vaccineCenter"))
  data.forEach(val=>{
    if(val.address[0]===' ') val.address = val.address.slice(1)

    let key = val.address.split(' ')[0]

    if(key.length===4){
      if(key==='경상남도') key='경남'
      else if(key==='경상북도') key='경북'
      else if(key==='충청남도') key='충남'
      else if(key==='충청북도') key='충북'
      else if(key==='전라남도') key='전남'
      else if(key==='전라북도') key='전북'
    }else{
      key = key.slice(0, 2)
    }

    provinceList.add(key);
    provincesDataObj[key]===undefined ? provincesDataObj[key] = [val] : provincesDataObj[key].push(val)
  })
  
  useEffect(()=>{
    console.log("앱 useEffect")

    if(localStorage.getItem("vaccineCenter")===null){
      console.log("vaccineCenter API call");
      getVaccineCenterData();
    }

    
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
          <TotalStatus date={date}></TotalStatus>
        </div>
        <div id="provincial-status" className="section">
          <ProvincialStatus date={date}></ProvincialStatus>
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
