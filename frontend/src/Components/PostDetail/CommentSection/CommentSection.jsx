import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AlertContext from '../../../context/Alert/AlertContext'

const CommentSection = () => {

    const [comments, setcomments] = useState([])
    const [rerender, setrerender] = useState(0)
    const [postcomment, setpostcomment] = useState('')
    const context = useContext(AlertContext)
    const {mode,showAlert} =context


    const postComment=async()=>{
        
        const postid = localStorage.getItem("postid")
        const response = await fetch(`http://localhost:5000/api/comments/postComment/${postid}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem("token")
            },
            body:JSON.stringify({comment:postcomment})
        })

        const res = await response.json()
        return res
        
        
    }

    const fetchComments = async () => {
        const id = localStorage.getItem("postid")
        const response = await fetch(`http://localhost:5000/api/comments/fetchComments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })


        setcomments(await response.json())

        setTimeout(() => {
            if(setrerender===0)
            setrerender(rerender+1)
        }, 200)
    }


    const onChange=(e)=>{
        setpostcomment(e.target.value)
    }

    const onSubmit=async (e)=>{
        e.preventDefault()
        const res = await postComment()
        console.log(res.msg)
        if(res.msg==="Negative comment"){

            showAlert(res.msg,"danger")
        }
        else{
            showAlert("Comment Posted!","primary")
        }
        
        setTimeout(() => {
            setrerender(rerender+1)
        }, 200)
        
    }

    useEffect(() => {
        fetchComments()
        console.log("rerender")
        // eslint-disable-next-line
    }, [rerender])

    return (
        <div>
            {comments.length === 0 && <h3>No comments for this post</h3>}
            {comments.length !== 0 && <div className={`card bg-${mode}`} style={{ height: "50vh", overflowY: "scroll" }}>
                <ul className="list-group list-group-flush">
                    {comments.map((Element) => {
                        return (
                            <div key={Element._id}>
                                <li className={`list-group-item bg-${mode==="dark"?"secondary":"white"} text-${mode==="dark"?"white":"black"}`} >
                                    <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <div>

                                            <i className="fa-solid fa-circle-user"></i>
                                            <b className="mx-2">{Element.username}</b>
                                        </div>
                                        <p>{new Date(Element.timestamp).toLocaleString("en-In", { timeZone: "Asia/Kolkata" })}</p>
                                    </div>
                                    {Element.comment}
                                </li>


                            </div>

                        )
                    })}
                </ul>
                
            </div>}

            {!localStorage.getItem("token")&&<h4>Login to post comments</h4>}
            {localStorage.getItem("token")&&<form onSubmit={onSubmit} className='mt-3'>
                <label htmlFor="comment" className="form-label">Post your comment</label>
                <div className='d-flex'>

                    <input  autoComplete="off" type="text" id="comment" className="form-control" onChange={onChange} aria-describedby="passwordHelpBlock" />
                    <button className=' mx-2 btn btn-primary'>Send<i class="fa-solid fa-paper-plane"></i></button>
                </div>

                <div id="passwordHelpBlock" className={`form-text text-${mode==="dark"?"white":"black"}`}>
                    Please Keep The Comment Section Clean and Professional
                </div>
            </form>}
        </div>
    )
}

export default CommentSection