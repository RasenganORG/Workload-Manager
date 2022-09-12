import React from 'react'
import { Layout, Card } from 'antd'
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../../../features/users/userSlice';


export default function Statistics() {
  const dispatch = useDispatch()
  const [selectedUsers, setSelectedUsers] = useState([])
  const { userList } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllUsers())
    if (selectedUsers.length === 0) {
      //if no users are selected, we show all users by default
      const allUsers = []
      userList.forEach(user => allUsers.push(user))
      setSelectedUsers(allUsers)
    }
  }, [])
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
  const generateData = (usersArray) => {
    const series = []
    const week = getNextWeek()

    usersArray?.forEach((user, index) => {
      const userSeries = {
        name: user.name,
        data: []
      }

      week.forEach((day, dayIndex) => {
        const formattedDay = moment(day).format('DD-MM-YYYY') //format day for the week so that we can compare it against the days where user has plannedWorkload saved 
        const task = user.plannedWorkload.find(workloadObj => {
          return moment(workloadObj.date).format('DD-MM-YYYY') === formattedDay
        }) //find if we user planned to work tasks during that day 

        if (task) {
          const numberOFHoursPlanned = task.plannedWork.reduce((totalTime, currentTask) => {
            return totalTime + parseInt(currentTask.workDuration)
          }, 0)
          userSeries.data.push([day, numberOFHoursPlanned])
        } else {
          userSeries.data.push([day, 0])
        }

      })
      series.push(userSeries)
    })
    return series
    // {
    //   name: "Teodor",
    //   data: test()
    //   //  [
    //   //   [Date.UTC(2022, 9, 1), 2],
    //   //   [Date.UTC(2022, 9, 2), 8],
    //   //   [Date.UTC(2022, 9, 3), 7],
    //   //   [Date.UTC(2022, 9, 4), 3],
    //   //   [Date.UTC(2022, 9, 5), 2],
    //   //   [Date.UTC(2022, 9, 6), 3],
    //   //   [Date.UTC(2022, 9, 7), 4],
    //   // ]
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
    series: generateData(selectedUsers)

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
      <button onClick={generateData}>Test</button>
      <Card style={{ textAlign: 'left' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartDefaultValue}
        />

      </Card>
    </Layout >
  )
}
