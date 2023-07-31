import { useRef } from "react";


const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();


	return (
		<div className="fixed z-50 bg-black/80 w-2/3 left-0 right-0">
			<div className="text-white">
				<h2>Sign Up</h2>
				<div className="flex my-2" >
					<p>Email</p>
					<input type="text" ref={emailRef} required />
				</div>
				<div className="flex my-2">
					<p>Password</p>
					<input type="text" ref={passwordRef} required />
				</div>
				<div className="flex my-2" >
					<p>Password Confirmation</p>
					<input type="text" ref={passwordConfirmRef} required />
				</div>
				<button className="bg-blue-300">Sign Up</button>
			</div>
			<div className="text-white">
				<p>Already have an account?</p>
				<button className="bg-blue-300" >Log In</button>
			</div>
		</div>
	)
}

export default Signup;