const Button = (props) => {
	const style = {
		display: 'flex',
		width: '60px',
		height: '30px',
		borderRadius: '100px',
		color: props.fontColor,
		border: '1px solid #5468FF',
		padding: '18px 8px',
		outline: 0,
		fontSize: '14px',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: props.backgroundColor,
	}

	return (
		<>
			<button style={style}>{props.children}</button>
		</>
	)
}
export default Button;