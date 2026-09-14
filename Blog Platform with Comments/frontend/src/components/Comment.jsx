/* eslint-disable react/prop-types */
import axios from "axios"
import { useContext, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { MdDeleteOutline } from "react-icons/md"
import { UserContext } from "../context/UserContext"
import { URL } from "../url"

const Comment = ({ c, onDelete, onUpdate }) => {
  const { user } = useContext(UserContext)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(c.comment)
  const [saving, setSaving] = useState(false)

  const saveComment = async (event) => {
    event.preventDefault()
    if (!draft.trim()) return
    setSaving(true)
    try {
      const response = await axios.put(`${URL}/api/comments/${c._id}`, { comment: draft }, { withCredentials: true })
      onUpdate(response.data)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const deleteComment = async () => {
    await axios.delete(`${URL}/api/comments/${c._id}`, { withCredentials: true })
    onDelete(c._id)
  }

  const date = new Date(c.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })

  return <article className="rounded-2xl border border-[#e4e0d8] bg-[#fffdf8] p-5 shadow-[0_12px_30px_rgba(36,42,35,0.05)]">
    <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold text-[#20362e]">@{c.author}</p><p className="mt-1 text-xs text-[#8a9189]">{date}</p></div>{user?._id === c.userId && <div className="flex gap-2 text-[#707b70]"><button type="button" aria-label="Edit comment" onClick={() => setEditing(true)}><BiEdit /></button><button type="button" aria-label="Delete comment" onClick={deleteComment}><MdDeleteOutline /></button></div>}</div>
    {editing ? <form onSubmit={saveComment} className="mt-4 flex gap-2"><input autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-[#d5ddd3] bg-white px-3 py-2 text-sm outline-none focus:border-[#e06b3c]" /><button disabled={saving} className="rounded-xl bg-[#20362e] px-4 py-2 text-xs font-bold text-white">{saving ? "Saving" : "Save"}</button><button type="button" onClick={() => { setDraft(c.comment); setEditing(false) }} className="px-2 text-xs text-[#707b70]">Cancel</button></form> : <p className="mt-4 text-sm leading-7 text-[#4f5c53]">{c.comment}</p>}
  </article>
}

export default Comment
