import { Layout, Card, Badge, Calendar, PageHeader, Col, Avatar, Row, Button, Divider } from "antd"
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProjectItem } from "../../../../../../features/projects/projectsSlice";
import { resetCurrentProjectSuccess, resetProjectsLoading } from "../../../../../../features/projects/projectsSlice";
import moment from "moment";

export default function ProjectStatistics() {
  const [filteredUsers, setFilteredUsers] = useState([])
  const params = useParams()
  const dispatch = useDispatch()
  const { project, isSuccess } = useSelector(state => state.projects.currentProject)
  const { userProjectEntries } = useSelector(state => state.userProjectEntries)
  const { tasks } = useSelector(state => state.tasks)
  const userList = useSelector(state => state.users.userList)
  const [highchartValues, setHighchartValues] = useState({})
  //https://stackoverflow.com/questions/72393755/calendar-ant-design-how-to-show-events-with-variable-datesco
  const formattedTasks = tasks ? tasks.map(task => {
    return {
      id: task.id,
      content: task.taskData.title,
      date: moment(task.taskData.creationDate).format("DD/MM/YYYY")
    }
  }) : []
  const getFilteredUsers = () => {
    let newArray = []
    userProjectEntries?.forEach(userProject => {
      const userFound = userList.find(userListItem => userListItem.id === userProject.userId)
      newArray.push(userFound)
    })

    return newArray
  }
  const getTasksByUser = (userId) => {
    const userTasks = {
      completedTasks: [],
      pendingTasks: []
    }

    tasks?.forEach((task) => {
      if (task.asigneeId === userId) {
        if (task.taskData.isTaskCompleted === true) {
          userTasks.completedTasks.push(task)
        } else {
          userTasks.pendingTasks.push(task)
        }
      }
    })
    return userTasks
  }
  const generateHighchartsValues = () => {
    const totalTasks = [];
    const completedTasks = [];
    const pendingTasks = []
    const users = getFilteredUsers()

    if (users.every(user => user !== undefined)) {
      users.forEach(user => {
        const userTasks = getTasksByUser(user.id);
        const projectTasks = { completedTasks: [], pendingTasks: [] }

        userTasks.pendingTasks.forEach(task => {
          if (task.projectId === params.projectId) {
            projectTasks.pendingTasks.push(task)
          }
        })
        userTasks.completedTasks.forEach(task => {
          if (task.projectId === params.projectId) {
            projectTasks.completedTasks.push(task)
          }
        })
        pendingTasks.push(projectTasks.pendingTasks.length)
        completedTasks.push(projectTasks.completedTasks.length)
        totalTasks.push((projectTasks.pendingTasks.length + projectTasks.completedTasks.length))
      })
      setHighchartValues({
        chart: {
          type: 'column'
        },
        title: {
          text: 'Assigned tasks per users'
        },
        series: [
          // {
          //   name: "Total tasks",
          //   data: totalTasks
          // },
          // {
          //   name: "Completed tasks",
          //   data: completedTasks
          // }
          // , 
          {
            name: "Assigned pending tasks",
            data: pendingTasks
          }
        ],
        xAxis: {
          categories: users.map(user => user.name)
        }
      })
    }
  }
  const dateCellRender = (value) => {
    const stringValue = value.format("DD/MM/yyyy");
    console.log(formattedTasks)
    const listData = formattedTasks.filter(task => task.date === stringValue)
    console.log(listData)
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={"success"} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const userGenerator = (name, phoneNumber, email, id, index) => {
    const userTasks = getTasksByUser(id)

    return (
      <Card key={index} style={{ textAlign: 'left' }} >
        <Row >
          <Col span={4}>
            <p> <Avatar src="https://joeschmoe.io/api/v1/random" /> {name}</p >
          </Col>
          <Col span={20}>
            <div style={{ gap: "1rem" }}>
              <p>Tasks completed: {userTasks.completedTasks.length}</p>
              <p>Tasks pending: {userTasks.pendingTasks.length}</p>
            </div>
          </Col>
        </Row>
      </Card >
    )
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProjectItem(params.projectId))
      dispatch(resetCurrentProjectSuccess())
    }
    dispatch(resetProjectsLoading())
    generateHighchartsValues()
  }, [])

  useEffect(() => {
    if (project.usersAssigned && userList) {
      setFilteredUsers(getFilteredUsers)
    }
  }, [])

  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card title="Statistics">
          <div>
            <PageHeader
              className="project-calendar-header"
              title="Project Calendar"
            />
            <Calendar dateCellRender={dateCellRender} />
          </div>
          <div>
            <PageHeader
              className="project-chart-header"
              title="Project chart"
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={highchartValues}
            />
          </div>
          {/* <div>
            <PageHeader
              className="user-statistics-header"
              title="User statistics"
            />

            {/* <UserStatistics />  to create a components*/}

        </Card>
      </Layout.Content>
    </Layout>
  )
}
