import Board from 'react-trello'
import { Layout, Button, message, Popconfirm } from 'antd'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { updateTask } from '../../../../../../../features/projects/projectsSlice';

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

  const text = 'Are you sure to delete this task?';

  const confirm = () => {
    message.info('Clicked on Yes.');
  };

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

  const handleCardDelete = (taskId) => {
    let taskToDelete = currentProject.tasks.find(task => task.id == taskId)
    dispatch(deleteTask({ data: taskToDelete, projectId: params.projectId, taskId: params.taskId }))

  }

  const handleLaneChange = (fromLaneId, toLaneId, cardId) => {
    const currentTask = currentProject.tasks.find(task => task.id == cardId)
    const newTask = {
      ...currentTask,
      queue: toLaneId,
    }
    dispatch(updateTask({ data: { newTask, currentTask }, projectId: params.projectId, taskId: cardId }))

  }


  const data = {
    lanes: [
      {
        id: 'Backlog',
        title: 'Backlog',
        label: `${backlogTasks.length}`,
        cards: backlogTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'Sprint',
        title: 'Sprint',
        label: `${sprintTasks.length}`,
        cards: sprintTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'Blocked',
        title: 'Blocked ',
        label: `${inProgressTasks.length}`,
        cards: blockedTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'In Progress',
        title: `In Progress`,
        label: `${completedTasks.length}`,
        cards: inProgressTasks.map((task) => taskGenerator(task))
      },
      {
        id: 'Completed',
        title: 'Completed',
        label: 'task number here',
        cards: completedTasks.map((task) => taskGenerator(task))
      }
    ]
  }


  // https://www.npmjs.com/package/react-trello kanban board documentation

  return (
    <Layout>
      <Popconfirm visibile={true} placement="topLeft" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button>TL</Button>
      </Popconfirm>
      <Board
        data={data}
        style={{ background: "transparent" }}
        draggable={true}
        onCardClick={(cardId, metadata, laneId) => navigate(`${cardId}`)}
        canAddLanes={true}
        onCardDelete={(cardId) => handleCardDelete(cardId)}
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId) => handleLaneChange(fromLaneId, toLaneId, cardId)}
      />
      <Outlet />
    </Layout>

  )
}
