vw.ol3.MapOptions = {
  basemapType: vw.ol3.BasemapType.GRAPHIC
  , controlDensity: vw.ol3.DensityType.EMPTY
  , interactionDensity: vw.ol3.DensityType.BASIC
  , controlsAutoArrange: true
  , homePosition: vw.ol3.CameraPosition
  , initPosition: vw.ol3.CameraPosition
};
 
var vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions);

function move(x,y,z){
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