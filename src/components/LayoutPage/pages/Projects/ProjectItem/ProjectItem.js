import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { getProjectItem } from '../../../../../features/projects/projectsSlice';
import Spinner from '../../../../Spinner';
import { Layout, Menu, Row, PageHeader, Button, Breadcrumb } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { getAllUsers } from '../../../../../features/users/userSlice';

export default function ProjectItem() {
  const pathParams = useParams()
  const dispatch = useDispatch()

  const { currentProject, isLoading } = useSelector(
    (state) => state.projects
  )
  const { project } = currentProject

  useEffect(() => {
    dispatch(getProjectItem(pathParams.projectId))
    dispatch(getAllUsers())


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
    }
  ]



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
              <Menu defaultSelectedKeys={'tasks'} style={{ flex: 'auto' }} mode='horizontal' items={menuItems} />
            </Row>

            <Row className="projectContent">
              <Outlet />
            </Row>
          </Layout.Content>
        </Layout>
      </Layout>

    </div>

  )
}
