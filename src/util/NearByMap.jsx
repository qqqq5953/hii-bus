import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";


const NearByMap = ({ finalNearbyStops, location }) => {
	const markers = finalNearbyStops?.map((item) => {
		return {
			geocode: [item.StopLat, item.StopLon],
			popUp: item.StopName,
			distance: item.Distance,
		}
	});
	// console.log('markers', markers);
	// console.log('地圖內 finalNearbyStops', finalNearbyStops);

	// 取附近站牌的中心點
	const userLat = location.coordinates?.lat;
	const userLon = location.coordinates?.lon;
	const centerCoordinates = [userLat, userLon];
	// const centerCoordinates = markers[0]?.geocode;
	console.log("centerCoordinates", centerCoordinates);

	// 建立站牌的 marker
	const customIcon = new Icon({
		iconUrl: require("../images/stopIcon.png"),
		iconSize: [28, 28],
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconAnchor: [13, 28],
		popupAnchor: [1, -34],
		shadowSize: [40, 31],
	});

	// 建立使用者的 marker
	const userIcon = new Icon({
		iconUrl: "https://letswritetw.github.io/letswrite-leaflet-osm-locate/dist/dot.svg",
		iconSize: [20, 20],
	})


	return (
		<>
			{centerCoordinates[0] !== ""
				&& centerCoordinates[1] !== ""
				&&
				(<MapContainer className="block object-cover h-full"
					center={centerCoordinates} zoom={16.5} >
					<TileLayer
						attribution='Tiles &copy; Esri &mdash; '
						url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
					/>

					{markers?.map((marker) => (
						<div key={marker.geocode}>
							<Marker position={marker.geocode} icon={customIcon}>
								<Popup>
									<h2><b>{marker.popUp}</b></h2>
									<p>距離 {Math.floor(marker.distance * 100)}0 m</p>
								</Popup>
							</Marker>
						</div>
					))}

					{location.loaded && !location.error && (
						<Marker icon={userIcon}
							position={[userLat, userLon]}>
						</Marker>
					)}
				</MapContainer>)}
		</>
	)
}

export default NearByMap;