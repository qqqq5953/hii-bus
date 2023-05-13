import axios from "axios";

// 取得市區所有公車路線
// /v2/Bus/Route/City/{City}
const allRoutes = axios.create({
	baseURL: 'https://tdx.transportdata.tw/api/basic/v2/Bus/'
})

// 取得預估到站資料[批次更新]
// /v2/Bus/EstimatedTimeOfArrival/City/{City}/{RouteName}
// 全縣市

// 取得路線的站序資料 (座標)
// /v2/Bus/StopOfRoute/City/{City}/{RouteName}
// 全縣市

// 取得路線資訊 (營運業者、車牌號碼、票價)
// /v2/Bus/Route/City/{City}/{RouteName}
// 全縣市

// 取得指定[縣市],[路線名稱] 的市區公車路線班表資料
// /v2/Bus/Schedule/City/{City}/{RouteName}