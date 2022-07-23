import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./userdata.css"
const UserData = (props) => {

    const [date, setdate] = useState()
    const [rerender, setrerender] = useState(0)

    const calcDate = () => {

        setdate(new Date(props.userdata.timestamp).toLocaleDateString('en-In', { timeZone: 'Asia/Kolkata' }))
        setTimeout(() => {
            if (rerender === 0) setrerender(1)
        }, 200)
    }

    useEffect(() => {
        calcDate()
        // eslint-disable-next-line
    }, [rerender])


    return (

        <div className='userdata'>
            <div className={`card bg-${props.mode === "light" ? 'white' : 'secondary'} my-5`}>
                <div className="card-body">
                    <i className="fa-solid fa-circle-user fa-5x"></i>
                    <div className="info">

                        <h5>Username: {props.userdata.username}</h5>

                    </div>

                </div>
                <div className={`card-footer bg-${props.mode === "light" ? 'light' : 'black'}`}>
                    Account created on {date}
                </div>
            </div>
        </div >
    )
}

export default UserData