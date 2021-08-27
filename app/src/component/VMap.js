import { useEffect, useState } from "react";

const VMap = (props) => {
  console.log("VMap renders")

  const data = props.data;

  //지도 api javascript implement
  useEffect(()=>{
    console.log("Vmap useEffect 1 script implementation")
    const $ = document.querySelector('.vmap-container')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.textContent = `
    var vmap;
      var selectMarker;
      var markerLayer;

      vw.ol3.MapOptions = {
          basemapType: vw.ol3.BasemapType.GRAPHIC
        , controlDensity: vw.ol3.DensityType.EMPTY
        , interactionDensity: vw.ol3.DensityType.BASIC
        , controlsAutoArrange: true
        , homePosition: vw.ol3.CameraPosition
        , initPosition: vw.ol3.CameraPosition
      };
        
      vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions);
      
      function move(x, y){
        console.log("moved", x, y);
        var _center = [ x, y ];
        // var z = z;
        var pan = ol.animation.pan({
          duration : 2000,
          source : (vmap.getView().getCenter())
        });
        vmap.beforeRender(pan);
        vmap.getView().setCenter(_center);
        setTimeout("fnMoveZoom()", 1000);
      }
        
      function fnMoveZoom() {
        zoom = vmap.getView().getZoom();
        if (16 > zoom) {
          vmap.getView().setZoom(14);
        }
      };
    
      vmap.on('pointermove', function(evt) {
        var feature = vmap.forEachFeatureAtPixel(evt.pixel, function(feature,layer) {
          if (layer != null && layer.className == 'vw.ol3.layer.Marker') {
          $('#param').val('');
          $('#param').val(feature.get('id'));
          selectMarker = feature;
          } else {
          return false;
          }
        });
      });

      function addMarkerLayer(x, y, data) {
        // console.log("addMarkerLayer");
        if (markerLayer != null) {
          console.log("마커레이어 존재")
          addMarker(x, y, data);
          vmap.getView().setCenter([ x, y ]);
          vmap.getView().setZoom(15);
        } else { //마커 레이어 이니셜라이징
          console.log("마커 레이어 이니셜라이징")
          markerLayer = new vw.ol3.layer.Marker(vmap);
          vmap.addLayer(markerLayer);
          addMarker(x, y, data);
          vmap.getView().setCenter([ x, y ]);
          vmap.getView().setZoom(15);
        }
      }
      
      function addMarker(_x, _y, data) {
        console.log("addMarker")
        const marker = vw.ol3.markerOption = {
          x : _x,
          y : _y,
          epsg : "EPSG:3857",
          title : data.facilityName,
          contents : data.address,
          text : {
          offsetX: 0.5, //위치설정
          offsetY: 20,   //위치설정
          font: '12px Calibri,sans-serif',
          fill: {color: '#000'},
          stroke: {color: '#fff', width: 2},
          text: data.centerName
          },
          attr: {"id":"maker","name":"속성"}
        };
        markerLayer.addMarker(vw.ol3.markerOption);
      }
      
      function moveAndAddMarker(x, y, data) {
        console.log("moveAndAddMarker", data)
        move(x, y);
        addMarkerLayer(x, y, data);
      }
    `;
    $.appendChild(script)

  }, [])

  useEffect(()=>{
    console.log("Vmap useEffect 2")
    if(Object.keys(data).length!==0){
      const lat_long = degrees2meters(data.lng, data.lat);
      console.log(lat_long)
      window.moveAndAddMarker(lat_long[0], lat_long[1], data);
    }
  }, [data])

  // 좌표계 4326(lat long) to espg 3857 변환 함수
  const degrees2meters = (lon, lat) => {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y]
  }

  // const x = 127.940763;
  // const y = 37.338561;
  // const temp_data = {
  //   centerName: "임시센터명",
  //   facilityName: "임시시설명",
  //   address: "임시주소"
  // }
  
  // const xx = 127.016749;
  // const yy = 37.5894;
  // const temp_data2 = {
  //   address: "서울특별시 성북구 보문로 168",
  //   centerName: "코로나19 서울특별시 성북구 예방접종센터",
  //   facilityName: "성북아트홀(구청4층)"
  // }

  // let check=true;

  return (
    <div className="vmap-container">
      <div id="vmap" className="vmap"></div>
      {/* <div id="buttons">
        <button 
          type="button" 
          onClick={()=>{
            if(check){
              const xy = degrees2meters(x, y)
              window.moveAndAddMarker(xy[0], xy[1], temp_data);
              check=false
            } else {
              const xy = degrees2meters(xx, yy)
              window.moveAndAddMarker(xy[0], xy[1], temp_data2);
              check=true;
            }
          }}
        >강원도 치악체육관</button>
      </div> */}
    </div>
  );
}

export default VMap