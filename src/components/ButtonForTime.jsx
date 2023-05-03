import Button from "./Button";

const ButtonForTime = ({ children }) => {
	return (
		<Button backgroundColor="#FF6464"
			borderStyle={'1px solid #FF6464'}
			fontSize={'12px'}
			fontColor={'#FFF'}>
			{children}
		</Button >
	)
}

export default ButtonForTime;