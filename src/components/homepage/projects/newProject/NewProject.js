import { Layout, Card, Form, Input, Button, Select, Tag, DatePicker } from "antd"
import TextArea from "antd/lib/input/TextArea"


export default function NewProject() {
  return (
    <Layout>
      <Layout.Content style={{margin: "16px 0"}}>
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
       
          <Form.Item label="Project title">
            <Input />
          </Form.Item>
          <Form.Item label="Description">
             <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Add users">
            <Select>
              <Select.Option value="user0">John Doe 0</Select.Option>
              <Select.Option value="user1">John Doe 1</Select.Option>
              <Select.Option value="user2">John Doe 2</Select.Option>
              <Select.Option value="user3">John Doe 3</Select.Option>
              <Select.Option value="user4">John Doe 4</Select.Option>
            </Select>
						<div style={{margin: "8px"}}>
							<Tag closable>John Doe 5</Tag>
							<Tag closable>John Doe 6</Tag>
							<Tag closable>John Doe 7</Tag>
							<Tag closable>John Doe 8</Tag>
							<Tag closable>John Doe 9</Tag>
							<Tag closable>John Doe 10</Tag>
						</div>
          </Form.Item>
           
          <Form.Item label="Due date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Color label">
            <Select >
              <Select.Option>Default</Select.Option>
              <Select.Option>Red</Select.Option>
              <Select.Option>Purple</Select.Option>
              <Select.Option>Green</Select.Option>
              <Select.Option>Blue</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Billing">
            <Select>
              <Select.Option>Billing 1</Select.Option>
              <Select.Option>Billing 2</Select.Option>
              <Select.Option>Billing 3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item >
            <Button type="primary" onClick={() => alert("it's-a me, mario")}>Create project</Button>
          </Form.Item>
        </Form>


      </Card>
      </Layout.Content>
    </Layout>
  )
}