import { useEffect, useState } from "react";
import { getCovid19VaccineCenter } from '../api'
import VMap from './VMap'

const VaccinationCenter = props => {
  // const data = JSON.parse(localStorage.getItem("vaccineCenter"))
  console.log("백신센터 renders")

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("서울");
  const [page, setPage] = useState(1)
  const [provinceList, setProvinceList] = useState([]);
  const [provincesDataObj, setProvincesDataObj] = useState({});
  let contentList = provincesDataObj[selectedProvince] || 0;

  const showListByPage=()=>{
    let temp=null
    if(contentList!==0){
      if(page*10 > contentList.length){
        temp=contentList.slice((page-1)*10, contentList.length);
        return temp.map((val, idx)=>{
          return (
            <li key={idx}>
              {val.centerName}
            </li>
          )
        })
      }else{
        temp=contentList.slice((page-1)*10, page*10);
        return temp.map((val, idx) => {
          return (
            <li key={idx}>
              {val.centerName}
            </li>
          )
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
    console.log("백신센터 useEffect1")

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
    console.log("백신센터 useEffect2")

    setIsLoading(true)
    if(data.length > 0){
      const _provinceList = new Set();
      const _provincesDataObj = new Object;
  
      console.log("vaccine center data processing")
  
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
      console.log(_provinceList)
      console.log(_provincesDataObj)
      setProvinceList(_provinceList)
      setProvincesDataObj(_provincesDataObj)
    }
    setIsLoading(false)
  }, [data])

  return(
    <div className="container">
      <p className="sb-title">예방접종센터 찾기</p>
      <div className="vc-container">
        {/* <div className="vmap-container">
          <div id="vmap"></div>
          <div id="buttons">
          <button type="button" 
          // onclick="javascript:move(14129709.590359,4512313.7639686,15);" 
          >여의도</button>
          <button type="button" 
          // onclick="javascript:move(14679304.585522275, 4472545.1240446,14);" 
          >독도</button>
          </div>
        </div> */}
        <VMap></VMap>
        <div className="center-list">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VaccinationCenter;