import React from 'react'
import { Layout, Card } from "antd"
import { useSelector } from "react-redux"

export default function AboutProject() {
  const { project } = useSelector(state => state.projects.currentProject)

  return (
    <Layout>
      <Layout.Content style={{ margin: "16px 0" }}>
        <Card
          title="About"
        >
          <p>{project.description}</p>
        </Card>
      </Layout.Content>
    </Layout>
  )
}
