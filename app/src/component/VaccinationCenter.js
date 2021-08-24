import { useEffect, useState } from "react";

export default function VaccinationCenter(props) {
  // const data = JSON.parse(localStorage.getItem("vaccineCenter"))
  console.log("백신센터 renders")

  const provinceList = props.provinceList;
  const provincesDataObj = props.provincesDataObj;

  const [selectedProvince, setSelectedProvince] = useState("서울");
  const [page, setPage] = useState(1)
  let contentList=provincesDataObj[selectedProvince]
  
  const showListByPage=()=>{
    let content=[]
    let temp=null

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
  
  const prevBtnControl=()=>{
    if(page===1) return true;
    else return false;
  }

  const nextBtnControl=()=>{
    if((page*10)>=parseInt(contentList.length)) return true;
    else return false;
  }
  
  const showPage = (e) =>{
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

  useEffect(()=>{
    console.log("백신센터 useEffect")
  })


  return(
    <div className="container">
      <p className="sb-title">예방접종센터 찾기</p>
      {/* <div id="vmap-container">
        <div id="vmap" 
        // style="width:100%;height:350px;left:0px;top:0px"
        ></div>
        <div id="buttons">
        <button type="button" 
        // onclick="javascript:move(14129709.590359,4512313.7639686,15);" 
        >여의도</button>
        <button type="button" 
        // onclick="javascript:move(14679304.585522275, 4472545.1240446,14);" 
        >독도</button>
        </div>
      </div> */}
      <div className="vc-container">
        <div className="vmap-test">
          v map
        </div>
        <div className="center-list">
          <span>
            <select className="sel" onChange={onChange}>
              {Array.from(provinceList).map((val, idx)=><option key={idx}>{val}</option>)}
            </select>
            <span>총 {provincesDataObj[selectedProvince].length}군데</span>
            {page} / {Math.ceil(contentList.length/10)}
            <button 
                disabled={prevBtnControl()}
                name="btn-prev"
                onClick={showPage}
                >이전</button>
            <button
                disabled={nextBtnControl()}
                name="btn-next"
                onClick={showPage}
                >다음</button>
          </span>
          <ul style={{textAlign:"left"}}>
            {showListByPage()}
          </ul>
        </div>
      </div>
    </div>
  );
}