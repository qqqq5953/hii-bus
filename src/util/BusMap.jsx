import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
// import stopIcon from "../images/stopIcon.png";




const BusMap = ({ routeNumber, routeName, city, finalRoute }) => {

	const defaultDirection = finalRoute[`${routeName}_0`];
	const stopLonObj = defaultDirection?.map((item) => {
		return {
			key: item.StopName.Zh_tw,
			lon: item.StopPosition.PositionLon, // 經度
			lat: item.StopPosition.PositionLat, // 緯度
		}
	});

	// const stopLocationLat = defaultDirection.StopPosition.PositionLat;
	console.log('defaultDirection', defaultDirection);

	// console.log('Map裡面的finalRoute', finalRoute);
	// console.log('Map裡面的routeName', routeName);
	console.log('stopLonObj', stopLonObj);
	// console.log('stopLocationLat', stopLocationLat);

	const markers = stopLonObj?.map((item) => {
		return {
			geocode: [item.lat, item.lon],
			popUp: item.key,
		}
	});
	console.log('markers', markers);


	const customIcon = new Icon({
		iconUrl: require("../images/stopIcon.png"),
		iconSize: [28, 28],
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconAnchor: [13, 28],
		popupAnchor: [1, -34],
		shadowSize: [40, 31],

	});

	return (
		<>
			<MapContainer className="block object-cover md:h-1/2 lg:h-full"
				center={[25.03577587529372, 121.52012180515803]} zoom={16} >
				<TileLayer
					attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
				/>
				{/* <p>{markers[10].geocode[0]}</p> */}

				{markers?.map((marker) => (
					<Marker position={marker.geocode} key={marker.geocode} icon={customIcon}>
						<Popup><h2>{marker.popUp}</h2></Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	)
}

export default BusMap;