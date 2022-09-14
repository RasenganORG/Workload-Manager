import { Card, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
// import { updateTask, deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
import Comments from './task components/comments';
import Content from './task components/content';
import Title from './task components/title';
import UpdateButtons from './task components/updateButtons';
import { deleteTask, updateTask } from '../../../../../../../features/tasks/tasksSlice';
import { TimeTracker } from './timeTracker';
import { current } from '@reduxjs/toolkit';

export default function Task() {
  const [currentTask, setCurrentTask] = useState({
    id: '',
    asigneeId: '',
    taskData: [],
    projectId: '',
    timeTracker: []
  })
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [userPlannedWork, setUserPlannedWork] = useState([])
  const [viewMode, setViewMode] = useState('readOnly')
  const [formData, setFormData] = useState({
    id: currentTask?.id,
    asigneeId: currentTask?.asigneeId,
    taskData: currentTask?.taskData,
  })

  const form = { formData, setFormData }
  const displaySaveButton = { showSaveButton, setShowSaveButton }
  const display = { viewMode, setViewMode }
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { project } = useSelector((state) => state.projects.currentProject)
  const { userList } = useSelector(state => state.users)
  const { tasks } = useSelector(state => state.tasks)

  const getTask = () => {
    return tasks?.find((task) => {
      return task.id == params.taskId
    })
  }
  //we verify the user that are assign to the project and return an array with all the users assigned
  const getAssignedUsers = (users) => {
    let usersArr = []
    users.forEach(user => {
      if (project.usersAssigned.includes(user.id)) {
        usersArr.push(user)
      }
    })
    return usersArr
  }
  //form handlers
  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      taskData: {
        ...prevState.taskData,
        [e.target.name]: e.target.value,
      }
    }))
  }

  const onSelectChange = (value, inputName) => {
    setShowSaveButton(true)
    if (inputName === 'asigneeId') {
      setFormData((prevState) => ({
        ...prevState,
        [inputName]: value

      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        taskData: {
          ...prevState.taskData,
          [inputName]: value
        }
      }))
    }

  }

  // event handlers
  const handleSave = (e) => {
    dispatch(updateTask({ taskData: formData, taskId: formData.id }))

    setViewMode('readOnly')
    navigate('../')
  }

  const handleEditButton = () => {
    setShowSaveButton(true)
    setViewMode('edit')
  }

  const handleDelete = () => {
    dispatch(deleteTask(currentTask.id))
    navigate('../')
  }

  const eventHandlers = { onInputChange, onSelectChange, handleSave, handleEditButton, handleDelete }

  useEffect(() => {
    setCurrentTask(getTask(tasks))
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    setCurrentTask(getTask(tasks))

    if (userList && currentTask) {
      const { id, asigneeId, projectId, taskData, timeTracker } = currentTask

      setFormData({
        ...formData,
        id: id,
        projectId: projectId,
        asigneeId: asigneeId,
        taskData: {
          title: taskData.title,
          description: taskData.description,
          queue: taskData.queue,
          priority: taskData.priority,
          complexity: taskData.complexity,
          creationDate: taskData.creationDate,
          dueDate: taskData.dueDate,
          comments: taskData.comments,
          creationDate: taskData.creationDate,
          creatorId: taskData.creatorId,
        },
        timeTracker: timeTracker

      })
    }

  }, [userList, currentTask])
  return (
    <Card title={<Title display={display} eventHandlers={eventHandlers} form={form} />} style={{ width: "100%", margin: "16px 0" }}>
      <Content
        display={display}
        form={form}
        eventHandlers={eventHandlers}
        getAssignedUsers={getAssignedUsers}
      />
      <Row>
        <Col span={12}>
          <Comments
            saveButton={displaySaveButton}
            display={display}
            form={form}
          />
        </Col>
        <Col span={12}>
          <TimeTracker
            saveButton={displaySaveButton}
            display={display}
            form={form}
          />
        </Col>
      </Row>
      <UpdateButtons
        saveButton={displaySaveButton}
        eventHandlers={eventHandlers}
      />
    </Card >
  )
}
