import React from 'react'
import { Progress, Row, Col, Form, Button, DatePicker, Input, Modal } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../../../../../../features/users/userSlice';

export function TimeTracker(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const loggedUserId = useSelector(state => state.auth.user.id)
  const { viewMode, setViewMode } = props.display
  const { setShowSaveButton } = props.saveButton
  const { formData, setFormData } = props.form
  const { userPlannedWork, setUserPlannedWork } = props.userPlannedWorkInfo;
  const [isLogWorkModalOpen, setIsLogWorkModalOpen] = useState(false);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [taskCompletationData, setTaskCompletationData] = useState({
    date: '',
    duration: ''
  })
  const logWorkModal = {
    showModal: () => setIsLogWorkModalOpen(true),
    handleCancel: () => setIsLogWorkModalOpen(false),
    handleOk: () => setIsLogWorkModalOpen(false),
  }
  const updatePlannedWorkload = (newWorkload) => {
    const updatedWorkload = userPlannedWork
    const taskId = parseInt(params.taskId)
    const newDate = moment(taskCompletationData.date).format('DD-MM-YYYY')

    for (let i = 0; i < updatedWorkload.length; i++) {
      const plannedItemDate = moment(updatedWorkload[i].date).format('DD-MM-YYYY')

      if (plannedItemDate == newDate) {
        for (let taskIndex = 0; taskIndex < updatedWorkload[i].plannedWork.length; taskIndex++) {
          const wasTaskAlreadyAdded = updatedWorkload[i].plannedWork.find(item => {
            return item.taskId === taskId
          })
          if (wasTaskAlreadyAdded) {
            if (updatedWorkload[i].plannedWork[taskIndex].taskId === taskId) {
              updatedWorkload[i].plannedWork[taskIndex].workDuration = parseInt(newWorkload.duration)
            }
          } else {
            updatedWorkload[i].plannedWork.push({ taskId: taskId, workDuration: parseInt(newWorkload.duration) })
          }
        }
      } else {
        const wasDateAlreadyAdded = updatedWorkload.find(workLoadItem => {
          return moment(workLoadItem.date).format('DD-MM-YYYY') === newDate
        })
        if (!wasDateAlreadyAdded) {
          const newWorkloadDay = {
            date: newWorkload.date,
            plannedWork: [{ taskId: taskId, workDuration: newWorkload.duration }]
          }
          updatedWorkload.push(newWorkloadDay)
        }
      }
    }
    setUserPlannedWork([...updatedWorkload])
  }
  const planningModal = {
    showModal: () => setIsPlanningModalOpen(true),
    handleCancel: () => setIsPlanningModalOpen(false),
    handleOk: () => {
      if (!taskCompletationData.date || !taskCompletationData.duration) {
        toast.error("Please complete all fields", { position: "top-center", autoClose: 2000 })
      } else if (isNaN(taskCompletationData.duration) || taskCompletationData.duration > 8) {
        toast.error("Duration time must be less than 8 hours and it must be a valid number", { position: "top-center", autoClose: 2000 })
      } else {
        setViewMode('edit')
        setShowSaveButton(true)
        setIsPlanningModalOpen(false)
        updatePlannedWorkload(taskCompletationData)
        toast.success("Press 'Save Changes' to update the task", { position: "top-center", autoClose: 2000 })
      }
    },
    resetState: () => { setIsPlanningModalOpen({ date: '', duration: '' }) },
    onDateChange: (date) => setTaskCompletationData({ ...taskCompletationData, date: date.toString() }),
    onDurationchange: (e) => setTaskCompletationData({ ...taskCompletationData, duration: e.target.value })
  }

  useEffect(() => {
    dispatch(getUser(loggedUserId)).then((res) => { setUserPlannedWork(res.payload.plannedWorkload) })
  }, [])

  return (
    <div>
      <Row style={{ padding: '1rem 0 0 0', textAlign: 'left' }} justify={'end'}>
        <Col span={12}>
          <p style={{ fontWeight: 'bold' }}><ClockCircleOutlined /> Time tracker</p>
          <Progress percent={30} />

          <Row style={{ justifyContent: 'space-between' }}>
            <p>Estimated working time: X hours</p>
            <p>Logged time: X hours</p>
          </Row>
          {/* only an user assigned to a task would have the option to plan working the task */}
          {loggedUserId === formData.asignee ?
            <div>
              <Row style={{ justifyContent: 'space-between' }}>
                <Button type="primary" onClick={planningModal.showModal}>Plan task completation time</Button>
                <Button type="primary" onClick={logWorkModal.showModal}>Log time</Button>
              </Row>

              <Modal title="Basic Modal" visible={isLogWorkModalOpen} onOk={logWorkModal.handleOk} onCancel={logWorkModal.handleCancel}>
                <p>Nothing for now</p>
              </Modal>

              <Modal title="Add the task completation time" visible={isPlanningModalOpen} onOk={planningModal.handleOk} onCancel={planningModal.handleCancel}>
                <Form onFinish={() => { alert('bine ba') }} layout={'vertical'}>
                  <Form.Item>
                    <Input
                      suffix='hours'
                      style={{
                        width: '100%',
                        appearance: 'textfield !important'
                      }}
                      placeholder="Number of hours"
                      type='number'
                      max={8}
                      onChange={planningModal.onDurationchange}
                    />
                  </Form.Item>

                  <Form.Item>
                    <DatePicker
                      style={{
                        width: '100%',
                      }}
                      onChange={planningModal.onDateChange}
                    />
                  </Form.Item>
                </Form>
              </Modal>
            </div>
            :
            <></>}
        </Col>
      </Row>
    </div >
  )
}


