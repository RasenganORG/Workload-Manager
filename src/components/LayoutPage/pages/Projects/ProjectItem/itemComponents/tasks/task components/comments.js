import { Row, Col, Button, Input, Tooltip, Comment, Avatar, Modal, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import moment from 'moment';
export default function Comments(props) {
  const [newComment, setNewComment] = useState("")
  const { formData, setFormData } = props.form
  const { setShowSaveButton } = props.saveButton
  const { setViewMode } = props.display
  const { user } = useSelector(state => state.auth)

  const deleteComment = (commentId) => {
    setShowSaveButton(true)
    //find the comment that we want to deleted using the comment id
    const indexToBeDeleted = formData.comments.findIndex(comment => {
      return commentId === comment.id
    })
    const updatedComments = [...formData.comments]

    updatedComments.splice(indexToBeDeleted, 1)

    setFormData((prevState) => ({
      ...prevState,
      comments: updatedComments
    }))

  }
  const handleChange = (comment) => {
    setNewComment(comment)
  }
  const handleCommentSubmit = (e) => {
    setNewComment('')
    if (!newComment) return
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

      <Col span={12} style={{ margin: '2rem 0' }}>
        <Form
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          layout="vertical"
          onFinish={handleCommentSubmit}
        >
          <Form.Item
            style={{ width: '100%' }}
            name="commentText"
            rules={[
              {
                required: true,
                message: 'Please add a valid comment!',
              },
            ]}>
            <Input.TextArea rows={3} type='text' onChange={(e) => handleChange(e.target.value)} value={newComment} />
          </Form.Item>
          <Form.Item>
            <Button style={{ textAlign: 'left' }} htmlType='submit' type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row >
  )
}

