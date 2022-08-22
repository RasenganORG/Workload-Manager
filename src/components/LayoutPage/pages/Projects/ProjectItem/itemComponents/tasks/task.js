import { Card, Row, Col, Form, Button, Select, Input, message, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { EditOutlined, LeftCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateTask, deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { reset } from '../../../../../../../features/users/userSlice';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
export default function Task() {
  const [currentTask, setCurrentTask] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [viewMode, setViewMode] = useState('readOnly')
  //we would be able to assign a task only to people that are assigned to this project 
  //the list of assigned users is obtained by filtering through the allUsers state using the id's of the
  //users that are assinged to the selected project
  const [usersAssigned, setUsersAssigned] = useState([])
  const { title, description, asignee, queue, priority, complexity, creationDate, dueDate, id } = currentTask

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    asignee: asignee,
    queue: queue,
    priority: priority,
    complexity: complexity,
    creationDate: creationDate,
    dueDate: dueDate,
    id: id
  })

  const { project } = useSelector(
    (state) => state.projects.currentProject
  )
  const { userList } = useSelector(
    (state) => state.users
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
    if (userList) {
      setUsersAssigned(getAssignedUsers(userList))
    }

  }, [])
  useEffect(() => {
    if (userList) {
      setUsersAssigned(getAssignedUsers(userList))
      setFormData({
        title: title,
        description: description,
        asignee: asignee,
        queue: queue,
        priority: priority,
        complexity: complexity,
        creationDate: creationDate,
        dueDate: dueDate,
        id: id
      })
    }

  }, [userList])


  //form handler
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
  //event handlers
  const handleSave = (e) => {
    const newTask = formData;
    setViewMode('readOnly')
    dispatch(updateTask({ data: { newTask, currentTask }, projectId: params.projectId, taskId: params.taskId }))
    dispatch(reset())
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

  //task card title information
  const titleData = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {viewMode == 'readOnly' ?
            <>
              <p style={{ margin: 0 }}>{title}</p>
              <EditOutlined onClick={handleEditButton} style={{ cursor: 'pointer' }} />

            </>
            :
            <>
              <Input name='title' onChange={(e) => { onInputChange(e) }} defaultValue={title} />
              <CloseOutlined onClick={() => { setViewMode('readOnly') }} />
            </>
          }
        </div>
        <div onClick={() => navigate(-1)}>
          <Button><LeftCircleOutlined />Go back</Button>
        </div>
      </div>
    )
  }

  return (
    <Card title={titleData()} style={{ width: "100%", margin: "16px 0" }}>
      <Row gutter={32}>
        <Col span={24} style={{ textAlign: 'left' }}>
          {viewMode == 'readOnly' ?
            <p >{description}</p>
            :
            <Input.TextArea name='description' style={{ width: '50%' }} onChange={(e) => onInputChange(e)} defaultValue={description} />
          }
        </Col>
      </Row>

      <Row justify='space-between'>
        <Col span={6}>

          <Form
            layout="vertical"
            style={{ textAlign: 'left ' }}
          >
            <Form.Item label="Status:" >
              <Select onChange={(e) => { onSelectChange(e, 'queue') }} placeholder={queue}>
                <Select.Option value="Sprint">Sprint</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Blocked">Blocked</Select.Option>
                <Select.Option value="Backlog">Backlog</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Complexity:" >
              <Select onChange={(e) => { onSelectChange(e, 'complexity') }} placeholder={currentTask.complexity}>
                <Select.Option value="Low complexity">Low complexity</Select.Option>
                <Select.Option value="Medium complexity">Medium complexity</Select.Option>
                <Select.Option value="High complexity">High complexity</Select.Option>
              </Select>
            </Form.Item>


            <Popconfirm

              title="Are you sure to delete this task?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              {showSaveButton ? <Button type='danger' >Delete task</Button> : ''}
            </Popconfirm>
          </Form>


        </Col>

        <Col span={6}>
          <Form
            layout="vertical"
            style={{ textAlign: 'left ' }}
          >
            <Form.Item label="Priority:" >
              <Select onChange={(e) => { onSelectChange(e, 'priority') }} placeholder={priority}>
                <Select.Option value="Low priority">Low priority</Select.Option>
                <Select.Option value="Medium priority">Medium priority</Select.Option>
                <Select.Option value="High Priority">High Priority</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Assigned:">
              <Select placeholder={asignee} onChange={(e) => { onSelectChange(e, 'asignee') }}>
                {usersAssigned ? usersAssigned.map((user, index) => {
                  return <Select.Option key={index} value={user.name}>{user.name}</Select.Option>
                }) : ''}
              </Select>
            </Form.Item>
            {showSaveButton ? <Button type='primary' onClick={(e) => { handleSave(e) }}>Save changes</Button> : ''}
          </Form>
        </Col>

      </Row>

    </Card >
  )
}