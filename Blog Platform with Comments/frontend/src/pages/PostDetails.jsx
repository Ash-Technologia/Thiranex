import { useNavigate, useParams } from "react-router-dom"
import { BiEdit } from "react-icons/bi"
import { MdDeleteOutline } from "react-icons/md"
import axios from "axios"
import { URL, IF } from "../url"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"

const PostDetails = () => {
  const { id: postId } = useParams()
  const { user } = useContext(UserContext)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const loadPost = async () => {
      try {
        const [postResponse, commentResponse] = await Promise.all([axios.get(`${URL}/api/posts/${postId}`), axios.get(`${URL}/api/comments/post/${postId}`)])
        setPost(postResponse.data)
        setComments(commentResponse.data)
      } catch {
        setError("This story could not be loaded.")
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [postId])

  const handleDeletePost = async () => { await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true }); navigate("/") }

  const postComment = async (event) => {
    event.preventDefault()
    if (!user || !comment.trim()) return
    setPosting(true)
    setError("")
    try {
      const response = await axios.post(`${URL}/api/comments/create`, { comment: comment.trim(), author: user.username, postId }, { withCredentials: true })
      setComments((current) => [...current, response.data])
      setComment("")
    } catch {
      setError("Your comment could not be posted. Please try again.")
    } finally { setPosting(false) }
  }

  if (loading) return <><Navbar /><div className="flex min-h-[70vh] items-center justify-center"><Loader /></div></>
  if (!post) return <><Navbar /><div className="mx-auto min-h-[60vh] max-w-3xl px-6 py-20 text-center"><h1 className="font-serif text-3xl">{error}</h1></div></>

  return <><Navbar /><main className="mx-auto max-w-6xl px-6 py-12 md:px-12"><article><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e06b3c]">A fresh perspective</p><h1 className="max-w-4xl font-serif text-4xl leading-tight text-[#20362e] md:text-6xl">{post.title}</h1></div>{user?._id === post.userId && <div className="flex gap-3 text-xl"><button aria-label="Edit post" onClick={() => navigate(`/edit/${postId}`)}><BiEdit /></button><button aria-label="Delete post" onClick={handleDeletePost}><MdDeleteOutline /></button></div>}</div><div className="mt-5 flex flex-wrap gap-3 text-sm text-[#7b847b]"><span>By @{post.username}</span><span>·</span><span>{new Date(post.updatedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}</span></div><img src={IF + post.photo} className="mt-10 max-h-[620px] w-full rounded-[2rem] object-cover" alt={post.title} /><p className="mx-auto mt-10 max-w-3xl whitespace-pre-line text-lg leading-8 text-[#4f5c53]">{post.desc}</p><div className="mt-8 flex flex-wrap gap-2">{post.categories?.map((category) => <span key={category} className="rounded-full bg-[#e5f0e4] px-3 py-1 text-xs font-bold text-[#46624e]">#{category}</span>)}</div></article><section className="mt-20 border-t border-[#e4e0d8] pt-10"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e06b3c]">The conversation</p><h2 className="mt-2 font-serif text-3xl text-[#20362e]">{comments.length} {comments.length === 1 ? "thought" : "thoughts"}</h2></div><div className="mt-8 grid gap-4">{comments.map((item) => <Comment key={item._id} c={item} onDelete={(commentId) => setComments((current) => current.filter((entry) => entry._id !== commentId))} onUpdate={(updated) => setComments((current) => current.map((entry) => entry._id === updated._id ? updated : entry))} />)}</div>{user ? <form onSubmit={postComment} className="mt-8 rounded-2xl bg-[#e8f0e6] p-5"><label className="text-sm font-bold text-[#20362e]" htmlFor="comment">Add your perspective</label><textarea id="comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="What stayed with you?" rows="4" className="mt-3 w-full rounded-xl border-0 bg-white p-4 text-sm outline-none ring-1 ring-[#d5ddd3] focus:ring-[#e06b3c]" /><div className="mt-3 flex justify-end"><button disabled={posting || !comment.trim()} className="rounded-xl bg-[#20362e] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">{posting ? "Posting..." : "Publish thought"}</button></div></form> : <div className="mt-8 rounded-2xl bg-[#f2eee7] p-5 text-sm text-[#5f6d63]">Log in to join the conversation.</div>}{error && <p className="mt-3 text-sm text-red-600">{error}</p>}</section></main><Footer /></>
}

export default PostDetails
