import { Row, Col, Form, Select, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';

export default function Content(props) {

  //we would be able to assign a task only to people that are assigned to this project 
  //the list of assigned users is obtained by filtering through the allUsers state using the id's of the
  //users that are assinged to the selected project
  const [usersAssigned, setUsersAssigned] = useState([])
  const { formData } = props.form
  // const { comments } = formData
  const { viewMode } = props.display
  const { onInputChange, onSelectChange } = props.eventHandlers
  const { description, creationDate } = formData.taskData
  const { userList } = useSelector(state => state.users)
  const { project } = useSelector(state => state.projects.currentProject)
  //we filter the users that are assign to the project and return an array with all the users assigned
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
    if (userList) {
      setUsersAssigned(getAssignedUsers(userList))
    }
  }, [formData])

  return (
    <>
      <Row gutter={32}>
        <Col span={24} style={{ textAlign: 'left' }}>
          {viewMode == 'readOnly' ?
            <>
              <p >{description}</p>
              <h5>Created on <i>{moment(creationDate).format("DD MMMM YYYY")}</i></h5>
            </>
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
              <Select onChange={(e) => { onSelectChange(e, 'queue') }} value={formData.taskData.queue}>
                <Select.Option value="Sprint">Sprint</Select.Option>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Blocked">Blocked</Select.Option>
                <Select.Option value="Backlog">Backlog</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Complexity:" >
              <Select onChange={(e) => { onSelectChange(e, 'complexity') }} value={formData.taskData.complexity}>
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
              <Select onChange={(e) => { onSelectChange(e, 'priority') }} value={formData.taskData.priority}>
                <Select.Option value="Low priority">Low priority</Select.Option>
                <Select.Option value="Medium priority">Medium priority</Select.Option>
                <Select.Option value="High Priority">High Priority</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Assigned:">
              <Select value={formData.asigneeId} onChange={(e) => { onSelectChange(e, 'asigneeId') }}>
                {usersAssigned ? usersAssigned.map((user, index) => {
                  return <Select.Option key={index} value={user.id}>{user.name}</Select.Option>
                }) : ''}
              </Select>
            </Form.Item>
          </Form>
        </Col>

      </Row>
    </>

  )
}
