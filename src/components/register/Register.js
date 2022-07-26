import "./Register.scss"
import "antd/dist/antd.css";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";



export default function Register() {
 
	return (
		<div className="registrationPage">
			<Form name="normal_register" className="register-form">
				<Form.Item>
					<h2>Register </h2>
				</Form.Item>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Please select an Username!',
						},
					]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large" />

				</Form.Item>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}
				>
					<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" size="large" />
				</Form.Item>
				<Form.Item
					name="passwordConfirmation"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}
				>
					<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm password" size="large" />
				</Form.Item>


				<Form.Item>
					<Button type="primary" htmlType="submit" className="register-form-button" size="large" style={{ width: "100%" }}>
						Create account
					</Button>

					<p>Already have an account? <Link to="../login"> <a href="">Log in</a> </Link></p>

				</Form.Item>
			</Form>
		</div>
	)
}