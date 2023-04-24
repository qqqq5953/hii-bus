import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NoResult = () => {
	return (
		<>
			<Navbar />
			<div className="grid gap-44">
				<div className="flex whitespace-nowrap bg-gray-100 h-14 overflow-x-scroll overflow-y-hidden items-center">
					<p className="text-lg inline-block whitespace-nowrap pl-5 pr-2.5">
						<span className="text-gradient-start">0</span> 個公車路線
					</p>
				</div>
				<div className="text-center justify-center items-center">
					<p className="text-nav-dark font-medium text-xl leading-8">Oh，找不到符合搜尋的結果，<br />
						請再試看看其他的搜尋吧！</p>
				</div>

			</div>
			<Footer />
		</>
	)
}
export default NoResult;
