import React from 'react';
import L from 'leaflet';

class MapComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: props.center,
			zoom: props.zoom,
		};
	}

	render() {
		return (
			<div id="mapid" style={{ height: '500px' }}></div>
		);
	}

	componentDidMount() {
		this.map = L.map('mapid').setView(this.state.center, this.state.zoom);
		// ...
	}
}

export default MapComponent;
