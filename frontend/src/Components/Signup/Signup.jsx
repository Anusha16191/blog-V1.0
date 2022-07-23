import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../context/Alert/AlertContext'
import UserContext from '../../context/User/UserContext'
import picture from './signup.jpg'
import "./signup.css"

const Signup = () => {

  const navigate = useNavigate()

  const context = useContext(UserContext)
  const alertcontext = useContext(AlertContext)
  const { signup } = context
  const { showAlert, mode } = alertcontext

  const [info, setinfo] = useState({ username: "", password: "", confirmpassword: '' })

  const onChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value })
  }


  const submit = (e) => {
    if (info.password !== info.confirmpassword) {
      console.log(info.password + "==" + info.confirmpassword)
      showAlert("password mismatch!", 'danger')
      return 0;
    }
    else {
      e.preventDefault()
      signup(info.username, info.password)
      showAlert("User signup registration successfull", "primary")
      navigate(-1)
    }
  }

  return (
    <div className="signup h-100">

      <div className={`bg-${mode} text-${mode === "light" ? "dark" : "light"} h-100 p-5`} >


        <div className='signupcard container d-flex p-0' style={{ backgroundColor: mode === "light" ? "white" : "#303443" }}>

          <div className='pic w-50'>
            <img src={picture} alt="signup side pic" width="100%" height="100%" />
          </div>

          <div className="signupform p-3 ">

            <form onSubmit={submit} autoComplete="off">

              <h1 align="center">Join Us...</h1>
              <div className="mb-3 mt-5 w-100">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" minLength={3} required className="form-control" id="username" onChange={onChange} name="username" aria-describedby="username" />
              </div>

              <div className="mb-3 w-100">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" minLength={8} required className="form-control" name="password" onChange={onChange} id="password" />
              </div>

              <div className="mb-5 w-100">
                <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                <input type="password" minLength={8} required className="form-control" name="confirmpassword" onChange={onChange} id="confirmpassword" />
              </div>


              <button type="submit" className="btn w-50 p-2 ">signup</button>

            </form>
          </div>

        </div>

      </div>
    </div>

  )
}

export default Signup