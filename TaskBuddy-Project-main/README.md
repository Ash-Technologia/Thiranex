# TaskBuddy

TaskBuddy is a focused React task manager for capturing daily work, tracking progress, and keeping a small list under control. Tasks are saved in the browser, so refreshing the page does not lose your list.

## Features

- Add tasks with a priority and category.
- Mark tasks complete or active.
- Search tasks by name.
- Filter by status or category.
- See completion progress at a glance.
- Remove individual tasks or clear completed tasks.
- Responsive layout for desktop and mobile screens.

## Run Locally

From the repository root:

```powershell
Set-Location .\TaskBuddy-Project-main
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Scripts

```powershell
npm run dev      # Start the development server
npm run lint     # Check source files with ESLint
npm run build    # Create a production build
npm run preview  # Preview the production build
```

## Data Storage

Tasks are stored in `localStorage` under the `taskbuddy-tasks` key. Data is local to the browser and is not sent to a server.

## Project Structure

```text
TaskBuddy-Project-main/
	src/
		components/
			ProgressTracker.jsx
			TaskForm.jsx
			TaskList.jsx
		App.jsx
		Style.css
		index.css
		main.jsx
	package.json
```

