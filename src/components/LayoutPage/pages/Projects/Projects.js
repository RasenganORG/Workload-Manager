import { Breadcrumb, Layout, Col, Row, Card, Progress, Button, Avatar, Tooltip, Badge } from 'antd';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../../Spinner';
import { getProjects, reset } from '../../../../features/projects/projectsSlice';
import { getAllUsers } from '../../../../features/users/userSlice';
import { getAllTasks } from '../../../../features/tasks/tasksSlice';
import { getAllProjectUserEntries } from '../../../../features/userProject/userProjectSlice';
import { useState } from 'react';
import { getBacklogItems } from '../../../../features/backlog/backlogSlice';

import moment from 'moment';

export default function Projects() {
  const { projectList, isLoading } = useSelector(state => state.projects)
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.tasks)
  const { userProjectEntries } = useSelector(state => state.userProjectEntries)
  const [assignedUsers, setAssignedUsers] = useState([])
  const { userList } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getProjects())
    dispatch(getAllUsers())
    dispatch(getAllTasks())
    dispatch(getAllProjectUserEntries())
    dispatch(getBacklogItems())
  }, [dispatch])


  const generateProjectCard = (project, iterationId) => {
    const { id, title, description, status, estimatedWorkingTime } = project
    const userProjectEntriesAssigned = userProjectEntries?.filter(userProjectEntry => userProjectEntry.projectId === id)

    const getAssignedUsers = () => {
      const users = [];
      userProjectEntriesAssigned?.forEach((userProject) => {
        const fullUser = userList?.find(user => user.id === userProject.userId)
        if (fullUser) {
          users.push(fullUser)
        }
      })
      return users
    }
    const getUserInitials = (userName) => {
      const matches = userName.match(/\b(\w)/g);
      return matches.join('')
    }

    const assignedUsers = getAssignedUsers()
    const getProjectCompletationPercent = () => {
      const { start, end } = estimatedWorkingTime
      const estimatedProjectDuration = moment(end).diff(moment(start), 'days')
      const daysSinceProjectStarted = moment().diff(moment(start), 'days')

      if (moment(start) > moment()) {
        return 0
      }

      return Math.round(parseInt(daysSinceProjectStarted) / parseInt(estimatedProjectDuration) * 100)
    }
    const generateUserAvatars = (user) => {

      return (
        <Tooltip title={user.name} placement="top">
          <Avatar src={user.avatar}>{getUserInitials(user.name)}</Avatar>
        </Tooltip>
      )
    }

    return (
      <Col key={id} span={8}>
        <Badge.Ribbon text={status} color="green">
          <Card title={<Link to={id}>{title}</Link>} bordered={false}>
            <p>{description}</p>
            <Row gutter={4}>
              <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} >
                <Avatar.Group  >
                  {assignedUsers ? assignedUsers.map(user => {
                    return generateUserAvatars(user)
                  }) : ''}

                </Avatar.Group>
              </Col>
              <Col span={12} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Progress type="circle" percent={getProjectCompletationPercent(tasks)} />
              </Col>
            </Row>
          </Card>
        </Badge.Ribbon>
      </Col>
    )
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Layout
      style={{
        padding: '0 24px 24px',
      }}
    >
      <Row justify='space-between' align='middle'>
        <Breadcrumb
          style={{
            margin: '16px 0 ',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Projects</Breadcrumb.Item>
        </Breadcrumb>

        <Button type="primary">
          <Link to="add-project">
            Add new project
          </Link>
        </Button>
      </Row>
      <Row gutter={[16, 16]} >
        {projectList ? projectList.map((project, iterationId) => {
          { return generateProjectCard(project, iterationId) }
        }) : 'No projects added yet'}
      </Row>
      <Outlet />
    </Layout>
  )
}
