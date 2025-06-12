import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const { username, email, password } = values
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password
      })
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-50">
      {/* Left Section */}
      <div className="w-1/2 text-left -mt-40 px-10">
        <h1 className="text-green-800 janda-font text-[100px] leading-tight">
          WELCOME!
        </h1>
        <p className="mt-4 text-gray-600 text-[16px] max-w-md">
          Join the WasteWise movement and turn trash into treasure!
          <br />
          Create your account to share green ideas, explore creative recycling, and connect with fellow eco-innovators
          <br />
          Let’s make waste matter—sign up and start your journey today!
        </p>
      </div>

      {/* Right Section (Card) */}
      <div className="w-[450px] bg-white shadow-2xl rounded-4xl p-15 mb-30">
        <h2 className="text-green-700 text-[42px] font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChanges}
          />
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChanges}
          />
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChanges}
          />
          <input
            className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChanges}
          />
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="unhide-password"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="unhide-password">Unhide Password</label>
          </div>
          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 font-semibold cursor-pointer">
            SIGN UP
          </button>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp