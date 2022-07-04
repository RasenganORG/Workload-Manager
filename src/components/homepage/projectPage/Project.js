import "./Project.scss"
import { Breadcrumb, Layout, Menu, Input, Col, Row, Card, Progress, Avatar, PageHeader} from 'antd';
import React from 'react'
import Tasks from "./tasks/tasks";
import { Outlet, Link } from "react-router-dom";

export default function Project() {
 
    return (
        <div className="ProjectWrapper">
            <Layout>
                <Layout.Header>
                    <Breadcrumb style={{margin: '16px 0', color: "white"}} className="projectBreadcrumbs">
                        <Breadcrumb.Item><Link to="../active-projects" style={{color: "white"}}>Active Projects</Link></Breadcrumb.Item>
                        <Breadcrumb.Item >Project 1 </Breadcrumb.Item>
                    </Breadcrumb>
                </Layout.Header>
                <Layout.Content>
                    <Row>
                        <PageHeader className="site-page-header" title={"Project 1 "} subTitle={"Last updated: " + "2 hours ago"} />
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

        </div>
    )
}