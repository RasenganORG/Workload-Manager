import { PageHeader, Layout, Menu, Input, Radio, Space} from 'antd';
import { useState } from 'react';

export default function Siderbar() {
	const [value, setValue] = useState(1);

 

	const ProjectsSiderbar = () => {
		const onChange = (e) => {
			console.log('radio checked', e.target.value);
			setValue(e.target.value);
		};
		return (
			<Layout.Sider width={"100%"} className="site-layout-background"theme='light'>
				<PageHeader
				className="site-page-header"
				title="Filters"
				/>
		
				<Radio.Group onChange={onChange} value={value} style={{margin: "0 16px"}}>
						<Space direction="vertical">
							<Radio value={1}>Active projects</Radio>
							<Radio value={2}>Completed Projects</Radio>
							<Radio value={3}>All projects</Radio>
						</Space>
			</Radio.Group>
		</Layout.Sider>
		)	
	}

	
	return (
		<ProjectsSiderbar />
	)
}