import Button from "./Button";

const ButtonForCity = ({ children }) => {
	return (
		<Button backgroundColor={true ? "#5468FF" : "#FFF"}
			fontColor={true ? "#FFF" : "#5468FF"}>
			{children}
		</Button >
	)
}

export default ButtonForCity;