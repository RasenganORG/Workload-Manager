import "./Project.scss"
import {Layout, Menu, Row, PageHeader, Col, Button, Breadcrumb} from 'antd';
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import {PlusCircleOutlined } from '@ant-design/icons';
export default function Project() {
 
    return (
        <div className="ProjectWrapper">
             <Layout
                style={{
                padding: '0 24px 24px',
                }}
            >
                <Breadcrumb
                style={{
                    margin: '16px 0 0',
                }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Active Projects</Breadcrumb.Item>
                    <Breadcrumb.Item>Project 1</Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                    
                    <Layout.Content>
                        <Row justify="space-between">
                                <PageHeader className="site-page-header" title={"Project 1 "} subTitle={"Last updated: " + "2 hours ago"} />
                               
                                <Button type="primary" size="large" style={{margin: "16px", display: "flex"}}>
                                    <Link to="newtask">
                                        Add new task
                                    </Link>
                                </Button>
                         </Row>
                        
                        <Row>
                        <Menu mode="horizontal" style={{flex: "auto"}} defaultSelectedKeys="tasks">
                            <Menu.Item key="tasks"><Link to="tasks">Tasks</Link></Menu.Item>
                            <Menu.Item key="about"><Link to="about">About</Link></Menu.Item>
                            <Menu.Item key="statistics"><Link to="statistics">Project statistics</Link></Menu.Item>
                        </Menu>
                        </Row>
                        <Row className="projectContent">
                            <Outlet />
                        </Row>
                    </Layout.Content>
                </Layout>
            </Layout>

        </div>
    )
}