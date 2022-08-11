import Board from 'react-trello'
import { Layout } from 'antd'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../../../../features/projects/projectsSlice';
export default function Tasks() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { currentProject } = useSelector(
    (state) => state.projects
  )

  //get project tasks and filter them by the queue
  const backlogTasks = currentProject.tasks.filter((task) => task.queue == 'Backlog')
  const sprintTasks = currentProject.tasks.filter((task) => task.queue == 'Sprint')
  const inProgressTasks = currentProject.tasks.filter((task) => task.queue == 'In Progress')
  const completedTasks = currentProject.tasks.filter((task) => task.queue == 'Completed')
  const blockedTasks = currentProject.tasks.filter((task) => task.queue == 'Blocked')

  const taskGenerator = (task) => {
    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      label: task.asignee,
      metadata: {
        taskInfo: 'asdsa'
      }
    }
  }

  let handleCardDelete = (taskId) => {
    console.log(taskId)
  }

  const data = {
    lanes: [
      {
        id: 'backlogLane',
        title: 'Backlog',
        label: `${backlogTasks.length}`,
        cards: backlogTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'sprintLane',
        title: 'Sprint',
        label: `${sprintTasks.length}`,
        cards: sprintTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'blockedLane',
        title: 'Blocked ',
        label: `${inProgressTasks.length}`,
        cards: blockedTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'inProgressLane',
        title: 'In progress',
        label: `${completedTasks.length}`,
        cards: inProgressTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'completedLane',
        title: 'Completed',
        label: 'task number here',
        cards: completedTasks.map((task) => taskGenerator(task))
      }
    ]
  }


  // https://www.npmjs.com/package/react-trello kanban board documentation

  return (
    <Layout>
      <Board
        data={data}
        style={{ background: "transparent" }}
        draggable={true}
        onCardClick={(cardId, metadata, laneId) => navigate(`${cardId}`)}
        canAddLanes={true}
        onCardDelete={(cardId) => handleCardDelete(cardId)}
      />
      <Outlet />
    </Layout>

  )
}
