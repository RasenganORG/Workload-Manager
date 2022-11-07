import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getProjectItem } from '../../../../../features/projects/projectsSlice';
import Spinner from '../../../../Spinner';
import { Layout, Menu, Row, PageHeader, Button, Breadcrumb, Select, Col, Modal, Form, DatePicker, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { getAllUsers } from '../../../../../features/users/userSlice';
import { getAllTasks } from '../../../../../features/tasks/tasksSlice';
import { getLoggedTimeByProject } from '../../../../../features/loggedTime/LoggedTimeSlice';
import { getProjectUsers } from '../../../../../features/userProject/userProjectSlice';
import { addSprint, getSprintsByProject, updateCurrentSprintId } from '../../../../../features/sprint/sprintSlice';
import { getBacklogItems } from '../../../../../features/backlog/backlogSlice';
import moment from 'moment';

export default function ProjectItem() {
  const pathParams = useParams()
  const dispatch = useDispatch()
  const [projectTasks, setProjectTasks] = useState('')
  const projectTasksData = { projectTasks, setProjectTasks }
  const [projectSprints, setProjectSprints] = useState([])
  const { currentProject, isLoading } = useSelector(state => state.projects)
  const { sprints, currentSprintId } = useSelector(state => state.sprint)
  const { project } = currentProject
  const [newSprint, setNewSprint] = useState({
    projectId: pathParams.projectId,
    name: '',
    startDate: moment(),
    endDate: null,
    started: false
  })
  const onInputChange = (value) => {
    setNewSprint((prevState) => ({
      ...prevState,
      name: value
    }))
  }
  const onDateRangeChange = (value) => {
    setNewSprint((prevState) => ({
      ...prevState,
      startDate: value[0],
      endDate: value[1]
    }))
  }
  const handleSprintChange = (e) => {
    dispatch(updateCurrentSprintId(e))
  }

  useEffect(() => {
    dispatch(getSprintsByProject(pathParams.projectId))

  }, [])
  useEffect(() => {
    dispatch(getLoggedTimeByProject(pathParams.projectId))
    dispatch(getProjectItem(pathParams.projectId))
    dispatch(getProjectUsers(pathParams.projectId))
    dispatch(getSprintsByProject(pathParams.projectId))
    dispatch(getAllUsers())
    dispatch(getAllTasks())
    dispatch(getBacklogItems())
    if (sprints?.length > 0) {
      setProjectSprints(sprints)
    }
  }, [currentProject.isSuccess])
  useEffect(() => {
    if (sprints?.length > 0) {
      setProjectSprints(sprints)
    }
  }, [sprints])

  // useEffect(() => {
  //   console.log("Sprint was changed")
  // }, [projectSprints])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateLocalSprints = (addedSprint) => {
    const newSprints = [...projectSprints]
    newSprints.push(addedSprint)
    setProjectSprints(newSprints)
  }
  const generateSprintSelect = () => (
    <Select
      style={{
        width: '100%',
        textAlign: 'left'
      }}
      onChange={handleSprintChange}
    >
      {projectSprints ? projectSprints.map((sprint, index) => {
        return <Select.Option key={index} value={sprint.sprintId}>{sprint.name}</Select.Option>

      }) : 'No sprints added'}

    </Select>
  )

  const sprintModal = {
    showModal: () => {
      setIsModalOpen(true);
    },
    handleOk: () => {
      dispatch(addSprint(newSprint))
      updateLocalSprints(newSprint)
      sprintModal.resetNewSprintForm()
      setIsModalOpen(false);
    },
    handleCancel: () => {
      sprintModal.resetNewSprintForm();
      setIsModalOpen(false);
    },
    resetNewSprintForm: () => {
      setNewSprint({
        projectId: pathParams.projectId,
        name: '',
        startDate: moment(),
        endDate: null,
        started: false
      })
    }
  }

  const menuItems = [
    {
      label: <Link to="tasks">Tasks</Link>,
      key: 'tasks'
    },
    {
      label: <Link to="about">About</Link>,
      key: 'about'
    },
    {
      label: <Link to="statistics">Project statistics</Link>,
      key: 'statistics'
    },
    {
      label: <Link to="time-log">Project time log</Link>,
      key: 'time-log'
    }
  ]

  let href = window.location.href.split('/')
  href = href[5]

  if (isLoading) {
    return <Spinner />
  }
  if (project == null) {
    return <>Error loading project</>
  }
  return (
    <div className="ProjectWrapper">
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
          <Breadcrumb.Item>{project ? project.title : ''}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>

          <Layout.Content>
            <Row justify="space-between" align="middle">
              <PageHeader
                className="site-page-header"
                title={project ? project?.title : ''}
              />

              <Button type="primary" style={{ margin: "16px", display: "flex" }}>
                <Link to="add-task">
                  Add task
                </Link>
              </Button>
            </Row>

            <Row>
              <Menu defaultSelectedKeys={href} style={{ flex: 'auto' }} mode='horizontal' items={menuItems} />
              <Menu mode='horizontal' selectable={false} items={
                [{
                  key: "ye",
                  label: <Link to="edit-project">Edit project <EditOutlined /></Link>,
                }]
              } />

            </Row>
            <Row>
              <Col
                span={2}
                style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px' }}
              >
                <b> Select Sprint</b>
              </Col>
              <Col span={16}   >
                {generateSprintSelect()}
              </Col>

              <Col
                span={6}
                style={{
                  background: 'white', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'
                }}
              >
                <Button onClick={sprintModal.showModal}> Add a Sprint </Button>
              </Col>

              <Modal destroyOnClose={true} title="Create Sprint" open={isModalOpen} onOk={sprintModal.handleOk} onCancel={sprintModal.handleCancel}>
                <Form layout='vertical'>
                  <Form.Item label="Sprint name">
                    <Input
                      placeholder="Sprint name"
                      value={newSprint.name}
                      onChange={(e) => onInputChange(e.target.value)}
                    />
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
                </Form>
              </Modal>

            </Row>
            <Row className="projectContent">
              <button onClick={() => console.log(projectTasks)}>console.log da context</button>

              <Outlet context={{ projectTasksData }} />
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>

    </div >

  )
}
