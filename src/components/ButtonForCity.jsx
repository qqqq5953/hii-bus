import Button from "./Button";

const ButtonForCity = ({ children }) => {
	return (
		<Button backgroundColor={true ? "#5468FF" : "#FFF"}
			fontColor={true ? "#FFF" : "#5468FF"}
			borderStyle={'1px solid #5468FF'}
			fontSize={'14px'}>
			{children}
		</Button >
	)
}

export default ButtonForCity;