import { useEffect } from "react";

const VMap = () => {
  console.log("test renders")

  useEffect(()=>{
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
        console.log("moved");
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

      function addMarkerLayer(x, y, place, address) {
        console.log("addMarkerLayer");
        if (markerLayer != null) {
          addMarker(x, y, place, address);
          vmap.getView().setCenter([ x, y ]);
          vmap.getView().setZoom(12);
        } else { //마커 레이어 이니셜라이징
          markerLayer = new vw.ol3.layer.Marker(vmap);
          vmap.addLayer(markerLayer);
          addMarker(x, y, place, address);
          vmap.getView().setCenter([ x, y ]);
          vmap.getView().setZoom(12);
        }
      }
      
      function addMarker(_x, _y, _place, _address) {
        console.log("addMarker", _place, _address)
        const marker = vw.ol3.markerOption = {
          x : _x,
          y : _y,
          epsg : "EPSG:3857",
          title : _place,
          contents : _address,
          text : {
          offsetX: 0.5, //위치설정
          offsetY: -35,   //위치설정
          font: '12px Calibri,sans-serif',
          fill: {color: '#000'},
          stroke: {color: '#fff', width: 2},
          text: _place
          },
          attr: {"id":"maker","name":"속성"}
        };
        markerLayer.addMarker(vw.ol3.markerOption);
      }
      
      function moveAndAddMarker(x, y, place, address) {
        console.log("moveAndAddMarker", place, address)
        move(x, y);
        addMarkerLayer(x, y, place, address);
      }
    `;
    $.appendChild(script)
  }, [])

  const degrees2meters = function(lon, lat) {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y]
  }

  const x = 127.940763;
  const y = 37.338561;
  const place = "강원도 치악체육관"
  const address = "강원도 원주시 서원대로 279 (명륜동 313)"

  return (
    <div className="vmap-container">
      <div id="vmap" className="vmap"></div>
      <div id="buttons">
      <button 
        type="button" 
        onClick={()=>{
          // 좌표계 4326(lat long) to espg 3857 변환
          const lat_long = degrees2meters(x, y)
          console.log(lat_long, place, address);
          window.moveAndAddMarker(lat_long[0], lat_long[1], place, address);
        }}
      >강원도 치악체육관</button>
      </div>
    </div>
  );
}

export default VMap