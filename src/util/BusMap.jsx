import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";


const BusMap = ({ routeName, finalRoute, stopData }) => {
	const defaultDirection = finalRoute[`${routeName}_0`];
	const stopLonObj = defaultDirection?.map((item) => {
		return {
			key: item.StopName.Zh_tw,
			lng: item.StopPosition.PositionLon, // 經度
			lat: item.StopPosition.PositionLat, // 緯度
		}
	});


	const markers = stopLonObj?.map((item) => {
		return {
			geocode: [item.lat, item.lng],
			popUp: item.key,
		}
	});
	// console.log('markers', markers);


	const customIcon = new Icon({
		iconUrl: require("../images/stopIcon.png"),
		iconSize: [28, 28],
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconAnchor: [13, 28],
		popupAnchor: [1, -34],
		shadowSize: [40, 31],
	});

	// 定出地圖中心點
	const centerIndex = Math.floor(stopData.length / 2);
	const centerLat = stopData[centerIndex]?.StopPosition.PositionLat;
	const centerLon = stopData[centerIndex]?.StopPosition.PositionLon;
	const centerCoords = [centerLat, centerLon];
	// console.log("centerCoords", centerCoords);

	return (
		<>
			{centerCoords[0] !== undefined
				&& centerCoords[1] !== undefined
				&& (
					<MapContainer className="min-h-full"
						center={centerCoords} zoom={14} >
						<TileLayer
							attribution='Tiles &copy; Esri &mdash; '
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
						/>

						{markers?.map((marker) => (
							<div key={marker.geocode}>
								<Marker position={marker.geocode} icon={customIcon}>
									<Popup><h2>{marker.popUp}</h2></Popup>
								</Marker>
							</div>
						))}
					</MapContainer>
				)
			}
		</>
	)
}

export default BusMap;