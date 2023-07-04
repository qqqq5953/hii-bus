import { IoCode, IoHeart, IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BusInformation = ({ routeName, from, to, getButtonClassName, addToFavorites }) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="px-2 py-2">
					<div className="flex">
						<button onClick={() => navigate(-1)}>
							<IoArrowBackCircleOutline className="hidden text-slate-300 md:block md:mr-3" size={26} />
						</button>
						<div className="font-bold text-2xl text-nav-dark">
							{routeName}
						</div>
					</div>

					<div className="flex py-1 items-center text-nav-dark tracking-wider">
						{from}
						<span className="text-highlight px-1 text-lg">
							<IoCode /></span>
						{to}
					</div>
				</div>
				<div>
					<button>
						<IoHeart className={`${getButtonClassName()} text-2xl mr-3`}
							onClick={() => addToFavorites({ id: routeName, routeName: routeName, from: from, to: to })} />
					</button>
				</div>
			</div>
		</>
	)
}

export default BusInformation;