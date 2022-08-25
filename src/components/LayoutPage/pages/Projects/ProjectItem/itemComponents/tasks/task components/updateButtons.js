import { Row, Col, Button, Popconfirm } from 'antd';


export default function UpdateButtons(props) {
  const { showSaveButton } = props.saveButton
  const { handleSave, handleDelete } = props.eventHandlers

  return (
    <Row>
      <Col span={12} style={{ textAlign: "left" }}>
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          {showSaveButton ? <Button type='danger' >Delete task</Button> : ''}
        </Popconfirm>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        {showSaveButton ? <Button type='primary' onClick={(e) => { handleSave(e) }}>Save changes</Button> : ''}
      </Col>
    </Row>
  )
}
