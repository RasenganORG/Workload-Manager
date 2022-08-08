import "antd/dist/antd.css";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../Spinner";



export default function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })


  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  let location = useLocation()

  let from = location.state?.from?.pathname || '/';


  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate(from, { replace: true });
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="registrationPage">
      <Form name="normal_register" className="register-form" onFinish={onSubmit}>
        <Form.Item>
          <h2>Log in </h2>
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
            name="email"
            id="email"
            defaultValue={email}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-mail"
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

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button" size="large" style={{ width: "100%" }}>
            Log in
          </Button>

          <p>Don't have an account? <Link to="../register"> <a href="">Register</a> </Link></p>

        </Form.Item>
      </Form>
    </div>
  )
}
