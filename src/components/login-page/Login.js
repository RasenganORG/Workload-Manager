import "./Login.scss"
import "antd/dist/antd.css";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';




export default function Login(){

    return (
        <div className="LoginPage">
            <Form name="normal_login" className="login-form">
                <Form.Item>
                    <h2>Log in</h2>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large"/>

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
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" size="large"/>
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                    Log in
                    </Button>

                    <p>Or <a href="">register now!</a></p>
                </Form.Item>
            </Form>
        </div>
    )
}