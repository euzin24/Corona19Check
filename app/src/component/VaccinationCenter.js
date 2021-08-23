import { useEffect } from "react";

export default function VaccinationCenter() {
  return(
    <div className="container">
      <p className="sb-title">예방접종센터 찾기</p>
      <div id="vmap-container">
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
      </div>
    </div>
  );
}