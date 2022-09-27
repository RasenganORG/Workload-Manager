import React from 'react'
import { Layout, Row, Col, Card, Select, Modal, Button, DatePicker } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import HighchartsReact from "highcharts-react-official";
import Highcharts, { format } from 'highcharts'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../../../../features/users/userSlice';
import { getAllTasks } from '../../../../features/tasks/tasksSlice';

export default function Statistics() {
  const dispatch = useDispatch()
  const [customChartPeriod, setCustomChartPeriod] = useState({
    startDate: moment(),
    endDate: moment()
  })
  const [timePeriodType, setTimePeriodType] = useState('predefinedTime')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [displayedTimePeriod, setDisplayedTimePeriod] = useState('currentWeek')
  const { userList } = useSelector(state => state.users)
  const { tasks } = useSelector(state => state.tasks)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllTasks())
  }, [])

  useEffect(() => {
    if (userList) {
      if (selectedUsers.length === 0) {
        //if no users are selected, we show all users by default
        const defaultSelectedUsers = []
        userList.slice(0, 3)?.forEach(user => defaultSelectedUsers.push(user.id))
        setSelectedUsers(defaultSelectedUsers)
      }
    }
  }, [userList])

  const chartTimePeriodModal = {
    showModal: () => {
      setIsModalOpen(true);
    },
    handleOk: () => {
      setIsModalOpen(false);
    },
    handleCancel: () => {
      setIsModalOpen(false);
    },
    onDateRangeChange: (value) => {
      console.log(value)
    }
  }

  const getTimePeriod = () => {
    //returns an array containing the time period in Date.UTC format, format that is used by Highcharts
    const timePeriod = [];

    if (timePeriodType === 'predefinedTime') {
      const currentDate = new Date()

      let selectedTimePeriod = {
        days: 7,
        displayFutureDates: true,
      };

      switch (displayedTimePeriod) {
        case 'currentWeek':
          selectedTimePeriod = {
            days: 7,
            displayFutureDates: true
          };
          break;

        case 'currentMonth':
          selectedTimePeriod = {
            days: 30,
            displayFutureDates: true
          };
          break;
        case 'pastWeek':
          selectedTimePeriod = {
            days: 7,
            displayFutureDates: false
          };
          break;
        case 'pastMonth':
          selectedTimePeriod = {
            days: 30,
            displayFutureDates: false
          };
          break;

      }
      //we use an array contructor to iterara a number of $days times and generate the requested date
      [...Array(selectedTimePeriod.days)].forEach((_, i) => {
        const day = selectedTimePeriod.displayFutureDates ? currentDate.getUTCDate() + i : currentDate.getUTCDate() - i;

        const utcDate = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(),
          day);
        timePeriod.push(utcDate)
      });

    } else {
      const { startDate, endDate } = customChartPeriod;
      const rangeDaysDuration = moment(endDate).diff(moment(startDate), 'days');

      [...Array(rangeDaysDuration + 1)].forEach((_, index) => {
        const day = moment(new Date(moment(startDate)).getUTCDate() + index)
        const utcDate = Date.UTC(new Date(moment(startDate)).getUTCFullYear(), new Date(moment(startDate)).getUTCMonth(), day);
        timePeriod.push(utcDate)
      })
    }

    return timePeriod
  }
  const getTasksByUser = () => {
    const tasksByUser = []
    const users = userList?.filter(user => selectedUsers.includes(user.id))
    users?.forEach((user) => {
      const userTasks = tasks?.filter(task => task.asigneeId === user.id)
      tasksByUser.push({ name: user.name, userId: user.id, tasks: userTasks })
    })

    return tasksByUser
  }
  const generateData = () => {

    const series = []
    const timePeriod = getTimePeriod()
    const tasksByUser = getTasksByUser()

    tasksByUser.forEach((user, userIndex) => {
      const userStatistic = {
        name: user.name,
        data: []
      }

      timePeriod.forEach((day, dayIndex) => {
        const formattedDay = moment(day).format('DD-MM-YYYY') //format day for the week so that we can compare it against the days where user has plannedWorkload saved 
        const dailyTasks = user.tasks?.filter((task) => formattedDay === moment(task.timeTracker.plannedWorkingTime.date).format('DD-MM-YYYY'))
        const isFutureDate = moment().subtract(1, 'days').isBefore(day) //we check if the iterated date is before the currentDate or not

        //if user has tasks in a given day, we iterate over the tasks planned for that day and add all the planned hours
        const workinghours = dailyTasks?.reduce((totalTime, currentTask) => {
          return totalTime + parseInt(currentTask.timeTracker.plannedWorkingTime.duration)
        }, 0)
        userStatistic.data.push([day, workinghours])


      })
      series.push(userStatistic)
    })
    console.log(series)
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
  const handleUserSelection = (value) => {
    setSelectedUsers(value);
  };
  const handlePeriodChange = (value) => {
    if (timePeriodType === 'predefinedTime') {
      setDisplayedTimePeriod(value)
    } else {

    }

  };

  const onTimePeriodChange = (e) => {
    setTimePeriodType(e)
  }
  const onCustomRangeChange = (value) => {
    setCustomChartPeriod({
      startDate: value[0],
      endDate: value[1]
    })
  }
  const getTimeRangeToDisplay = () => {
    const startDate = moment(customChartPeriod.startDate).format('DD/MM/YYYY')
    const endDate = moment(customChartPeriod.endDate).format('DD/MM/YYYY')
    return `${startDate} to ${endDate}`
    // return (
    //   <p>: from {startDate} to {endDate}</p>
    // )
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
        <Row style={{ fontWeight: 'bold' }} align="bottom">
          <Col span={18}>
            <p>Users to display</p>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              value={selectedUsers}
              onChange={handleUserSelection}
            >
              {userList?.map((user, index) => {
                return <Select.Option key={index} value={user.id}>{user.name}</Select.Option>
              })}
            </Select>
          </Col>
          <Col span={6}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Time period:</p>
              <Select defaultValue="predefinedTime" style={{ width: '50%' }} onChange={onTimePeriodChange}>
                <Select.Option value="predefinedTime">Predefined time</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
            </div>
            {timePeriodType === 'predefinedTime' ?
              <Select defaultValue="currentWeek" style={{ width: '100%' }} onChange={handlePeriodChange}>
                <Select.Option value="currentWeek">Current Week</Select.Option>
                <Select.Option value="currentMonth">Current Month</Select.Option>
                <Select.Option value="pastWeek" >Past week</Select.Option>
                <Select.Option value="pastMonth">Past Month</Select.Option>
                {/* <Select.Option value="custom">Custom time</Select.Option> */}
              </Select>
              :
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                allowClear={false}
                defaultValue={[moment(), '']}
                format={"DD/MM/YYYY"}
                onChange={(value) => { onCustomRangeChange(value) }}
              />
            }


          </Col>
        </Row>
        <Modal title="Select custom period" visible={isModalOpen} onOk={chartTimePeriodModal.handleOk} onCancel={chartTimePeriodModal.handleCancel}>
          < DatePicker.RangePicker
            style={{ width: '100%' }}
            allowClear={false}
            defaultValue={[moment(), '']}
            format={"DD/MM/YYYY"}
            onChange={(value) => { chartTimePeriodModal.onDateRangeChange(value) }}
          />
        </Modal>
      </Card>
    </Layout >
  )
}
