import React, { useEffect, useMemo, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ProgressTracker from './components/ProgressTracker'
import './Style.css'

const STORAGE_KEY = 'taskbuddy-tasks'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      return savedTasks ? JSON.parse(savedTasks) : []
    } catch {
      return []
    }
  })
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((currentTasks) => [...currentTasks, { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() }])
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed))
  }

  const categories = useMemo(() => ['All', ...new Set(tasks.map((task) => task.category))], [tasks])
  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesQuery = task.text.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && !task.completed) || (statusFilter === 'completed' && task.completed)
    const matchesCategory = categoryFilter === 'All' || task.category === categoryFilter
    return matchesQuery && matchesStatus && matchesCategory
  }), [tasks, query, statusFilter, categoryFilter])
  const activeCount = tasks.filter((task) => !task.completed).length

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <div><p className="eyebrow">PERSONAL WORKSPACE</p><h1>TaskBuddy</h1><p className="tagline">A calmer way to get things done.</p></div>
        <div className="header-count"><strong>{activeCount}</strong><span>open tasks</span></div>
      </header>
      <main>
        <ProgressTracker tasks={tasks} />
        <section className="workspace-panel" aria-labelledby="tasks-heading">
          <div className="section-heading"><div><p className="eyebrow">YOUR LIST</p><h2 id="tasks-heading">Today&apos;s focus</h2></div>
            {tasks.length > 0 && <button className="text-button" type="button" onClick={clearCompleted} disabled={!tasks.some((task) => task.completed)}>Clear completed</button>}
          </div>
          <TaskForm addTask={addTask} />
          <div className="task-toolbar">
            <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks" aria-label="Search tasks" /></label>
            <div className="filter-group" aria-label="Task filters">{['all', 'active', 'completed'].map((filter) => <button key={filter} type="button" className={statusFilter === filter ? 'filter-button active' : 'filter-button'} onClick={() => setStatusFilter(filter)}>{filter[0].toUpperCase() + filter.slice(1)}</button>)}</div>
            <select className="category-filter" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category">{categories.map((category) => <option key={category}>{category}</option>)}</select>
          </div>
          <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </section>
      </main>
    </div>
  )
}
