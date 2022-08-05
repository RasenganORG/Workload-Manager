import Board from 'react-trello'
import { Layout } from 'antd'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { getProject } from '../../../../../../features/projects/projectsSlice'
import { current } from '@reduxjs/toolkit'

export default function Tasks() {

  const { currentProject } = useSelector(
    (state) => state.projects
  )

  //get project tasks and filter them by the queue
  const backlogTasks = currentProject.tasks.filter((task) => task.queue == 'backlog')
  const pendingTasks = currentProject.tasks.filter((task) => task.queue == 'pending')
  const inProgressTasks = currentProject.tasks.filter((task) => task.queue == 'inProgress')
  const completedTasks = currentProject.tasks.filter((task) => task.queue == 'completed')

  const taskGenerator = (task, index) => {
    return {
      id: index.toString(), //if id is passed as a number we would receive a console error
      title: task.title,
      description: task.description,
      label: task.priority
    }
  }

  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Backlog',
        label: `${backlogTasks.length}`,
        cards: backlogTasks.map((task, index) => taskGenerator(task, index))
      },
      {
        id: 'lane2',
        title: 'Pending tasks',
        label: `${pendingTasks.length}`,
        cards: pendingTasks.map((task, index) => taskGenerator(task, index))
      },
      {
        id: 'lane3',
        title: 'In progress',
        label: `${inProgressTasks.length}`,
        cards: inProgressTasks.map((task, index) => taskGenerator(task, index))
      },
      {
        id: 'lane4',
        title: 'Completed',
        label: `${completedTasks.length}`,
        cards: completedTasks.map((task, index) => taskGenerator(task, index))
      },
      {
        id: 'lane5',
        title: 'My tasks',
        label: 'task number here',
        cards: []
      }
    ]
  }
  const testCardCLick = (cardId) => {
    console.log(cardId + " was selected")
  }

  // https://www.npmjs.com/package/react-trello kanban board documentation

  return (
    <Layout>
      <Board
        data={data}
        style={{ background: "transparent" }}
        draggable={true}
      // onCardClick={() => navigate(`individual-task`)}
      />
      <Outlet />
    </Layout>

  )
}
