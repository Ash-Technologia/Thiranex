import React, { useState } from 'react'

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [category, setCategory] = useState('General')

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanTask = task.trim()
    if (!cleanTask) return
    addTask({ text: cleanTask, priority, category, completed: false })
    setTask('')
    setPriority('Medium')
    setCategory('General')
  }

  return <form onSubmit={handleSubmit} className="task-form">
    <div className="task-input-wrap"><input type="text" placeholder="What needs your attention?" value={task} onChange={(event) => setTask(event.target.value)} aria-label="New task" /><button type="submit">Add task <span aria-hidden="true">+</span></button></div>
    <div className="task-options"><label>Priority<select value={priority} onChange={(event) => setPriority(event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></label><label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>General</option><option>Work</option><option>Personal</option></select></label></div>
  </form>
}
