import { Layout, Card } from "antd"
import "./About.scss"


export default function AboutProject() {
	return (
		<Layout>
			<Layout.Content style={{ margin: "16px 0" }}>
				<Card
					title="About project"
					bordered={false}

				>

					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Urna neque viverra justo nec ultrices dui sapien. Congue quisque egestas diam in arcu cursus euismod. Ut venenatis tellus in metus.  </p>
					<p>Felis donec et odio pellentesque. Id interdum velit laoreet id donec ultrices. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. In massa tempor nec feugiat nisl. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Amet mauris commodo quis imperdiet massa tincidunt. Eu lobortis elementum nibh tellus molestie nunc. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Posuere lorem ipsum dolor sit amet. Aliquam sem et tortor consequat id.</p>
				</Card>
			</Layout.Content>
		</Layout>
	)
}
