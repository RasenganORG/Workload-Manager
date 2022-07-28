import "./Register.scss"
import "antd/dist/antd.css";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../Spinner";

export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		password2: ""
	})

	const { username, email, password, password2 } = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		if (isSuccess || user) {
			navigate('/')
		}

		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
		console.log(formData)
	}

	const onSubmit = () => {
		if (password !== password2) {
			toast.error("Passwords do not match")
		} else {
			const userData = {
				username,
				email,
				password
			}
			dispatch(register(userData))
		}

	}
	if (isLoading) {
		return <Spinner />;

	}
	return (
		<div className="registrationPage">

			<Form name="normal_register" className="register-form" onFinish={onSubmit}>
				<Form.Item>
					<h2>Register </h2>
				</Form.Item>
				<Form.Item
					name="usernameItem"
					rules={[
						{
							required: true,
							message: 'Please select an Username!',
						},
					]}
				>
					<Input
						name="username"
						id="username"
						defaultValue={username}
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
						onChange={onChange}
					/>
				</Form.Item>

				<Form.Item
					name="emailItem"
					rules={[
						{
							required: true,
							message: 'Please input your email!',
						},
					]}
				>
					<Input
						name="email"
						id="email"
						defaultValue={email}
						prefix={<MailOutlined className="site-form-item-icon" />}
						type="email"
						placeholder="E-mail address"
						onChange={onChange}
					/>
				</Form.Item>

				<Form.Item
					name="passwordItem"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						}
					]}
				>
					<Input
						name="password"
						id="password"
						defaultValue={password}
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						onChange={onChange}

					/>
				</Form.Item>
				<Form.Item
					name="password2Item"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						}
					]}
				>
					<Input
						name="password2"
						id="password2"
						defaultValue={password2}
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Confirm password"
						onChange={onChange}
					/>
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