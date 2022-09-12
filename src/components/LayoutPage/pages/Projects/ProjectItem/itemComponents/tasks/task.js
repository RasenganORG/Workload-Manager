import { Card, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateTask, deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { getAllUsers, updateUser } from '../../../../../../../features/users/userSlice';
import Comments from './task components/comments';
import Content from './task components/content';
import Title from './task components/title';
import UpdateButtons from './task components/updateButtons';
import { deleteUTP, updateUTP } from '../../../../../../../features/users_tasks_projects/user_task_projectSlice';
import { TimeTracker } from './timeTracker';

export default function Task() {
  const [currentTask, setCurrentTask] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [userPlannedWork, setUserPlannedWork] = useState([])
  const [viewMode, setViewMode] = useState('readOnly')
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
    comments: comments,
    workload: {
      loggedWorload: [],
      plannedWorkload: {}
    }
  })

  const userPlannedWorkInfo = { userPlannedWork, setUserPlannedWork }
  const form = { formData, setFormData }
  const displaySaveButton = { showSaveButton, setShowSaveButton }
  const display = { viewMode, setViewMode }
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { project } = useSelector((state) => state.projects.currentProject)
  const { userList } = useSelector(state => state.users)
  const { user } = useSelector(state => state.auth)
  const users_tasks_projects = useSelector(state => state.users_tasks_projects.users_tasks_projects)
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
    const utp_item = users_tasks_projects.find(utp => utp.taskId === currentTask.id)
    const newTask = formData;
    const wasTaskCompleted = formData.queue === "Completed" ? true : false

    setViewMode('readOnly')
    dispatch(updateUser({ data: { plannedWorkload: userPlannedWork }, userId: user.id }))
    dispatch(updateTask({ data: { newTask, currentTask }, projectId: params.projectId, taskId: params.taskId }))
    dispatch(updateUTP({ utpData: { userId: formData.asignee, taskCompleted: wasTaskCompleted }, utpId: utp_item.id }))
    navigate('../')
  }

  const handleEditButton = () => {
    setShowSaveButton(true)
    setViewMode('edit')
  }

  const handleDelete = () => {
    //get the user_task_project item id to delete
    const utp_item = users_tasks_projects.find(utp => utp.taskId === currentTask.id)

    dispatch(deleteUTP(utp_item.id))
    dispatch(deleteTask({ data: currentTask, projectId: params.projectId, taskId: params.taskId }))
    navigate('../')
  }

  const eventHandlers = { onInputChange, onSelectChange, handleSave, handleEditButton, handleDelete }

  useEffect(() => {
    setCurrentTask(getTask(project.tasks))
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    setCurrentTask(getTask(project.tasks))
    if (userList) {
      setFormData({
        ...formData,
        title: title,
        description: description,
        asignee: asignee,
        queue: queue,
        priority: priority,
        complexity: complexity,
        creationDate: creationDate,
        dueDate: dueDate,
        id: id,
        comments: comments,
      })
    }

  }, [userList])

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
            userPlannedWorkInfo={userPlannedWorkInfo}
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
