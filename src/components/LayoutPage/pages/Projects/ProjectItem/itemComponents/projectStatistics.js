import { Layout, Card, Badge, Calendar, PageHeader } from "antd"
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProjectItem } from "../../../../../../features/projects/projectsSlice";
import { resetCurrentProjectSuccess } from "../../../../../../features/projects/projectsSlice";
import moment from "moment";
export default function ProjectStatistics() {

  const params = useParams()
  const dispatch = useDispatch()

  const { project, isSuccess } = useSelector(
    (state) => state.projects.currentProject
  )

  useEffect(() => {
    if (isSuccess) {
      dispatch(getProjectItem(params.projectId))
      dispatch(resetCurrentProjectSuccess())
    }
  }, [])

  //https://stackoverflow.com/questions/72393755/calendar-ant-design-how-to-show-events-with-variable-datesco
  const formattedTasks = project.tasks.map(task => {
    return {
      id: task.id,
      content: task.title,
      date: moment(task.creationDate).format("DD/MM/YYYY")
    }
  })

  const dateCellRender = (value) => {
    const stringValue = value.format("DD/MM/yyyy");
    const listData = formattedTasks.filter(task => task.date === stringValue)

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

  const monthCellRender = (value) => [
    console.log(value)
  ]

  const highchartOptions = {
    title: {
      text: "Project statistics"
    },
    series: [
      {
        name: "Total tasks",
        data: [23, 43, 60, 95, 150, 160, 200]
      },
      {
        name: "Total worked tasks",
        data: [20, 38, 54, 65, 100, 145, 190]
      }
    ],
    yAxis: {

    },

    xAxis: {
      categories: ["January", "February", "March", "April", "May", "June", "July"]
    }
  };
  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card title="Statistics">
          <div>
            <PageHeader
              className="site-page-header"
              title="Project Calendar"
            />
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
          </div>
          <div>
            <PageHeader
              className="site-page-header"
              title="Project chart"
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={highchartOptions}
            />

          </div>
        </Card>
      </Layout.Content>
    </Layout>
  )
}
