import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import { NavLink, Link } from "react-router-dom"
import AlertContext from '../../context/Alert/AlertContext'
import UserContext from '../../context/User/UserContext'

const NavBar = (props) => {

    const [icon, seticon] = useState("fa-solid fa-moon")
    const context = useContext(AlertContext)
    const { showAlert, changeMode, mode } = context

    const usercontext = useContext(UserContext)
    const { userdata, fetchuserdata } = usercontext

    useEffect(() => {
        if (props.token)
            fetchuserdata()
        // eslint-disable-next-line
    }, [props.token])


    const deletetoken = () => {
        localStorage.removeItem("token")
        showAlert("Logged out Successfully", "success")
    }

    return (
        <nav className={`navbar navbar-${mode}`} style={{ backgroundColor: mode === "light" ? "darkorange" : "#212529" }} >


            <div className='nav-links'>
                <div className='d-flex'>



                    <div className="form-check form-switch navbar-brand m-0">
                        <input className="form-check-input" style={{ backgroundColor: mode === "light" ? "white" : "darkorange" }} onClick={() => {
                            changeMode();

                            if (icon === "fa-solid fa-moon")
                                seticon("fa-solid fa-sun")
                            else
                                seticon("fa-solid fa-moon")
                            showAlert(`${mode === "light" ? "Enabled" : "Disabled"} dark mode`, "primary")
                        }} type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={mode === "dark" ? true : false} />

                    </div>
                    <div className="navbar-brand">
                        <i style={{ color: mode === "dark" ? "darkorange" : "black" }} className={`${icon}`}></i>
                    </div>

                    <NavLink className="navbar-brand" to="/"><i className="fa-solid fa-house-chimney"></i> Home</NavLink>
                    {props.token &&
                        <div className='d-flex'>
                            <Link className="navbar-brand" to="/write"><i className="fa-solid fa-feather"></i><span> Write</span></Link>
                            <Link className="navbar-brand" to="/feed" ><i className="fa-solid fa-book-open"></i><span> Feed</span></Link>
                            <Link className="navbar-brand" to="/profile"><i className="fa-solid fa-address-card"></i><span> Profile</span></Link>
                        </div>
                    }
                </div>

                <div className='d-flex'>

                    {!props.token && <>
                        <Link className="navbar-brand" to="/signup"><i className="fa-solid fa-user-plus"></i> Signup</Link>
                        <Link className="navbar-brand" to="/login"><i className="fa-solid fa-user-pen"></i> Login</Link>
                    </>}

                    {props.token && <>
                        <span className="navbar-brand" style={{ color: "white" }}>Welcome, <i className="fa-solid fa-circle-user"></i> {userdata.username}</span>
                        <Link className="navbar-brand" onClick={deletetoken} to="/"><i className="fa-solid fa-user-pen"></i> Logout</Link>
                    </>
                    }
                </div>
            </div>

        </nav>
    )
}

export default NavBar