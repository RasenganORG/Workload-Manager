import Board from 'react-trello'
import { Layout } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Tasks() {

	const data = {
		lanes: [
			{
				id: 'lane1',
				title: 'My tasks',
				label: 'task number here',
				cards: [
					{ id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' }

				]
			},
			{
				id: 'lane2',
				title: 'Pending tasks',
				label: 'task number here',
				cards: [
					{ id: 'Card3', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card4', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card5', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card6', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card7', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card8', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
				]
			},
			{
				id: 'lane3',
				title: 'In progress',
				label: 'task number here',
				cards: [
					{ id: 'Card9', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card10', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card11', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card12', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card13', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card14', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
				]
			},
			{
				id: 'lane4',
				title: 'Completed',
				label: 'task number here',
				cards: [
					{ id: 'Card15', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card16', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card17', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card18', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card19', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card20', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card21', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card22', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card23', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card24', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card25', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card26', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card27', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card28', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card29', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card30', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },


				]
			},
			{
				id: 'lane5',
				title: 'Backlog',
				label: 'task number here',
				cards: [
					{ id: 'Card31', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card32', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card33', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card34', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card35', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card36', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card37', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card38', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card39', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card40', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card41', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card42', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card43', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card44', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
					{ id: 'Card45', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' },
					{ id: 'Card46', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },


				]
			}
		]
	}
	const testCardCLick = (cardId) => {
		console.log(cardId + " was selected")
	}

	const navigate = useNavigate()
	// https://www.npmjs.com/package/react-trello kanban board documentation

	return (
		<Layout>
			<Board
				data={data}
				style={{ background: "transparent" }}
				draggable={true}
				onCardClick={() => navigate(`individual-task`)}
			/>
			<Outlet />
		</Layout>

	)
}