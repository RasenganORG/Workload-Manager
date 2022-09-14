import { Card, Skeleton, Form, Button, Select, Input, Tooltip, Comment, Avatar, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { EditOutlined, LeftCircleOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Title(props) {
  const { onInputChange, onSelectChange, handleSave, handleEditButton, handleDelete } = props.eventHandlers
  const { viewMode, setViewMode } = props.display
  const { formData, setFormData } = props.form
  const { title } = formData.taskData
  const { Meta } = Card;
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }} >
        {viewMode == 'readOnly' ?
          <>
            <p style={{ margin: 0 }}>{title}</p>
            <EditOutlined onClick={handleEditButton} style={{ cursor: 'pointer' }} />
          </>
          :
          <>
            <Input name='title' onChange={(e) => { onInputChange(e) }} defaultValue={title} />
            <CloseOutlined onClick={() => { setViewMode('readOnly') }} />
          </>
        }
      </div>
      <div onClick={() => navigate(-1)}>
        <Button><LeftCircleOutlined />Go back</Button>
      </div>
    </div>
  )

}
