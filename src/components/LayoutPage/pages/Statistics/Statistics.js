import React from 'react'
import { Layout, Card } from 'antd'
import HighchartsReact from "highcharts-react-official";
import Highcharts, { format } from 'highcharts'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../../../features/users/userSlice';
import { getAllUTPs } from '../../../../features/users_tasks_projects/user_task_projectSlice';

export default function Statistics() {
  const dispatch = useDispatch()
  const [selectedUsers, setSelectedUsers] = useState([])
  const { userList } = useSelector(state => state.users)
  const { users_tasks_projects } = useSelector(state => state.users_tasks_projects)

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllUTPs())

  }, [])
  useEffect(() => {
    if (userList) {
      if (selectedUsers.length === 0) {
        //if no users are selected, we show all users by default
        const allUsers = []
        userList?.forEach(user => allUsers.push(user))
        setSelectedUsers(allUsers)
      }
    }

  }, [userList])

  const getNextWeek = () => {
    //returns an array containing the next week in Date.UTC format, format that is used by Highcharts
    const date = new Date()
    const nextWeek = [];

    //we use Array 7 for the loop to iterate 7 tunes
    [...Array(7)].forEach((_, i) => {
      const utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate() + i);
      nextWeek.push(utcDate)
    });

    return nextWeek
  }
  const getTasksByUser = () => {
    const tasksByUser = []
    selectedUsers.forEach((user) => {
      // console.log(user.id)
      const userTasks = users_tasks_projects?.filter(utp => utp.userId === user.id)
      tasksByUser.push({ name: user.name, userId: user.id, tasks: userTasks })
    })
    return tasksByUser
  }
  const generateData = () => {
    const series = []
    const week = getNextWeek()
    const tasksByUser = getTasksByUser()

    tasksByUser.forEach((user, userIndex) => {
      const userStatistic = {
        name: user.name,
        data: []
      }

      week.forEach((day, dayIndex) => {
        const formattedDay = moment(day).format('DD-MM-YYYY') //format day for the week so that we can compare it against the days where user has plannedWorkload saved 
        const dailyTasks = user.tasks?.filter((task) => formattedDay === moment(task.timeTracker.plannedWorkingTime.date).format('DD-MM-YYYY'))

        if (dailyTasks) {
          //if user has tasks in a given day, we iterate over the tasks planned for that day and add all the planned hours
          const workinghours = dailyTasks.reduce((totalTime, currentTask) => {
            return totalTime + parseInt(currentTask.timeTracker.plannedWorkingTime.duration)
          }, 0)
          userStatistic.data.push([day, workinghours])
        }
      })
      series.push(userStatistic)
    })
    return series
  }
  const chartDefaultValue = {
    chart: {
      type: 'area'
    },
    title: {
      text: 'User availability'
    },
    subtitle: {
      text: 'visualise the user workload'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        year: '%b',
        day: ' %e %b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Assigned work (hours) '
      },
      min: 0
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} hours'
    },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 2.5
        }
      }
    },

    colors: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],

    // Define the data points. All series have a dummy year of 2010/71 in order
    // to be compared on the same x axis. Note that in JavaScript, months start
    // at 0 for January, 1 for February etc.
    series: generateData()

    //     name: "Teodor",
    //     data: 
    //     //  [
    //     //   [Date.UTC(2022, 9, 1), 2],
    //     //   [Date.UTC(2022, 9, 2), 8],
    //     //   [Date.UTC(2022, 9, 3), 7],
    //     //   [Date.UTC(2022, 9, 4), 3],
    //     //   [Date.UTC(2022, 9, 5), 2],
    //     //   [Date.UTC(2022, 9, 6), 3],
    //     //   [Date.UTC(2022, 9, 7), 4],
    //     // ]
    //   } 
  }


  return (
    <Layout
      style={{
        padding: '0 24px 24px',
      }}
    >
      <Card style={{ textAlign: 'left' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartDefaultValue}
        />

      </Card>
    </Layout >
  )
}
