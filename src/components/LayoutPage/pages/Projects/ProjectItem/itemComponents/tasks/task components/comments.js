import { Row, Col, Button, Input, Tooltip, Comment, Avatar, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


import moment from 'moment';
export default function Comments(props) {
  const { formData, setFormData } = props.form
  const { showSaveButton, setShowSaveButton } = props.saveButton
  const { viewMode, setViewMode } = props.display
  const { isModalVisible, setIsModalVisible } = props.modalStatus
  const { newComment, setNewComment } = props.commentState
  const { user } = useSelector(
    (state) => state.auth
  )

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setViewMode('edit')
    setShowSaveButton(true)
    const comment = {
      id: Date.now(),
      user: user.name,
      comment: newComment,
      timestamp: moment().format('YYYY-MM-DD HH:mm')
    }

    setFormData((prevState) => ({
      ...prevState,
      comments: [
        ...prevState.comments,
        comment
      ]
    }))
    setNewComment('')
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setNewComment('')
    setIsModalVisible(false);
  };

  const deleteComment = (commentId) => {
    setShowSaveButton(true)

    //find the comment that we want to deleted using the comment id
    const indexToBeDeleted = formData.comments.findIndex(comment => {
      return commentId === comment.id
    })
    let updatedComments = [...formData.comments]
    updatedComments.splice(indexToBeDeleted, 1)
    setFormData((prevState) => ({
      ...prevState,
      comments: updatedComments
    }))

  }


  const generateComment = (user, comment, timestamp, index, id) => {
    return (
      <Col key={index} span={24} style={{ textAlign: 'left' }} >
        <div style={{ border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
          <Comment
            author={user}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
            content={comment}
            datetime={
              <Tooltip title={timestamp}>
                <span>{moment(timestamp).fromNow()}</span>
              </Tooltip>
            }
          />
          <div>
            <DeleteOutlined style={{ padding: 8, cursor: 'pointer' }} onClick={() => deleteComment(id)} />
          </div>
        </div >
      </Col>
    )
  }
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ textAlign: 'left' }}>
        {formData.comments ?
          formData.comments.length != 0 ? <p>Comments</p> : ''
          :
          ''
        }
      </Col>
      {formData.comments ? formData.comments.map((comment, index) => {
        return generateComment(comment.user, comment.comment, comment.timestamp, index, comment.id)
      })
        : ''}

      <Col span={12} className="test" style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button type="primary" size="small" onClick={showModal}>Add comment</Button>
        <Modal title="Comment" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input.TextArea allowClear name='newComment' autoSize={true} onChange={(e) => setNewComment(e.target.value)} value={newComment} />
        </Modal>
      </Col>
    </Row>
  )
}

