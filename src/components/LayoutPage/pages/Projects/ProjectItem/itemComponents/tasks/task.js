import { Avatar, Card, Row, Col, Form, Button, Select } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { LeftOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
export default function Task() {
  const [currentTask, setCurrentTask] = useState('')

  //we would be able to assign a task only to people that are assigned to this project, we would 
  //get the list of assigned users by filtering through the allUsers state using the id's of the
  //users that are assinged to the selected project
  const [usersAssigned, setUsersAssigned] = useState([])




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

  const getAssignedUsers = (users) => {
    let usersArr = []
    users.forEach(user => {
      const isUserAssignedToProject = currentProject.usersAssigned.find(id => id)
      console.log(isUserAssignedToProject)
      // if (isUserAssignedToProject) {
      //   console.log(user.name, ' is assigned to project')
      // }
    })
  }

  useEffect(() => {
    setCurrentTask(getTask(currentProject.tasks))
    dispatch(getAllUsers())
    if (userList) {
      getAssignedUsers(userList)
    }

  }, [])

  const titleData = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>{currentTask.title}</p>
        <div onClick={() => navigate(-1)}>
          <Button><LeftCircleOutlined />Go back</Button>
        </div>
      </div>
    )
  }

  return (
    <Card title={titleData()} style={{ width: "100%", margin: "16px 0" }}>
      <Row gutter={32}>
        <Col span={20} style={{ textAlign: 'left' }}>
          <p >{currentTask.description}</p>

          <p><b>Queue: </b> {currentTask.queue}</p>
          <p><b>Priority: </b>{currentTask.priority}</p>
        </Col>
        <Col span={4}>
          <p><b>Assigned to </b></p>
          <p> <Avatar src="https://joeschmoe.io/api/v1/random" />{currentTask.asignee}</p>
        </Col>
      </Row>

      <Row justify='space-between'>
        <Col span={6}>
          <Form
            layout="vertical"
          >
            <Form.Item label="Status:">
              <Select>
                <Select.Option value="option1">Completed</Select.Option>
                <Select.Option value="option2">Blocked</Select.Option>
                <Select.Option value="option3">Unassigned</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>

        <Col span={6}>
          <Form
            layout="vertical"
          >
            <Form.Item label="Assigned:">
              <Select>
                {currentProject.assignedUsers ? currentProject.assignedUsers.map((user, index) => {
                  return <Select.Option key={index} value={user.name}>{user.name}</Select.Option>
                }) : ''}
              </Select>
            </Form.Item>
          </Form>
        </Col>


      </Row>
      <Row>
      </Row>

    </Card >
  )
}