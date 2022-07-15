import { Breadcrumb, Layout, Calendar, Badge, Row, Menu } from 'antd';
import { Outlet, useLocation, Link, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

export default function Concedii() {
	const [currentPath, setCurrentPath] = useOutletContext();
	const path = useLocation().pathname;



	useEffect(() => {
		setCurrentPath(path)
	})



	return (
		<Layout style={{ padding: '0 24px 24px', minHeight: "100%" }}>
			<Breadcrumb
				style={{
					margin: '16px 0',
				}}
			>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>Vacation tracker</Breadcrumb.Item>
			</Breadcrumb>
			<Row>
				<Menu mode="horizontal" style={{ flex: "auto" }} defaultSelectedKeys="calendar">
					<Menu.Item key="calendar"><Link to="calendar">Calendar</Link></Menu.Item>
					<Menu.Item key="wiki"><Link to="wiki">Wiki</Link></Menu.Item>
				</Menu>
			</Row>
			<Outlet />
		</Layout>
	)
}
