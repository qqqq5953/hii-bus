import BusEstimateArrival from "../components/BusEstimateArrival";
import Footer from "../components/Footer";


const BusEstimate = () => {
	return (
		<>
			<div className="h-1.5 animate-color "></div>


			<div className="h-auto bg-white">
				<div className="flex flex-col items-center">
					<BusEstimateArrival />
				</div>


			</div>
			<Footer />
		</>
	)
}
export default BusEstimate;