import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Card, Row, Col, Descriptions, Button, Select, Input, Tooltip, Comment } from 'antd';
import moment from 'moment';
import { EditOutlined, LeftCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

function LoggedTime() {
  const params = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const currentProject = useSelector(state => state.projects.currentProject.project)
  const loggedTime = useSelector(state => state.loggedTime.loggedTime)
  const allUsers = useSelector(state => state.users.userList)
  const { tasks } = useSelector(state => state.tasks)

  const [timeToBeLogged, setTimeToBeLogged] = useState([])
  useEffect(() => {
    if (params.taskId) {
      const task = tasks.find(task => task.id === params.taskId)
      setTitle(task.taskData.title)
    } else {
      setTitle(currentProject.title)
    }
    if (loggedTime) {
      const newArr = loggedTime.filter(entry => entry.task.loggedHours !== '')
      setTimeToBeLogged(newArr)
    }
  }, [window.location.href])


  const getTitle = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <>
            <h2 style={{ margin: 0 }}>{title}</h2>
          </>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>

          <Button onClick={() => navigate(-1)}><LeftCircleOutlined />Go back</Button>
        </div>
      </div>
    )
  }

  const generateTimeLogItem = (userId, duration, comment, date, index) => {
    let filteredUser = allUsers?.find(user => user.id === userId)

    return (
      <Card key={index}>
        <Row justify='space-between' >

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontWeight: 'bold' }}> {moment(date).format('DD MMMM, YYYY')}, logged by {filteredUser?.name}</h3>
            <p>Time logged: <b>{duration} hours</b> </p>
            <p>Comment: <b>{comment} </b> </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <EditOutlined style={{ cursor: 'pointer' }} />
          </div>
        </Row>
      </Card >
    )
  }

  return (
    <Card title={getTitle()} style={{ width: "100%", margin: "16px 0" }} >
      {timeToBeLogged?.length === 0 ? 'No time logged yet' : ''}
      {timeToBeLogged?.map((item, index) => generateTimeLogItem(item.userId, item.task.loggedHours, item.task.message, item.date, index))}
    </ Card >
  )
}
export default LoggedTime