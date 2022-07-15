import { Breadcrumb, Layout, Card, Row } from 'antd';
import { Outlet, useLocation, Link, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts'

export default function Statistics() {
	const [currentPath, setCurrentPath] = useOutletContext();
	const path = useLocation().pathname;
	const highchartOptions = {
		title: {
			text: "Statistics"
		},
		series: [
			{
				name: "Total vacation days",
				data: [10, 5, 12, 3, 23, 20, 43, 76, 43, 32, 23, 45]
			},

		],
		yAxis: {

		},

		xAxis: {
			categories: ["January", "February", "March", "April", "May", "June", "July",
				"August", "September", "October", "November", "December"]
		}
	};

	useEffect(() => {
		setCurrentPath(path)
	})



	return (
		<Layout style={{ padding: '0 24px 24px', "min-height": "100%" }}>
			<Breadcrumb
				style={{
					margin: '16px 0',
				}}
			>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>Statistics</Breadcrumb.Item>
			</Breadcrumb>
			<Row>
				<Card title="Statistics" style={{ width: "100%" }} >
					<HighchartsReact
						highcharts={Highcharts}
						options={highchartOptions}
					/>
				</Card>
			</Row>
		</Layout>
	)
}
