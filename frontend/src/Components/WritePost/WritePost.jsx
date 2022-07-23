import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostContext from '../../context/Post/PostContext'
import AlertContext from "../../context/Alert/AlertContext"
import "./writepost.css"

const WritePost = () => {

  const navigate = useNavigate()

  const context = useContext(PostContext)
  const alertcontext = useContext(AlertContext)


  const { createPost } = context
  const { showAlert, mode } = alertcontext

  const [data, setdata] = useState({ title: "", description: "" })

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault()
    createPost(data.title, data.description)
    showAlert("Posted!", "primary")
    navigate("/")
  }

  return (
    <div className={`writepost h-100 bg-${mode} text-${mode === "light" ? "dark" : "light"} p-5`}>
        <div className="container">
          <form onSubmit={submit}>

            <div className="details">
              <h1>What is on your mind today...</h1>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control bg-light" onChange={onChange} name="title" id="description" />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea rows={4} name="description" className="form-control bg-light" onChange={onChange} id="description" />
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="submit" className="btn w-50 p-2 " style={{ borderRadius: "16px", fontWeight: "bold", backgroundColor: "darkorange" }}>Publish</button>
              </div>

            </div>
          </form>

        </div>

    </div>
  )
}

export default WritePost