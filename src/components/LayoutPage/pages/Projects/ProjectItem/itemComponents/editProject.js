import { Layout, Card, Form, Input, Button, Select, DatePicker, Popconfirm } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { updateProject, deleteProject } from "../../../../../../features/projects/projectsSlice"
import { getBillingOptions } from "../../../../../../features/billing/billingSlice"
import { deleteProjectUTP } from "../../../../../../features/users_tasks_projects/user_task_projectSlice"
import moment from "moment"

export default function EditProject() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const currentProject = useSelector(
    (state) => state.projects.currentProject.project
  )
  const { title, description, dueDate, usersAssigned, status, colorLabel, billingOption } = currentProject
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    usersAssigned: usersAssigned,
    dueDate: dueDate,
    colorLabel: colorLabel,
    billingOption: billingOption,
    status: status,
  })
  const { userList } = useSelector(state => state.users)
  const billing = useSelector(state => state.billing)

  useEffect(() => {
    dispatch(getBillingOptions())
  }, [])

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
    dispatch(updateProject({ projectData: formData, projectId: params.projectId }))
    navigate('/')
  }

  const handleDelete = () => {
    dispatch(deleteProject(params.projectId))
    dispatch(deleteProjectUTP(params.projectId))
    navigate('/')
  }

  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card title={'Update project'}>
          <Form
            layout="vertical"
            onFinish={() => onSubmit()}
            style={{ textAlign: 'left' }}
          >

            <Form.Item
              name="titleWrapper"
              label="Project title"
              rules={[
                {
                  required: true,
                  message: 'Please input the title of your project!',
                },
              ]}
              data-cy="projectTitle"
            >
              <Input
                name='title'
                onChange={(onInputChange)}
                defaultValue={formData.title}
              />
            </Form.Item>
            <Form.Item
              label="Project description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please add a project description!'
                }
              ]}
              data-cy="projectDescription"
            >
              <TextArea
                name='description'
                rows={4}
                defaultValue={formData.description}
                onChange={onInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Add users"
              name="usersAssignedWrapper"
              data-cy="addUsers"
            >
              <Select
                mode="multiple"
                name="usersAssigned"
                defaultValue={formData.usersAssigned}
                onChange={(value) => {
                  onSelectChange(value, 'usersAssigned')
                }}
              >
                {userList ? userList.map((user, index) => {
                  return <Select.Option key={index} value={user.id}>{user.name}</Select.Option>
                }) : ''}
              </Select>

            </Form.Item>

            <Form.Item
              label="Due date"
              data-cy="dueDateSelector"
            >
              <DatePicker
                value={moment(formData.dueDate)}
                name='dueDate'
                style={{ width: '100%' }}
                onChange={(value) => {
                  onSelectChange(value.toDate(), 'dueDate')
                }}
              />
            </Form.Item>
            <Form.Item
              label="Color label"
              placeholder="Select a color"
              data-cy="colorSelector"
            >
              <Select
                placeholder="Select a color label option"
                name="colorLabel"
                value={formData.colorLabel}
                onChange={(value) => {
                  onSelectChange(value, 'colorLabel')
                }}
              >
                <Select.Option value="none">None</Select.Option>
                <Select.Option value="red">Red</Select.Option>
                <Select.Option value="purple">Purple</Select.Option>
                <Select.Option value="green">Green</Select.Option>
                <Select.Option value="blue">Blue</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Billing"
              data-cy="billingSelector"
            >
              <Select
                value={formData.billingOption}
                name='billingOption'
                onChange={(value) => {
                  onSelectChange(value, 'billingOption')
                }}
              >
                {billing.billingOptions ? billing.billingOptions.map((billingOption, index) => {
                  return <Select.Option key={index} value={billingOption.billing}>{billingOption.billing}</Select.Option>
                }) : ''}
              </Select>
            </Form.Item>
            <Form.Item data-cy="newProjectSubmitButton" >
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button type="primary" htmlType="submit">Edit project</Button>
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" >Delete project</Button>
                </Popconfirm>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout>
  )
}
