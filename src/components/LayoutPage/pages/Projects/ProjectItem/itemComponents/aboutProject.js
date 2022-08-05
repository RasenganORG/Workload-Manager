import { Layout, Card } from "antd"
import { useSelector } from "react-redux"
export default function AboutProject() {

	
	const { currentProject } = useSelector(
		(state) => state.projects
	)

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
