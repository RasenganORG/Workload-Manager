import "./Homepage.scss"
import { SearchOutlined} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Input, Col, Row, Card, Progress, Avatar, List} from 'antd';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Homepage(){ 
    const [sidebarColumns, setSiderbarColumns ] = useState(4) //4 cols out of 24
    const [contentColumns, setContentColumns ] = useState(20) //20 cols out of 20
    const [currentPath, setCurrentPath] = useState("/")


    //when the router path is modified we remove/add the siderbar, depending on the path
    //each direct child of homepage(active-projects, completed-projects and user-list) has 
    //a function that updates the path using router context
    
    useEffect( () => {
        if(currentPath === "/active-projects" || currentPath === "/completed-projects") {
            setSiderbarColumns(4);
            setContentColumns(20)
        } else {
            setSiderbarColumns(0);
            setContentColumns(24)
        }
    }, [currentPath])
     
     
  
    return (
        <div className="Homepage">
            <Layout>
                <Layout.Header className="Layout.Header">
                    <Row>
                        <Col span={3}>
                            <Input.Search
                                placeholder="Search project"
                                allowClear
                                enterButton={<SearchOutlined />}
                                size="large"
                                onSearch={console.log("searching...")}
                                style={{"padding": "1em 0" , width:"100%"}}
                             />
                        </Col>  
                        <Col span={1}>
                            <div className="logo">logo</div>
                        </Col>
                        <Col span={20}> 
                            <Menu defaultSelectedKeys={["activeProjects"]}theme="dark" mode="horizontal">
                                 
                                <Menu.Item key="activeProjects">
                                    <Link to="active-projects">
                                        Active projects
                                    </Link>    
                                </Menu.Item>
                                <Menu.Item key="completedProjects">
                                    <Link to="completed-projects">
                                        Completed projects
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="userList">
                                    <Link to="user-list">
                                        User List
                                    </Link>    
                                </Menu.Item>
                            </Menu>
                        </Col>
                        
                        </Row>
                </Layout.Header>
                <Layout>
                    <Row>

                        
                        <Col span={sidebarColumns}>
                            <Layout.Sider width={"100%"} className="site-layout-background">
                                <Menu mode="inline"style={{height: '100%', borderRight: 0}}>
                                    <Menu.SubMenu title="Most Recent Projects">
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                    </Menu.SubMenu>

                                    <Menu.SubMenu title="All projects">
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                        <Menu.Item>Project 1</Menu.Item>
                                    </Menu.SubMenu>
                                </Menu>
                            </Layout.Sider>
                        </Col>
                        <Col span={contentColumns}>
                            <Outlet context={[currentPath, setCurrentPath] }/> 
                            {/* reference for outlet > https://www.youtube.com/watch?v=PWi9V9d_Jsc */}
                        </Col>
                    </Row>
                </Layout>
            </Layout>        
        </div>
    )
}