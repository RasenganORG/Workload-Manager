import Board from 'react-trello'
import { Layout } from 'antd'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { updateTask } from '../../../../../../../features/projects/projectsSlice';
import { useEffect } from 'react';
import { getProjectItem } from '../../../../../../../features/projects/projectsSlice';
import { resetCurrentProjectSuccess, resetProjectsLoading } from '../../../../../../../features/projects/projectsSlice';
import { updateUTP } from '../../../../../../../features/users_tasks_projects/user_task_projectSlice';
export default function Tasks() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const users_tasks_projects = useSelector(state => state.users_tasks_projects.users_tasks_projects)
  const { project, isSuccess } = useSelector(state => state.projects.currentProject)
  const { userList } = useSelector(state => state.users)

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProjectItem(params.projectId))
      dispatch(resetCurrentProjectSuccess())
      dispatch(resetProjectsLoading())
    }
  }, [isSuccess, dispatch, params.id])

  //get project tasks and filter them by the queue
  const backlogTasks = project.tasks ? project.tasks.filter((task) => task.queue === 'Backlog') : 0
  const sprintTasks = project.tasks ? project.tasks.filter((task) => task.queue === 'Sprint') : 0
  const inProgressTasks = project.tasks ? project.tasks.filter((task) => task.queue === 'In Progress') : 0
  const completedTasks = project.tasks ? project.tasks.filter((task) => task.queue === 'Completed') : 0
  const blockedTasks = project.tasks ? project.tasks.filter((task) => task.queue === 'Blocked') : 0

  const handleCardDelete = (taskId) => {
    let taskToDelete = project.tasks.find(task => task.id == taskId)
    dispatch(deleteTask({ data: taskToDelete, projectId: params.projectId, taskId: params.taskId }))
  }
  const handleLaneChange = (fromLaneId, toLaneId, cardId) => {
    const currentTask = project.tasks.find(task => task.id == cardId)
    const utp_item = users_tasks_projects.find(utp => utp.taskId === parseInt(cardId))
    const newTask = {
      ...currentTask,
      queue: toLaneId,
    }
    const checkIfTaskIsCompleted = () => {
      return newTask.queue === "Completed" ? true : false
    }

    dispatch(updateTask({ data: { newTask, currentTask }, projectId: params.projectId, taskId: cardId }));
    dispatch(updateUTP({ utpData: { userId: newTask.asignee, taskCompleted: checkIfTaskIsCompleted() }, utpId: utp_item.id }))
  }
  const taskGenerator = (task) => {
    //the taskAsignee property is the user's ID, the following fuction takes the userID and returns the full user object, 
    //so that the name can be displayed on the task 
    const userObject = userList?.find(user => user.id === task.asignee)

    return {
      id: task.id.toString(),
      title: task.title,
      description: task.description,
      label: userObject?.name,
    }
  }
  const data = {
    lanes: [
      {
        id: 'Backlog',
        title: 'Backlog',
        label: `${backlogTasks.length}`,
        cards: backlogTasks ? backlogTasks.map((task) => taskGenerator(task)) : []
      },
      {
        id: 'Sprint',
        title: 'Sprint',
        label: `${sprintTasks.length}`,
        cards: sprintTasks ? sprintTasks.map((task) => taskGenerator(task)) : []
      },
      {
        id: 'Blocked',
        title: 'Blocked ',
        label: `${blockedTasks.length}`,
        cards: blockedTasks ? blockedTasks.map((task) => taskGenerator(task)) : []
      },
      {
        id: 'In Progress',
        title: `In Progress`,
        label: `${inProgressTasks.length}`,
        cards: inProgressTasks ? inProgressTasks.map((task) => taskGenerator(task)) : []
      },
      {
        id: 'Completed',
        title: 'Completed',
        label: `${completedTasks.length}`,
        cards: completedTasks ? completedTasks.map((task) => taskGenerator(task)) : []
      }
    ]
  }

  return (
    <Layout>
      <Board
        data={data}
        style={{ background: "transparent" }}
        draggable={true}
        onCardClick={(cardId, metadata, laneId) => navigate(`${cardId}`)}
        onCardDelete={(cardId) => handleCardDelete(cardId)}
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId) => handleLaneChange(fromLaneId, toLaneId, cardId)}
        hideCardDeleteIcon={true}
      />
      <Outlet />
    </Layout>

  )
}
