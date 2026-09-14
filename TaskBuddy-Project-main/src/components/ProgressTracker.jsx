import React from 'react'

export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
  return <section className="progress-tracker" aria-label="Task progress">
    <div className="progress-copy"><div><p className="eyebrow">PROGRESS</p><h2>{completedTasks === totalTasks && totalTasks > 0 ? 'All clear.' : 'Keep the momentum.'}</h2></div><strong>{Math.round(percentage)}%</strong></div>
    <div className="progress-bar"><div className="progress" style={{ width: `${percentage}%` }} /></div>
    <p className="progress-caption">{completedTasks} of {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} completed</p>
  </section>
}
