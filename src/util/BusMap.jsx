import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import getAuthorizationHeader from './getAuthorizationHeader';
import DataContext from '../data/DataContext';


const BusMap = () => {
	const { routeNumber, city, api, CityObj } = useContext(DataContext);
	const [stops, setStops] = useState([]);

	useEffect(() => {
		const accessToken = getAuthorizationHeader();
		axios.get(`${api}StopOfRoute/City/${CityObj[city]}/${routeNumber}?%24format=JSON`, {
			headers: {
				"authorization": "Bearer " + accessToken,
			},
		}).then(response => {
			const data = response.data;
			// 解析 API 回傳的資料，取得各個站牌的經緯度
			const stopData = data.map(stop => ({
				id: stop.RouteUID,
				name: stop.RouteName.Zh_tw,
				latitude: stop.StopPosition.PositionLat,
				longitude: stop.StopPosition.PositionLo,
			}));
			setStops(stopData);
			console.log('stops', stops);
		}).catch(error => {
			console.error('Error fetching station data:', error);
		});
	}, []);

	const markers = [
		{
			geocode: [25.03577587529372, 121.52012180515803],
			popUp: "哈囉！這是中正紀念堂！"
		},
		{
			geocode: [25.031086339892102, 121.51227060707113],
			popUp: "哈囉！這是建中！"
		},
		{
			geocode: [25.03368364315022, 121.51579010959325],
			popUp: "哈囉！這是國立臺灣博物館南門園區！"
		},
	];

	const customIcon = new Icon({
		iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
		iconSize: [25, 41],
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],

	});

	return (
		<>
			<MapContainer className="block object-cover md:h-1/2 lg:h-full"
				center={[25.03577587529372, 121.52012180515803]} zoom={17} >
				<TileLayer
					attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
				/>

				{markers.map((marker) => (
					<Marker position={marker.geocode} key={marker.geocode} icon={customIcon}>
						<Popup><h2>{marker.popUp}</h2></Popup>
					</Marker>
				))}
			</MapContainer>
		</>
	)
}

export default BusMap;