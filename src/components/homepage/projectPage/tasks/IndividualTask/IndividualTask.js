import { Avatar, Card, Row, Col, Form, Input, Select } from 'antd';


export default function IndividualTask() {

	return (
		<Card title="Individual task #232" style={{ width: "100%", margin:"16px 0" }}>
			<Row gutter={32}>
				<Col span={20}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed elementum tempus egestas sed sed risus pretium. Sed turpis tincidunt id aliquet risus feugiat in. Praesent elementum facilisis leo vel. Elit ullamcorper dignissim cras tincidunt. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo.
					</p>
				</Col>
				<Col span={4}>
					<p><b>Assigned to </b></p>
					<p> <Avatar src="https://joeschmoe.io/api/v1/random" />  John Doe</p>
				</Col>
			</Row>

			<Row justify='space-between'>
				<Col span={6}>
					<Form
						labelCol={{
							span: 6
						}}
						wrapperCol={{
							span: 12,
						}}
						layout="horizontal"
					>
						<Form.Item label="Move task to:">
							<Select>
								<Select.Option value="option1">Completed</Select.Option>
								<Select.Option value="option2">Blocked</Select.Option>
								<Select.Option value="option3">Unassigned</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</Col>

				<Col span={6}>
					<Form
						labelCol={{
							span: 12
						}}
						wrapperCol={{
							span: 12,
						}}
						layout="horizontal"
					>
						<Form.Item label="Reassign task to:">
							<Select>
								<Select.Option value="user0">John Doe 0</Select.Option>
								<Select.Option value="user1">John Doe 1</Select.Option>
								<Select.Option value="user2">John Doe 2</Select.Option>
								<Select.Option value="user3">John Doe 3</Select.Option>
								<Select.Option value="user4">John Doe 4</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</Col>



			</Row>

			<Row>

			</Row>

		</Card>
	)
}