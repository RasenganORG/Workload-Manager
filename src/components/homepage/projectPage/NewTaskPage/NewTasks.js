import { Layout, Card, Form, Input, Button, Select, Radio, DatePicker } from "antd"
import TextArea from "antd/lib/input/TextArea"


export default function NewTask() {
	return (
		<Layout>
			<Layout.Content style={{ margin: "16px 0" }}>
				<Card title="Add new task">
					<Form
						labelCol={{
							span: 1
						}}
						wrapperCol={{
							span: 21,
						}}
						layout="horizontal"

					>

						<Form.Item label="Task title">
							<Input />
						</Form.Item>
						<Form.Item label="Description">
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item 
							label="Asignee"
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								}
							]}
						>
							<Select data-cy="newTaskAsignee" value="user0">
								<Select.Option value="user0">John Doe 0</Select.Option>
								<Select.Option value="user1">John Doe 1</Select.Option>
								<Select.Option value="user2">John Doe 2</Select.Option>
								<Select.Option value="user3">John Doe 3</Select.Option>
								<Select.Option value="user4">John Doe 4</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label="Due date" data-cy="taskDueDate">
							<DatePicker />
						</Form.Item>
						<Form.Item label="Queue">
							<Select value="queue1">
								<Select.Option value="queue1">Pending</Select.Option>
								<Select.Option value="queue2">In progress</Select.Option>
								<Select.Option value="queue3">Backlog</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Priority">
							<Select value="prority0">
								<Select.Option value="priority0">Low priority</Select.Option>
								<Select.Option value="priority1">Medium priority</Select.Option>
								<Select.Option value="priority2">High Priority</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item >
							<Button type="primary"  onClick={() => alert("it's-a me, mario")}>Create task</Button>
						</Form.Item>
					</Form>


				</Card>
			</Layout.Content>
		</Layout>
	)
}