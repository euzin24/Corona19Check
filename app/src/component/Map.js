import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import '../App.css'
import ic2x from '../images/marker-icon-2x.png'
import ic from '../images/marker-icon.png'
import shadow from '../images/marker-shadow.png'

//버튼 이미지 초기화 후 재설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: ic2x,
  iconUrl: ic,
  shadowUrl: shadow
});

const ChangeView = ({center, zoom})=>{
  const map = useMap();
  map.flyTo(center, zoom, 2)
  return null
}

const Map = ({center, zoom})=>{
  return (
    <div>
      <MapContainer style={{ float:"left", height: "70vh", width: "60%" }} center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom}></ChangeView>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker title="sjkdahkjsdh" position={center}>
          <Popup>
            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map