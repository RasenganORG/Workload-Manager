import React from 'react';
import Board from 'react-trello'
import { Layout } from 'antd'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { deleteTask, updateProject } from '../../../../../../../features/projects/projectsSlice';
// import { updateTask } from '../../../../../../../features/projects/projectsSlice';
import { useEffect, useState } from 'react';
import { updateTask, getAllTasks } from '../../../../../../../features/tasks/tasksSlice';
import { resetReloadTasks, resetTasksSuccess } from '../../../../../../../features/tasks/tasksSlice';
import { toast } from 'react-toastify';
import { getSprintsByProject } from '../../../../../../../features/sprint/sprintSlice';

export default function Tasks() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const { backlogItems } = useSelector(state => state.backlog)
  const { userList } = useSelector(state => state.users)
  const { currentSprintId } = useSelector(state => state.sprint)
  const { projectTasks, setProjectTasks } = useOutletContext().projectTasksData; // <-- access context value
  const [boardData, setBoardData] = useState({ lanes: [] })
  //get project tasks and filter them by the que ue

  const updateProjectTasksLocally = (taskId, currentTask, newTask) => {
    const updateProjectTasks = [...projectTasks]
    const taskIndex = updateProjectTasks.findIndex(task => task.id === currentTask.id)
    updateProjectTasks[taskIndex] = newTask
    setProjectTasks(updateProjectTasks)
  }

  const handleLaneChange = (fromLaneId, toLaneId, cardId) => {
    const currentTask = tasks.find(task => task.id == cardId)
    const currentBacklog = backlogItems?.find(backlogItem => backlogItem.projectId === params.projectId)

    const isTaskCompleted = () => {
      return toLaneId === "Completed"
    }
    let newTask = {
      ...currentTask
    }
    if (toLaneId !== "Backlog") {
      newTask = {
        ...currentTask,
        taskData: {
          ...currentTask.taskData,
          queue: toLaneId,
          isTaskCompleted: isTaskCompleted(),
          sprintId: currentSprintId,
          backlogId: null
        },
      }
    } else {
      newTask = {
        ...currentTask,
        taskData: {
          ...currentTask.taskData,
          queue: toLaneId,
          isTaskCompleted: isTaskCompleted(),
          sprintId: null,
          backlogId: currentBacklog.backlogId
        },
      }


    }


    updateProjectTasksLocally(cardId, currentTask, newTask) //we store a local copy of the projects task locally in order to avoid fetching the tasks from back end once a task changes lanes

    dispatch(updateTask({ taskData: newTask, taskId: cardId }))
  }
  const taskGenerator = (task) => {
    //the taskAsignee property is the user's ID, the following fuction takes the userID and returns the full user object, 
    //so that the name can be displayed on the task 
    const userObject = userList?.find(user => user.id === task.asigneeId)

    return {
      id: task.id,
      title: task.taskData.title,
      description: task.taskData.description,
      label: userObject?.name,
    }
  }

  const generateBoardData = () => {
    const currentBacklog = backlogItems?.find(backlogItem => backlogItem.projectId === params.projectId)
    const backlogTasksArr = projectTasks ? projectTasks.filter((task) => task.taskData.backlogId === currentBacklog?.backlogId) : []
    const sprintTasksArr = projectTasks ? projectTasks.filter((task) => task.taskData.sprintId === currentSprintId) : []
    const sprintTaskss = sprintTasksArr ? sprintTasksArr.filter((task) => task.taskData.queue === 'Sprint') : []
    const inProgressTaskss = sprintTasksArr ? sprintTasksArr.filter((task) => task.taskData.queue === 'In Progress') : []
    const completedTaskss = sprintTasksArr ? sprintTasksArr.filter((task) => task.taskData.queue === 'Completed') : []
    const blockedTaskss = sprintTasksArr ? sprintTasksArr.filter((task) => task.taskData.queue === 'Blocked') : []

    return {
      lanes: [
        {
          id: 'Backlog',
          title: 'Backlog',
          label: `${backlogTasksArr?.length}`,
          cards: backlogTasksArr?.map((task) => taskGenerator(task))
        },
        {
          id: 'Sprint',
          title: 'Sprint',
          label: `${sprintTaskss.length}`,
          cards: sprintTaskss ? sprintTaskss.map((task) => taskGenerator(task)) : []
        },
        {
          id: 'Blocked',
          title: 'Blocked ',
          label: `${blockedTaskss.length}`,
          cards: blockedTaskss ? blockedTaskss.map((task) => taskGenerator(task)) : []
        },
        {
          id: 'In Progress',
          title: `In Progress`,
          label: `${inProgressTaskss.length}`,
          cards: inProgressTaskss ? inProgressTaskss.map((task) => taskGenerator(task)) : []
        },
        {
          id: 'Completed',
          title: 'Completed',
          label: `${completedTaskss.length}`,
          cards: completedTaskss ? completedTaskss.map((task) => taskGenerator(task)) : []
        }
      ]
    }
  }

  useEffect(() => {
    dispatch(getAllTasks())
    dispatch(getSprintsByProject(params.projectId))

  }, [dispatch, params.id, window.location.href])

  useEffect(() => {
    tasks ? setProjectTasks(tasks?.filter(task => task.projectId === params.projectId)) : setProjectTasks([]);

  }, [tasks])

  useEffect(() => {
    setBoardData((prevState) => ({
      lanes: generateBoardData().lanes
    }))
    console.log('realoaded Tasks page, here are the tasks', projectTasks)
  }, [currentSprintId, tasks])

  return (
    <Layout>
      <Board
        data={boardData}
        style={{ background: "transparent" }}
        cardDraggable={currentSprintId.length !== 0}
        onCardClick={(cardId, metadata, laneId) => navigate(`${cardId}`)}
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId) => handleLaneChange(fromLaneId, toLaneId, cardId)}
        hideCardDeleteIcon={true}
      />
      <Outlet />
    </Layout>

  )
}
