import React from "react";
import { Layout, Card, Form, Input, Button, Select, DatePicker, Tag, Modal } from "antd"
import { CloseOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { addProject, getProjects } from "../../../../../features/projects/projectsSlice"
import { getAllUsers } from "../../../../../features/users/userSlice"
import { getBillingOptions } from "../../../../../features/billing/billingSlice"
import moment from "moment"
import { addUserProject } from "../../../../../features/userProject/userProjectSlice";
import { toast } from "react-toastify"

export default function NewProject() {
  const params = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creationDate: moment(),
    estimatedWorkingTime: [],
    colorLabel: 'none',
    billingOption: '',
    status: 'active',
  })
  const [assignedUsers, setAssignedUsers] = useState([])
  const [currentUserAdded, setCurrentUserAdded] = useState({
    userId: '',
    availability: '',
    projectId: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userList } = useSelector(state => state.users)
  const billing = useSelector(state => state.billing)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
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
  const onDateRangeChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      estimatedWorkingTime: {
        start: value[0],
        end: value[1]
      }
    }))
  }

  const onSubmit = () => {
    //even though the the assignedUsers belong to a separate backend entity, userProject,
    //we send through the addProject function, as at the submission time we don't have access 
    //to the project id yet, therefore we perform a batch update in backend where we add the project
    //annd using the returned projectId we send the assignedUsers to the appropiate entity
    dispatch(addProject({ projectData: formData, userData: assignedUsers }))
    dispatch(getProjects())
    navigate('/')
  }

  const userModal = {
    showModal: () => {
      setIsUserModalOpen(true);
    },
    handleOk: () => {
      if (currentUserAdded.userId && currentUserAdded.availability) {
        const newUserArr = assignedUsers;
        newUserArr.push(currentUserAdded)
        setAssignedUsers(newUserArr)
        userModal.resetCurrentUser()
        setIsUserModalOpen(false);

      } else {
        toast.error("Please complete all fields")
      }
    },
    handleCancel: () => {
      setIsUserModalOpen(false)
      userModal.resetCurrentUser()
    },
    onChange: (value, inputName) => {
      setCurrentUserAdded((prevState) => ({
        ...prevState,
        [inputName]: value
      }))
    },
    resetCurrentUser: () => {
      setCurrentUserAdded({ userId: '', availability: '' })
    },
    handleUserRemoval: (userId) => {
      const newArray = [...assignedUsers]
      const indexToRemove = newArray.findIndex(user => user.userId === userId)
      newArray.splice(indexToRemove, 1)
      setAssignedUsers(newArray)
    }
  }
  const generateUserSelect = () => {
    const wasUserSelected = (userId) => {
      const found = assignedUsers.find(user => user.userId === userId)
      return found
    }
    const generateSelect = (key, userId, userName) => {
      if (wasUserSelected(userId)) {
        return (
          <Select.Option disabled key={key} value={userId}>{userName}</Select.Option>
        )
      } else {
        return (
          <Select.Option key={key} value={userId}>{userName} </Select.Option>
        )
      }
    }
    return (
      <Select
        name="usersAssigned"
        placeholder="User"
        onChange={(value) => {
          userModal.onChange(value, 'userId')
        }}
        style={{ width: '100%' }}
        value={currentUserAdded.userId}
      >
        {userList ? userList.map((user, index) => {
          return generateSelect(index, user.id, user.name)
        }) : ''}
      </Select>
    )
  }
  const translatedUserIdToName = (userId) => {
    const user = userList.find(user => user.id === userId)
    return user.name
  }
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getBillingOptions())
  }, [])

  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card title="Create a new project">
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
                placeholder="Title"
                onChange={(onInputChange)}
              />
            </Form.Item>
            <Form.Item
              name="descriptionWrapper"
              label="Project description"
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
                placeholder="Description"
                onChange={onInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Add users"
              name="usersAssignedWrapper"

              data-cy="addUsers"
            >

              <div>
                {assignedUsers.map((user, index) => {
                  return <Tag
                    style={{ fontSize: "1.1em", padding: "0.25em" }}
                    key={index}
                    data-id={user.userId}
                    closable={false}
                  >
                    {translatedUserIdToName(user.userId)}
                    <CloseOutlined style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={(e) => userModal.handleUserRemoval(e.target.parentNode.parentNode.dataset.id)} />
                  </Tag>
                })}
                <Button type="primary" onClick={() => userModal.showModal()}>Add user</Button>

              </div>

              <Modal title="Add user" visible={isUserModalOpen} onOk={userModal.handleOk} onCancel={userModal.handleCancel}>
                <Form layout='vertical'>
                  <Form.Item label="User to be added">
                    {generateUserSelect()}
                  </Form.Item>
                  <Form.Item label="User availability for this project">
                    <Input
                      suffix='hours'
                      style={{
                        width: '100%',
                        appearance: 'textfield !important'
                      }}
                      placeholder="Number of hours"
                      type='number'
                      max={8}
                      min={1}
                      value={currentUserAdded.availability}
                      onChange={(e) => userModal.onChange(e.target.value, 'availability')}
                    />
                  </Form.Item>

                </Form>
              </Modal>



            </Form.Item>

            <Form.Item
              label="Estimated completation time"
              name="dueDateWrapper"
              rules={[
                {
                  required: true,
                  message: 'Please add a due date for your project!'
                }
              ]}
              data-cy="dueDateSelector"

            >
              <DatePicker.RangePicker
                allowClear={false}
                defaultValue={[moment(), '']}
                format={"DD/MM/YYYY"}
                onChange={(value) => { onDateRangeChange(value) }}
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
                defaultValue="none"
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
              name="billingSelectorWrapper"
              rules={[
                {
                  required: true,
                  message: 'Please select a billing option!',
                },
              ]}
              data-cy="billingSelector"
            >
              <Select
                placeholder="Select a billing option"
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
              <Button type="primary" htmlType="submit">Create project</Button>
            </Form.Item>
          </Form>
        </Card>
      </Layout.Content>
    </Layout >
  )
}
