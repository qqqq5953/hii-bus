import { useState } from 'react'
import { useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const signup = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Password do not match!')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError('Failed to create an account!')
    }
    setLoading(false)
  }

  return (
    <div className="fixed z-50 bg-black/80 w-2/3 left-0 right-0">
      <div className="text-white" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="flex my-2">
          <p>Email</p>
          <input type="text" ref={emailRef} required />
        </div>
        <div className="flex my-2">
          <p>Password</p>
          <input type="text" ref={passwordRef} required />
        </div>
        <div className="flex my-2">
          <p>Password Confirmation</p>
          <input type="text" ref={passwordConfirmRef} required />
        </div>
        <button disabled={loading} className="bg-blue-300" type="submit">
          Sign Up
        </button>
      </div>
      <div className="text-white">
        <p>Already have an account?</p>
        <button className="bg-blue-300" type="submit">
          Log In
        </button>
      </div>
    </div>
  )
}

export default Signup
