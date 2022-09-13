import { Layout, Card, Form, Input, Button, Select, Radio, DatePicker } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { CloseOutlined } from '@ant-design/icons';
import { addTask } from "../../../../../../../features/projects/projectsSlice"
import { getAllUsers } from "../../../../../../../features/users/userSlice"
import { addUTP } from "../../../../../../../features/users_tasks_projects/user_task_projectSlice"

export default function NewTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    asignee: '',
    dueDate: '',
    queue: '',
    priority: '',
    complexity: '',
    creationDate: new Date(),
    id: Date.now(),
    comments: [],
    timeTracker: {
      loggedWorload: [],
      plannedWorkingTime: {
        date: 'none',
        duration: ''
      }
    }
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { userList } = useSelector(state => state.users)
  const { project } = useSelector(state => state.projects.currentProject)
  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSelectChange = (value, inputName) => {
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: value
    }))
  }
  const onSubmit = () => {
    dispatch(addTask({ taskData: formData, projectId: params.projectId }))
    const user_task_project = {
      userId: formData.asignee,
      taskId: formData.id,
      projectId: params.projectId,
      taskCompleted: false,
      timeTracker: formData.timeTracker
    }
    dispatch(addUTP(user_task_project))
    navigate(-1)
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
  // can only assign the task to an user assigned to the project
  const assignedUsers = getAssignedUsers(userList)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card
          title={<div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Add task</p> <CloseOutlined onClick={() => navigate(-1)} /></div>}
          style={{ textAlign: 'left' }}>
          <Form
            layout="vertical"
            onFinish={() => {
              onSubmit()
            }}
          >
            <Form.Item
              label="Task title"
              name="taskTitle"
              rules={[
                {
                  required: true,
                  message: "Please add a task name!"
                }
              ]}
              data-cy="taskTitle"
            >
              <Input
                placeholder="Add the task title"
                name="title"
                onChange={(e) => onInputChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="taskDescription"
              rules={[
                {
                  required: true,
                  message: 'Please add a description for your task!',
                },
              ]}
              data-cy="taskDescription"
            >
              <TextArea
                rows={4}
                placeholder="Add a task description"
                name="description"
                onChange={(e) => onInputChange(e)}
              />
            </Form.Item>
            <Form.Item
              label="Asignee"
              data-cy="taskAsignee"
            >
              <Select
                data-cy="newTaskAsignee"
                placeholder="Assign an user to this tasks(leave blank for the task to remain unassigned)"
                name='asignee'
                onChange={(value) => {
                  onSelectChange(value, 'asignee')
                }}
              >

                {assignedUsers ? assignedUsers.map((user, index) => {
                  return <Select.Option key={index} value={user.id}>{user.name}</Select.Option>
                }) : ''}

              </Select>
            </Form.Item>
            <Form.Item
              label="Due date"
              name="dueDate"
              rules={[
                {
                  required: true,
                  message: 'Please add a due date for your project!'
                }
              ]}
              data-cy="dueDateSelector"
            >
              <DatePicker
                style={{ width: '100%' }}
                name='dueDate'
                onChange={(value) => {
                  onSelectChange(value.format('DD-MM-YYYY'), 'dueDate')
                }}
              />
            </Form.Item>
            <Form.Item
              label="Queue"
              name="queueSelector"
              rules={[
                {
                  required: true,
                  message: "Please select a queue"
                }
              ]}
            >
              <Select
                placeholder="Select a queue for the task"
                name='queue'
                onChange={(value) => {
                  onSelectChange(value, 'queue')
                }}
              >
                <Select.Option value="Sprint">Sprint</Select.Option>
                <Select.Option value="Backlog">Backlog</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Priority"
              name="taskPriority"
              rules={[
                {
                  required: true,
                  message: "Please select a priority for your task!"
                }
              ]}
              data-cy="taskPriority"
            >
              <Select
                placeholder="Select the task priority"
                name='priority'
                onChange={(value) => {
                  onSelectChange(value, 'priority')
                }}
              >
                <Select.Option value="Low priority">Low priority</Select.Option>
                <Select.Option value="Medium priority">Medium priority</Select.Option>
                <Select.Option value="High Priority">High Priority</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Complexity"
              name="taskComplexity"
              rules={[
                {
                  required: true,
                  message: "Please select a complexity for your task!"
                }
              ]}
              data-cy="taskPriority"
            >
              <Select
                placeholder="Select the task complexity"
                label=""
                name='priority'
                onChange={(value) => {
                  onSelectChange(value, 'complexity')
                }}
              >
                <Select.Option value="Low complexity">Low complexity</Select.Option>
                <Select.Option value="Medium complexity">Medium complexity</Select.Option>
                <Select.Option value="High complexity">High complexity</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item ></Form.Item>
            <Form.Item >
              <Button htmlType="submit" type="primary">Create task</Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout >
  )
}
