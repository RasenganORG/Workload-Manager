import React, { useEffect, useState } from 'react'
import { useParams, useOutletContext } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { getProjectItem } from '../../../../../features/projects/projectsSlice';
import Spinner from '../../../../Spinner';
import { Layout, Menu, Row, PageHeader, Button, Breadcrumb } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Outlet, Link } from "react-router-dom";
import { getAllUsers } from '../../../../../features/users/userSlice';
import { getAllTasks } from '../../../../../features/tasks/tasksSlice';
import { getLoggedTimeByProject } from '../../../../../features/loggedTime/LoggedTimeSlice';

export default function ProjectItem() {
  const pathParams = useParams()
  const dispatch = useDispatch()
  const [projectTasks, setProjectTasks] = useState('')
  const projectTasksData = { projectTasks, setProjectTasks }
  const { currentProject, isLoading } = useSelector(
    (state) => state.projects
  )
  const { project } = currentProject

  useEffect(() => {
    dispatch(getLoggedTimeByProject(pathParams.projectId))
    dispatch(getProjectItem(pathParams.projectId))
    dispatch(getAllUsers())
    dispatch(getAllTasks())

  }, [currentProject.isSuccess])
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
              // subTitle={"Last updated: " + "2 hours ago"}
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

            <Row className="projectContent">
              <Outlet context={projectTasksData} />
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>

    </div>

  )
}
