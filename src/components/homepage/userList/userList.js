import { Breadcrumb, Layout, Collapse, Avatar, Row, Button, List, Divider} from 'antd';
import { Outlet, useLocation, Link, useOutletContext} from 'react-router-dom';
import { useEffect } from 'react';
export default function UserList() {
    const [currentPath, setCurrentPath] = useOutletContext();

    const GetPath = () => useLocation().pathname
    useEffect( () => {
        setCurrentPath(GetPath)
    })

    const collapsePanelPlaceholder = <div style={{display: "flex", alignItems: "center"}}> <Avatar src="https://joeschmoe.io/api/v1/random" />  <p>John Doe</p></div>
    const userInfo = () => {
        return (
            <div>
                <Row >
                    John Doe is assigned to : 
                    <Button type="primary" size="small" style={{margin:"0 5px"}}>
                        Project 1
                    </Button>
                    <Button type="primary" size="small" style={{margin:"0 5px"}}>
                        Project 2
                    </Button>
                    <Button type="primary" size="small" style={{margin:"0 5px"}}>
                        Project 3
                    </Button>
                </Row>
                <Divider/>
                <h3><b>Task status</b> </h3>
                <p>Tasks assigned: 2</p>
                <p>Tasks completed: 53</p>
                <Divider/>
                <h3><b>Contact info</b> </h3>
                <p>Phone number: +0123456789</p>
                <p>email: email@example.com</p>
                
            </div>
        )
    }
    
     return (
        <div>
             <Layout style={{ padding: '0 24px 24px'}}>
            <Breadcrumb
            style={{
                margin: '16px 0',
            }}
            >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>User list</Breadcrumb.Item>
            </Breadcrumb>

            {/* main content start */}
            <Layout className="site-layout-background">
                <Collapse  >
                    <Collapse.Panel header={collapsePanelPlaceholder} >  {/* todo assign a key here */}
                       { userInfo()}
                    </Collapse.Panel>
                    <Collapse.Panel header={collapsePanelPlaceholder} >  
                       { userInfo()}
                    </Collapse.Panel>
                    <Collapse.Panel header={collapsePanelPlaceholder} >  
                       { userInfo()}
                    </Collapse.Panel>
                    <Collapse.Panel header={collapsePanelPlaceholder} >  
                       { userInfo()}
                    </Collapse.Panel>
                </Collapse>
           
            </Layout>
        </Layout>
        </div>
    )
}