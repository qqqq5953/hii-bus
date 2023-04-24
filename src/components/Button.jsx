const Button = (props) => {
	const style = {
		display: 'flex',
		width: '80px',
		height: '36px',
		borderRadius: '100px',
		color: '#FFFFFF',
		padding: '18px 8px',
		outline: 0,
		margin: '0px 4px',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: props.backgroundColor,
	}

	return (
		<>
			<div style={style}>{props.children}</div>
		</>
	)
}
export default Button;