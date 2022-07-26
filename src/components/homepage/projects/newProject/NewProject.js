import { Layout, Card, Form, Input, Button, Select, Tag, DatePicker } from "antd"
import TextArea from "antd/lib/input/TextArea"


export default function NewProject() {
	return (
		<Layout>
			<Layout.Content style={{ margin: "16px 0" }}>
				<Card title="Create a new project">
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
							label="Project title"
							name="projectTitle"
							rules={[
								{
									required: true,
									message: 'Please input the title of your project!',
								},
							]}
							data-cy="projectTitle"
						>
							<Input />
						</Form.Item>
						<Form.Item 
							label="Description"
							name="description"
							rules={[
								{
									required:true,
									message: 'Please add a project description!'
								}
							]}
							data-cy="projectDescription"
						>
							<TextArea rows={4} />
						</Form.Item>
						<Form.Item 
							label="Add users"
							name="billingSelector"
							rules={[
								{
									required: true,
									message: 'Please add at lease one user to your project!',
								},
							]}
							data-cy="addUsers"
						>
							<Select 
								mode="multiple"
							>
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
							label="Color label"
							placeholder="Select a color"
							data-cy="colorSelector"
						>
							<Select placeholder="Select a color label option">
								<Select.Option value="none">None</Select.Option>
								<Select.Option value="red">Red</Select.Option>
								<Select.Option value="purple">Purple</Select.Option>
								<Select.Option value="green">Green</Select.Option>
								<Select.Option value="blue">Blue</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Billing" 
							name="billingSelector"
							rules={[
								{
									required: true,
									message: 'Please select a billing option!',
								},
							]}
							data-cy="billingSelector"
						>
							<Select placeholder="Select a billing option">
								<Select.Option value="1">Billing 1</Select.Option>
								<Select.Option value="2">Billing 2</Select.Option>
								<Select.Option value="3">Billing 3</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item data-cy="newProjectSubmitButton" >
							<Button type="primary" htmlType="submit" onClick={() => console.log("submit")}>Create project</Button>
						</Form.Item>
					</Form>


				</Card>
			</Layout.Content>
		</Layout>
	)
}