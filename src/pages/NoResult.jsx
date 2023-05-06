import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const NoResult = () => {
	return (
		<>
			<div className="flex flex-col h-screen">
				<Navbar />

				<div className="flex whitespace-nowrap bg-gray-100 h-14 items-center">
					<p className="text-lg whitespace-nowrap pl-5 pr-2.5">
						<span className="text-gradient-start">0</span> 個公車路線
					</p>
				</div>
				<div className="flex h-full text-center justify-center items-center">
					<p className="text-nav-dark font-medium text-xl leading-8">Oh，找不到符合搜尋的結果，<br />
						請再試看看其他的搜尋吧！</p>
				</div>


				<Footer />
			</div>
		</>
	)
}
export default NoResult;
