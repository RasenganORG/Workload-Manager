import { Layout, Card, Form, Input, Button, Select, Radio, DatePicker } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { CloseOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import { addProjectTasks, updateProject } from "../../../../../../features/projects/projectsSlice"
import { projectsActions } from "../../../../../../features/projects/projectsSlice"

export default function NewTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    asignee: '',
    dueDate: '',
    queue: '',
    priority: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams()
  const { currentProject } = useSelector(
    (state) => state.projects
  )
  console.log(currentProject.tasks)
  const onInputChange = (e) => {
    console.log(formData)
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
    dispatch(addProjectTasks(formData))
    dispatch(updateProject({ projectData: currentProject, projectId: params.projectId }))
    navigate(-1)
  }
  console.log(projectsActions)
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
                <Select.Option value="user0">John Doe 0</Select.Option>
                <Select.Option value="user1">John Doe 1</Select.Option>
                <Select.Option value="user2">John Doe 2</Select.Option>
                <Select.Option value="user3">John Doe 3</Select.Option>
                <Select.Option value="user4">John Doe 4</Select.Option>
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
            >
              <Select
                placeholder="Select a queue for the task"
                name='queue'
                onChange={(value) => {
                  onSelectChange(value, 'queue')
                }}
              >
                <Select.Option value="queue1">Pending</Select.Option>
                <Select.Option value="queue2">In progress</Select.Option>
                <Select.Option value="queue3">Backlog</Select.Option>
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
                <Select.Option value="lowPriority">Low priority</Select.Option>
                <Select.Option value="mediumPriority">Medium priority</Select.Option>
                <Select.Option value="highPriority">High Priority</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit" type="primary" onClick={() => console.log("it's-a me, mario")}>Create task</Button>
            </Form.Item>
          </Form>


        </Card>
      </Layout.Content>
    </Layout>
  )
}
