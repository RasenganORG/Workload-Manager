import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { reset, getProject } from '../../../../../features/projects/projectsSlice';
import Spinner from '../../../../Spinner';
import { Layout, Menu, Row, PageHeader, Col, Button, Breadcrumb } from 'antd';
import { Outlet, Link } from "react-router-dom";

export default function ProjectItem() {
  const pathParams = useParams()
  const dispatch = useDispatch()

  //this state is set to TRUE when a new task is added to trigger the 
  //getProject dispatch from useEffect and reload the project with the new task
  //added 
  const [wasTaskAdded, setWasTaskAdded] = useState(false)

  const { currentProject, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.projects
  )
  useEffect(() => {
    dispatch(getProject(pathParams.projectId))
    setWasTaskAdded(false)
  }, [wasTaskAdded])

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
    }
  ]



  if (isLoading) {
    return <Spinner />
  }
  if (currentProject == null) {
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
          <Breadcrumb.Item>Active Projects</Breadcrumb.Item>
          <Breadcrumb.Item>{currentProject.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout>

          <Layout.Content>
            <Row justify="space-between" align="middle">
              <PageHeader
                className="site-page-header"
                title={currentProject.title}
              // subTitle={"Last updated: " + "2 hours ago"}
              />

              <Button type="primary" style={{ margin: "16px", display: "flex" }}>
                <Link to="add-task">
                  Add task
                </Link>
              </Button>
            </Row>

            <Row>
              <Menu defaultSelectedKeys={'tasks'} style={{ flex: 'auto' }} mode='horizontal' items={menuItems} />
            </Row>

            <Row className="projectContent">
              <Outlet context={{ wasTaskAdded, setWasTaskAdded }} />
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>

    </div>

  )
}
