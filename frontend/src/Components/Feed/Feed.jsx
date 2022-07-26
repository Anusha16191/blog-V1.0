import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../context/Alert/AlertContext'
import PostContext from '../../context/Post/PostContext'
import Spinner from '../Spinner/Spinner'
import PostItem from './PostItem'

const Feed = () => {

  const context = useContext(PostContext)
  const { posts, fetchAllPosts } = context

  const alertContext = useContext(AlertContext)
  const { mode } = alertContext


  const [loading, setloading] = useState(false)


  const fetchposts = async () => {
    setloading(true)
    await fetchAllPosts()
    setloading(false)
  }



  useEffect(() => {
    fetchposts()
    // eslint-disable-next-line
  }, [])

  return (
    <div >

      <div className={`container text-${mode === "dark" ? "white" : "black"}`}>
        {posts.length === 0 && <h1>No Posts in the blog</h1>}
      </div>

      {loading && <Spinner />}

      {
        posts.map((element) => {
          return <PostItem key={element._id} id={element._id} username={element.username} postimg={element.postimg} title={element.title} description={element.description} timestamp={element.timestamp} />
        })
      }
    </div>
  )
}

export default Feed