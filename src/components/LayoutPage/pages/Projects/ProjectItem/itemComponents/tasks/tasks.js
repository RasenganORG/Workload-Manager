import Board from 'react-trello'
import { Layout, Skeleton, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { deleteTask } from '../../../../../../../features/projects/projectsSlice';
// import { updateTask } from '../../../../../../../features/projects/projectsSlice';
import { useEffect, useState } from 'react';
import { updateTask, getAllTasks } from '../../../../../../../features/tasks/tasksSlice';
import { resetReloadTasks, resetTasksSuccess } from '../../../../../../../features/tasks/tasksSlice';

export default function Tasks() {
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { tasks, isLoading, reloadTasks, isSuccess } = useSelector(state => state.tasks)
  const { userList } = useSelector(state => state.users)
  const projectTasks = tasks?.filter(task => task.projectId == params.projectId)

  //get project tasks and filter them by the queue
  const backlogTasks = projectTasks ? projectTasks.filter((task) => task.taskData.queue === 'Backlog') : 0
  const sprintTasks = projectTasks ? projectTasks.filter((task) => task.taskData.queue === 'Sprint') : 0
  const inProgressTasks = projectTasks ? projectTasks.filter((task) => task.taskData.queue === 'In Progress') : 0
  const completedTasks = projectTasks ? projectTasks.filter((task) => task.taskData.queue === 'Completed') : 0
  const blockedTasks = projectTasks ? projectTasks.filter((task) => task.taskData.queue === 'Blocked') : 0



  const handleLaneChange = (fromLaneId, toLaneId, cardId) => {
    const currentTask = tasks.find(task => task.id == cardId)
    const isTaskCompleted = () => {
      return toLaneId === "Completed"
    }
    const newTask = {
      ...currentTask,
      taskData: {
        ...currentTask.taskData,
        queue: toLaneId,
        isTaskCompleted: isTaskCompleted()
      },
    }
    dispatch(updateTask({ taskData: newTask, taskId: cardId }))
  }
  const taskGenerator = (task) => {
    //the taskAsignee property is the user's ID, the following fuction takes the userID and returns the full user object, 
    //so that the name can be displayed on the task 
    const userObject = userList?.find(user => user.id === task.asigneeId)

    if (isLoading) {
      return {
        id: '',
        title: '',
        description: <Skeleton active paragraph={false} />,
        label: ''
      }
    }
    return {
      id: task.id.toString(),
      title: task.taskData.title,
      description: task.taskData.description,
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
  const getData = () => {
    return {
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
  }
  useEffect(() => {
    dispatch(getAllTasks())
    if (reloadTasks) {
      dispatch(resetReloadTasks())
    }
    if (isSuccess) {
      dispatch(getAllTasks())
      dispatch(resetTasksSuccess())
    }


  }, [dispatch, params.id, reloadTasks])

  if (isLoading) {
    return (
      <Layout>
        <Spin indicator={<LoadingOutlined style={{ marginTop: '5rem', fontSize: '5rem' }} spin />} />
      </Layout>
    )
  }
  return (
    <Layout>
      <Board
        data={data}
        style={{ background: "transparent" }}
        draggable={true}
        onCardClick={(cardId, metadata, laneId) => navigate(`${cardId}`)}
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId) => handleLaneChange(fromLaneId, toLaneId, cardId)}
        hideCardDeleteIcon={true}
      />
      <Outlet />
    </Layout>

  )
}
