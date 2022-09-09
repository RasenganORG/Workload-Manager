import React from 'react'
import { Layout, Card } from 'antd'
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import moment from 'moment';

export default function Statistics() {

  const getNextWeek = () => {
    const date = new Date()
    const nextWeek = [];

    [...Array(7)].forEach((_, i) => {
      const utcDate = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate() + i);
      nextWeek.push(utcDate)
    });
    return nextWeek


  }
  const test = () => {
    const dates = getNextWeek().map((DayUTC) => {
      //get a random hour between 0 and 8
      const randomWholeNumber = Math.floor(Math.random() * 9);
      const date = [DayUTC, randomWholeNumber]
      return [...date]
    })
    return dates
  }

  test()
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
    series: [
      {
        name: "Ana",
        data: test()
      }, {
        name: "Teodor",
        data: test()
        //  [
        //   [Date.UTC(2022, 9, 1), 2],
        //   [Date.UTC(2022, 9, 2), 8],
        //   [Date.UTC(2022, 9, 3), 7],
        //   [Date.UTC(2022, 9, 4), 3],
        //   [Date.UTC(2022, 9, 5), 2],
        //   [Date.UTC(2022, 9, 6), 3],
        //   [Date.UTC(2022, 9, 7), 4],
        // ]
      }, {
        name: "Gabriel ",
        data: test()
      }
    ]
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
