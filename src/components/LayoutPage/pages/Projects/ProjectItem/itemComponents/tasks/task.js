import { Card } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateTask, deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
import Comments from './task components/comments';
import Content from './task components/content';
import Title from './task components/title';
import UpdateButtons from './task components/updateButtons';

export default function Task() {
  const [currentTask, setCurrentTask] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [viewMode, setViewMode] = useState('readOnly')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('')
  const { title, description, asignee, queue, priority, complexity, creationDate, dueDate, id, comments } = currentTask
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    asignee: asignee,
    queue: queue,
    priority: priority,
    complexity: complexity,
    creationDate: creationDate,
    dueDate: dueDate,
    id: id,
    comments: comments
  })

  const form = { formData, setFormData }
  const displaySaveButton = { showSaveButton, setShowSaveButton }
  const display = { viewMode, setViewMode }
  const modalStatus = { isModalVisible, setIsModalVisible }
  const commentState = { newComment, setNewComment }

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { project } = useSelector(
    (state) => state.projects.currentProject
  )
  const { userList } = useSelector(
    (state) => state.users
  )
  const { user } = useSelector(
    (state) => state.auth
  )
  const getTask = (tasks) => {
    return tasks.find((task) => {
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

  useEffect(() => {
    setCurrentTask(getTask(project.tasks))
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    setCurrentTask(getTask(project.tasks))
    if (userList) {
      setFormData({
        title: title,
        description: description,
        asignee: asignee,
        queue: queue,
        priority: priority,
        complexity: complexity,
        creationDate: creationDate,
        dueDate: dueDate,
        id: id,
        comments: comments
      })
    }

  }, [userList])

  //form handlers
  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }
  const onSelectChange = (value, inputName) => {
    setShowSaveButton(true)
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: value
    }))
  }
  // event handlers
  const handleSave = (e) => {
    const newTask = formData;
    setViewMode('readOnly')
    dispatch(updateTask({ data: { newTask, currentTask }, projectId: params.projectId, taskId: params.taskId }))
    navigate('../')
  }
  const handleEditButton = () => {
    setShowSaveButton(true)
    setViewMode('edit')
  }
  const handleDelete = () => {
    dispatch(deleteTask({ data: currentTask, projectId: params.projectId, taskId: params.taskId }))
    navigate('../')
  }

  const eventHandlers = { onInputChange, onSelectChange, handleSave, handleEditButton, handleDelete }



  return (
    <Card title={<Title display={display} eventHandlers={eventHandlers} form={form} />} style={{ width: "100%", margin: "16px 0" }}>

      <Content
        display={display}
        form={form}
        eventHandlers={eventHandlers}
        getAssignedUsers={getAssignedUsers}
      />

      <Comments
        saveButton={displaySaveButton}
        display={display}
        modalStatus={modalStatus}
        commentState={commentState}
        form={form}
      />

      <UpdateButtons
        saveButton={displaySaveButton}

        eventHandlers={eventHandlers}

      />

    </Card >
  )
}