import React from 'react'

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) return <div className="empty-state"><span aria-hidden="true">✦</span><h3>Nothing here yet</h3><p>Add a task above or adjust your filters.</p></div>
  return <ul className="task-list">{tasks.map((task) => <li key={task.id} className={task.completed ? 'task-item completed' : 'task-item'}>
    <button className="complete-toggle" type="button" onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Mark ${task.text} active` : `Complete ${task.text}`}>{task.completed ? '✓' : ''}</button>
    <div className="task-copy"><span className="task-title">{task.text}</span><span className={`priority-dot ${task.priority.toLowerCase()}`}></span><span className="task-meta">{task.category} <b>·</b> {task.priority} priority</span></div>
    <button className="delete-button" type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.text}`}>×</button>
  </li>)}</ul>
}
