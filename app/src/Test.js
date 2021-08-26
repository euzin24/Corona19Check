import './App.css'
import { useEffect } from "react";

const Test = () => {
  console.log("test renders")
  useEffect(()=>{
    const $ = document.querySelector('.vmap-container')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.textContent = `vw.ol3.MapOptions = {
      basemapType: vw.ol3.BasemapType.GRAPHIC
      , controlDensity: vw.ol3.DensityType.EMPTY
      , interactionDensity: vw.ol3.DensityType.BASIC
      , controlsAutoArrange: true
      , homePosition: vw.ol3.CameraPosition
      , initPosition: vw.ol3.CameraPosition
    };
    
    var vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions);
    
    function move(x,y,z){
      console.log("moved");
      var _center = [ x, y ];
    
      var z = z;
      var pan = ol.animation.pan({
        duration : 2000,
        source : (vmap.getView().getCenter())
      });
      vmap.beforeRender(pan);
      vmap.getView().setCenter(_center);
      setTimeout("fnMoveZoom()", 3000);
    }
    
    function fnMoveZoom() {
      zoom = vmap.getView().getZoom();
      if (16 > zoom) {
        vmap.getView().setZoom(14);
      }
    };
    `
    $.appendChild(script)
  }, [])

  const move = (x, y, z) => window.move(x, y, z);

  return (
    <div className="vmap-container">
      <div id="vmap" className="vmap"></div>
      <div id="buttons">
      <button type="button" onClick={()=>{
        move(14129709.590359,4512313.7639686,15)
      }}>여의도</button>
      <button type="button" onClick={()=>{
        move(14679304.585522275, 4472545.1240446,14)
      }}>독도</button>
      </div>
    </div>
  );
}

export default Test