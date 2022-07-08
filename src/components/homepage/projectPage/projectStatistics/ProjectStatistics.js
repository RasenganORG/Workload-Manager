import { Layout, Card, Badge, Calendar, PageHeader } from "antd"
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

export default function Projectstatistics() {
	//boilerplate code for example calendar start
	const getListData = (value) => {
		let listData;

		switch (value.date()) {
			case 8:
				listData = [
					{
						type: 'warning',
						content: 'This is warning event.',
					},
					{
						type: 'success',
						content: 'This is usual event.',
					},
				];
				break;

			case 10:
				listData = [
					{
						type: 'warning',
						content: 'This is warning event.',
					},
					{
						type: 'success',
						content: 'This is usual event.',
					},
					{
						type: 'error',
						content: 'This is error event.',
					},
				];
				break;

			case 15:
				listData = [
					{
						type: 'warning',
						content: 'This is warning event',
					},
					{
						type: 'success',
						content: 'This is very long usual event。。....',
					},
					{
						type: 'error',
						content: 'This is error event 1.',
					},
					{
						type: 'error',
						content: 'This is error event 2.',
					},
					{
						type: 'error',
						content: 'This is error event 3.',
					},
					{
						type: 'error',
						content: 'This is error event 4.',
					},
				];
				break;

			default:
		}

		return listData || [];
	};

	const getMonthData = (value) => {
		if (value.month() === 8) {
			return 1394;
		}
	};
	const monthCellRender = (value) => {
		const num = getMonthData(value);
		return num ? (
			<div className="notes-month">
				<section>{num}</section>
				<span>Backlog number</span>
			</div>
		) : null;
	};

	const dateCellRender = (value) => {
		const listData = getListData(value);
		return (
			<ul className="events">
				{listData.map((item) => (
					<li key={item.content}>
						<Badge status={item.type} text={item.content} />
					</li>
				))}
			</ul>
		);
	};
	//boilerplate code for example calendar end
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
