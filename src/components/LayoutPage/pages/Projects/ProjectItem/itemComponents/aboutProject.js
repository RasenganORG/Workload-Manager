import { Layout, Card } from "antd"
import { useOutletContext } from "react-router"

export default function AboutProject() {
	
	const {currentProject} = useOutletContext() 
	return (
		<Layout>
			<Layout.Content style={{ margin: "16px 0" }}>
				<Card
					title="About"
					bordered={false}
				>
					<p>{currentProject.description}</p>
				</Card>
			</Layout.Content>
		</Layout>
	)
}
