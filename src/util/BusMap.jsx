import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const BusMap = () => {
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
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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