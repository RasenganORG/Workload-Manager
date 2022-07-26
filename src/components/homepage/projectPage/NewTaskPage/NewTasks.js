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

						<Form.Item
							label="Task title"
							name="taskTitle"
							rules={[
								{
									required: true,
									message: "Please add a task name!"
								}
							]}
							data-cy="taskTitle"
						>
							<Input placeholder="Add the task title" />
						</Form.Item>
						<Form.Item 
							label="Description"
 							name="taskDescription"
							rules={[
								{
									required: true,
									message: 'Please add a description for your task!',
								},
							]}
							data-cy="taskDescription"
						>
							<TextArea rows={4} placeholder="Add a task description"/>
						</Form.Item>
						<Form.Item
							label="Asignee"
							data-cy="taskAsignee"
						>
							<Select data-cy="newTaskAsignee" placeholder="Assign an user to this tasks(leave blank for the task to remain unassigned)">
								<Select.Option value="user0">John Doe 0</Select.Option>
								<Select.Option value="user1">John Doe 1</Select.Option>
								<Select.Option value="user2">John Doe 2</Select.Option>
								<Select.Option value="user3">John Doe 3</Select.Option>
								<Select.Option value="user4">John Doe 4</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item 
							label="Due date" 
							name="dueDate"
							rules={[
								{
									required: true,
									message: 'Please add a due date for your project!'
								}
							]}
							data-cy="dueDateSelector"
						>
							<DatePicker />
						</Form.Item>
						<Form.Item 
							label="Queue"
							name="queueSelector"
						>
							<Select   placeholder="Select a queue for the task">
								<Select.Option value="queue1">Pending</Select.Option>
								<Select.Option value="queue2">In progress</Select.Option>
								<Select.Option value="queue3">Backlog</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item 
							label="Priority"
							name="taskPriority"
							rules={[
								{
									required: true,
									message: "Please select a priority for your task!"}
							]}
							data-cy="taskPriority"
						>
							<Select placeholder="Select the task priority">
								<Select.Option value="priority0">Low priority</Select.Option>
								<Select.Option value="priority1">Medium priority</Select.Option>
								<Select.Option value="priority2">High Priority</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item >
							<Button htmlType="submit" type="primary" onClick={() => console.log("it's-a me, mario")}>Create task</Button>
						</Form.Item>
					</Form>


				</Card>
			</Layout.Content>
		</Layout>
	)
}