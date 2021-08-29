import { useEffect, useState } from "react";
import { getCovid19VaccineCenter } from '../api'
import Map from './Map'

const VaccinationCenter = () => {
  // const data = JSON.parse(localStorage.getItem("vaccineCenter"))
  console.log("백신센터 renders")
  
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProvince, setSelectedProvince] = useState("서울");
  const [selectedCenterInfo, setSelectedCenterInfo] = useState({});
  const [page, setPage] = useState(1)
  
  const [data, setData] = useState([]);
  const [provinceList, setProvinceList] = useState([]);
  const [provincesDataObj, setProvincesDataObj] = useState({});
  let contentList = provincesDataObj[selectedProvince] || 0;

  const [mapCenter, setMapcenter] = useState([37, 127]);
  const [mapZoom, setMapZoom] = useState(6);

  //지도 위치이동
  const onClickHandler = (e)=>{
    const lat = e.target.getAttribute('lat');
    const lng = e.target.getAttribute('lng');
    console.log(e.target.getAttribute('data'))

    setMapcenter([lat, lng]);
    setMapZoom(16);
  }
  
  const showListByPage=()=>{
    let temp=null
    const list_item = (val, idx)=>
      (
        <li key={idx}>
          <span className="toggle-title">{val.centerName}</span>
          <button className="toggle-btn" lat={val.lat} lng={val.lng} data={val}
            onClick={onClickHandler}>위치확인</button>
        </li>
      )

    if(contentList!==0){
      if(page*10 > contentList.length){
        temp=contentList.slice((page-1)*10, contentList.length);
        return temp.map((val, idx)=>{
          return list_item(val, idx)
        })
      }else{
        temp=contentList.slice((page-1)*10, page*10);
        return temp.map((val, idx) => {
          return list_item(val, idx)
        })
      }
    }
  }
  
  const prevBtnControl=()=>{
    if(page===1) return true;
    else return false;
  }

  const nextBtnControl=()=>{
    if((page*10)>=parseInt(contentList.length)) return true;
    else return false;
  }
  
  const changePage = (e) =>{
    if (e.target.name==='btn-next'){
      setPage(page+1);
    }
    else if (e.target.name==='btn-prev'){
      setPage(page-1);
    }
  }

  const onChange = e =>{
    setSelectedProvince(e.target.value)
    setPage(1)
  }

  // 데이터 fetching
  useEffect(()=>{
    const fetchData = async ()=>{
      console.log("API call to fetch Data")
      setIsLoading(true)

      const res = await getCovid19VaccineCenter()
      setData(res)
      localStorage.setItem("vaccineCenter", JSON.stringify(res))

      setIsLoading(false)
    }
    
    localStorage.getItem("vaccineCenter")===null ?
      fetchData() : setData(JSON.parse(localStorage.getItem("vaccineCenter")))
  }, [])

  // 데이터 가공
  useEffect(()=>{
    setIsLoading(true)
    if(data.length > 0){
      const _provinceList = new Set();
      const _provincesDataObj = new Object;
  
      data.forEach(val=>{
        let temp = null;
        let key = null;
    
        if(val.address[0]===' ') temp = val.address.slice(1)
        
        if(temp===null) key = val.address.split(' ')[0]
        else key = temp.split(' ')[0]
    
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
    
        _provinceList.add(key);
        _provincesDataObj[key]===undefined ? _provincesDataObj[key] = [val] : _provincesDataObj[key].push(val)
      })
      setProvinceList(_provinceList)
      setProvincesDataObj(_provincesDataObj)
    }
    setIsLoading(false)
  }, [data])

  return(
    <div className="container">
      <p className="sb-title">예방접종센터 찾기</p>
      <div className="vc-container">
        {/* <VMap data={selectedCenterInfo}></VMap> */}
        <Map center={mapCenter} zoom={mapZoom}></Map>
        <div className="center-list">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <div>
              <span>
                <select className="sel" onChange={onChange}>
                  {Array.from(provinceList).map((val, idx)=><option key={idx}>{val}</option>)}
                </select>
                <span>총 {provincesDataObj[selectedProvince]===undefined ? null : provincesDataObj[selectedProvince].length}군데</span>
                {page} / {Math.ceil(contentList.length/10)}
                <button 
                    disabled={prevBtnControl()}
                    name="btn-prev"
                    onClick={changePage}
                    >이전</button>
                <button
                    disabled={nextBtnControl()}
                    name="btn-next"
                    onClick={changePage}
                    >다음</button>
              </span>
              <ul style={{textAlign:"left"}}>
                {showListByPage()}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VaccinationCenter;