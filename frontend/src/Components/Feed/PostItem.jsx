import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/Alert/AlertContext'
import UserContext from '../../context/User/UserContext'
import "./postitem.css"


const PostItem = (props) => {

    const [date, setdate] = useState('')
    const context = useContext(AlertContext)
    const { mode } = context


    useEffect(() => {
        setdate(new Date(props.timestamp).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' }))
        // eslint-disable-next-line
    }, [])


    return (
        <div className='postitem container my-5 d-flex' style={{ justifyContent: "center" }}>

            <div className={`card w-75 text-${mode === "dark" ? "white" : "dark"}`} style={{ backgroundColor: mode === "dark" ? "#303443" : "white" }}>

                <div className="card-header d-flex" style={{ backgroundColor: mode === "dark" ? "black" : "darkorange", }}>

                    <div className="user">

                        {props.profilepic &&

                            <img src={`data:image/jpeg;base64,${props.profilepic}`} width="36px" height="36px" alt="postimg" />
                        }
                        {!props.profilepic && <i className="fa-solid fa-circle-user"></i>}
                        <span>  {props.username}</span>
                    </div>

                    <div style={{ width: "fit-content" }}>
                        <b>{date}</b>
                    </div>

                </div>
                <div className="card-body">
                    {props.postimg && <div style={{ display: 'flex', justifyContent: "center", height: "400px" }}>
                        <img src={`data:image/jpeg;base64,${props.postimg}`} width="100%" height="100%" alt="postimg" />
                    </div>}
                    <h3>{props.title}</h3>
                    <div>
                        <p className="card-text">{props.description}</p>
                        <Link to="./post" onClick={() => { localStorage.setItem("postid", props.id) }}><i className="fa-solid fa-comment-dots fa-2x" style={{ color: mode === 'light' ? 'black' : 'white', cursor: "pointer" }}></i></Link>
                        <i className="fa-solid fa-heart fa-2x mx-5" style={{ cursor: "pointer" }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem