import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AlertContext from '../../context/Alert/AlertContext'
import CommentSection from './CommentSection/CommentSection'
import postimg from "./postimg.jpg"

const Post = (props) => {

    const [date, setdate] = useState('')
    const [rerender, setrerender] = useState(0)

    const context = useContext(AlertContext)
    const { mode } = context


    const calcdate = () => {
        setdate(new Date(props.timestamp).toLocaleString("en-IN", { timeZone: 'Asia/Kolkata' }))
        setTimeout(() => {
            if (rerender === 0) setrerender(1)
        }, 200)
    }

    useEffect(() => {
        calcdate()
        // eslint-disable-next-line
    }, [rerender])

    return (
        <div className='container my-3 d-flex' style={{ justifyContent: "center" }}>
            <div className={`card w-75 text-${mode === "dark" ? "white" : "dark"}`} style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",backgroundColor:mode==="dark"?"#303443":"white" }}>
                <div className="card-header d-flex" style={{ justifyContent: "space-between", backgroundColor: mode === "dark" ? "black" : "darkorange" }}>

                    <div style={{ width: "fit-content", fontWeight: "bold" }}>
                        <i className="fa-solid fa-circle-user"></i> {props.name}
                    </div>

                    <div style={{ width: "fit-content" }}>
                        <b>{date}</b>
                    </div>

                </div>

                <div style={{ display: 'flex', justifyContent: "center", height: "400px" }}>
                    <img src={postimg} width="100%" alt="postimg" />
                </div>
                <div className="card-body">
                    <h3>{props.title}</h3>
                    <p>
                        {props.description}
                    </p>

                    <div className={`card-footer bg-${mode}`}>
                        <CommentSection />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post