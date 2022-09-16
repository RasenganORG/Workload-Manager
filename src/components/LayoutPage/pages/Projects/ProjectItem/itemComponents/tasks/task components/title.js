import { Card, Skeleton, Form, Button, Select, Input, Tooltip, Comment, Avatar, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { EditOutlined, LeftCircleOutlined, CloseOutlined, ClockCircleOutlined } from '@ant-design/icons';

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
            <h2 style={{ margin: 0 }}>{title}</h2>
            <EditOutlined onClick={handleEditButton} style={{ cursor: 'pointer', paddingLeft: '0.5rem' }} />
          </>
          :
          <>
            <Input size="large" name='title' onChange={(e) => { onInputChange(e) }} defaultValue={title} />
            <CloseOutlined onClick={() => { setViewMode('readOnly') }} style={{ cursor: 'pointer', paddingLeft: '0.5rem' }} />
          </>
        }
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => navigate('time-log')}><ClockCircleOutlined />View task time log</Button>

        <Button onClick={() => navigate(-1)}><LeftCircleOutlined />Go back</Button>
      </div>
    </div>
  )

}
