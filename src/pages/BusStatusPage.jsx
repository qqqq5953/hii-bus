import BusEstimateArrival from "../components/BusEstimateArrival";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const BusEstimate = () => {
	return (<>
		<div className="flex flex-col h-auto lg:h-screen">
			<Navbar className="hidden md:block" />

			<div className="h-full">
				<BusEstimateArrival />
			</div>

			<Footer />
		</div>
	</>
	)
}
export default BusEstimate;