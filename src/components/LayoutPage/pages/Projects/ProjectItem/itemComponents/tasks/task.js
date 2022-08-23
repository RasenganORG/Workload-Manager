import { Card, Row, Col, Form, Button, Select, Input, Tooltip, Comment, Avatar, Popconfirm, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { EditOutlined, LeftCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateTask, deleteTask } from '../../../../../../../features/projects/projectsSlice';
import { reset } from '../../../../../../../features/users/userSlice';
import { getAllUsers } from '../../../../../../../features/users/userSlice';
import moment from 'moment';
import { time } from 'highcharts';
export default function Task() {
  const [currentTask, setCurrentTask] = useState('')
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [viewMode, setViewMode] = useState('readOnly')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('')
  //we would be able to assign a task only to people that are assigned to this project 
  //the list of assigned users is obtained by filtering through the allUsers state using the id's of the
  //users that are assinged to the selected project
  const [usersAssigned, setUsersAssigned] = useState([])
  const { title, description, asignee, queue, priority, complexity, creationDate, dueDate, id, comments } = currentTask

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
    id: id,
    comments: comments
  })

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
        id: id,
        comments: comments
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


  //add comment modal & modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setViewMode('edit')
    setShowSaveButton(true)
    const comment = {
      user: user.name,
      comment: newComment,
      timestamp: moment().format('YYYY-MM-DD HH:mm')
    }

    setFormData((prevState) => ({
      ...prevState,
      comments: [
        ...prevState.comments,
        comment
      ]
    }))
    setNewComment('')
    console.log(formData.comments)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setNewComment('')
    setIsModalVisible(false);
  };

  const generateComment = (user, comment, timestamp) => {
    return (
      <Col span={12} style={{ textAlign: 'left' }}>
        <Card>
          <Comment
            author={user}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={comment}
            datetime={
              <Tooltip title={timestamp}>
                <span>{moment(timestamp).fromNow()}</span>
              </Tooltip>
            }
          />
        </Card>
      </Col>)
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
          </Form>
        </Col>

      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'left' }}>
          {formData.comments ? <p>Comments</p> : ''}
        </Col>
        {formData.comments ? formData.comments.map((comment) => {
          return generateComment(comment.user, comment.comment, comment.timestamp)
        })
          : ''}

        <Col span={12} className="test" style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button type="primary" size="small" onClick={showModal}>Add comment</Button>

          <Modal title="Comment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input.TextArea allowClear name='newComment' autoSize={true} onChange={(e) => setNewComment(e.target.value)} value={newComment} />

          </Modal>
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ textAlign: "left" }}>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            {showSaveButton ? <Button type='danger' >Delete task</Button> : ''}
          </Popconfirm>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          {showSaveButton ? <Button type='primary' onClick={(e) => { handleSave(e) }}>Save changes</Button> : ''}
        </Col>
      </Row>

    </Card >
  )
}