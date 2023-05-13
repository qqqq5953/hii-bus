import axios from 'axios';

async function getAuthorizationHeader() {
	const parameter = {
		grant_type: "client_credentials",
		client_id: "qqqq5953-b6093e34-65c5-477a",
		client_secret: "a51082fe-444b-4bce-a1c9-644e0b9ca233"
	};

	let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

	const res = await axios({
		method: "POST",
		data: new URLSearchParams(parameter),
		url: auth_url,
		crossDomain: true,
		headers: { "content-type": "application/x-www-form-urlencoded" }
	})

	// console.log('getAuthorizationHeader', res.data);
	return res.data.access_token
}

export default getAuthorizationHeader;