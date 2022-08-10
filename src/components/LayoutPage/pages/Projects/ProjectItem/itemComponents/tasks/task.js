import { Avatar, Card, Row, Col, Form, Button, Select, Input } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { EditOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
import { updateTask } from '../../../../../../../features/projects/projectsSlice';
export default function Task() {
  const [currentTask, setCurrentTask] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)

  const [viewMode, setViewMode] = useState('readOnly')
  //we would be able to assign a task only to people that are assigned to this project 
  //the list of assigned users is obtained by filtering through the allUsers state using the id's of the
  //users that are assinged to the selected project
  const [usersAssigned, setUsersAssigned] = useState([])
  const { title, description, asignee, queue, priority, complexity } = currentTask

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    asignee: asignee,
    queue: queue,
    priority: priority,
    complexity: complexity
  })
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentProject } = useSelector(
    (state) => state.projects
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
      if (currentProject.usersAssigned.includes(user.id)) {
        usersArr.push(user)
      }
    })
    return usersArr
  }

  useEffect(() => {
    setCurrentTask(getTask(currentProject.tasks))
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
        complexity: complexity
      })
    }
  }, [userList])


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
  const titleData = () => {
    const handleEditButton = () => {
      setShowSaveButton(true)
      setViewMode('edit')
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {viewMode == 'readOnly' ?
            <p style={{ margin: 0 }}>{title}</p>
            :
            <Input name='title' onChange={(e) => { onInputChange(e) }} defaultValue={title} />
          }

          <EditOutlined onClick={handleEditButton} style={{ cursor: 'pointer' }} />
        </div>
        <div onClick={() => navigate(-1)}>
          <Button><LeftCircleOutlined />Go back</Button>
        </div>
      </div>
    )
  }
  const SaveButton = (props) => {
    const { display } = props;
    const handleSave = () => {
      setShowSaveButton(false)
      setViewMode('readOnly')
      // dispatch(updateTask({ taskData: formData, taskId: 1, projectId: params.projectId }))
    }
    if (showSaveButton) {
      return (
        <div>
          <Button type='primary' onClick={handleSave}>Save changes</Button>
        </div>
      )
    } else {
      return <></>
    }


  }

  // dispatch(updateTask({ taskData: formData, taskId: 1, projectId: params.projectId }))
  return (
    <Card title={titleData()} style={{ width: "100%", margin: "16px 0" }}>
      <Row gutter={32}>
        <Col span={20} style={{ textAlign: 'left' }}>
          {viewMode == 'readOnly' ?
            <p >{description}</p>
            :
            <Input.TextArea name='description' style={{ width: '50%' }} onChange={(e) => onInputChange(e)} defaultValue={description} />
          }



          {/* <p><b>Queue: </b> {currentTask.queue}</p>
          <p><b>Priority: </b>{currentTask.priority}</p> */}
        </Col>
        <Col span={4}>
          <p><b>Assigned to </b></p>
          <p> <Avatar src="https://joeschmoe.io/api/v1/random" />{asignee}</p>
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
                <Select.Option value="Sprint">Completed</Select.Option>
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
            <SaveButton display={showSaveButton} />
          </Form>
        </Col>


      </Row>
      <Row>
      </Row>

    </Card >
  )
}