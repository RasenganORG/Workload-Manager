import React from 'react'
import { Progress, Row, Col, Form, Button, DatePicker, Input, Modal } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

export function TimeTracker(props) {
  const dispatch = useDispatch()
  const params = useParams()
  const loggedUserId = useSelector(state => state.auth.user.id)
  const { viewMode, setViewMode } = props.display
  const { setShowSaveButton } = props.saveButton
  const { formData, setFormData } = props.form
  const [isLogWorkModalOpen, setIsLogWorkModalOpen] = useState(false);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [plannedWorkingTimeForm, setPlannedWorkingTimeForm] = useState({
    date: '',
    duration: '',
  })

  const logWorkModal = {
    showModal: () => setIsLogWorkModalOpen(true),
    handleCancel: () => setIsLogWorkModalOpen(false),
    handleOk: () => setIsLogWorkModalOpen(false),
  }
  const updatePlannedWorkingTime = () => {

    setFormData((prevData) => ({
      ...prevData,
      timeTracker: {
        ...prevData.timeTracker,
        plannedWorkingTime: plannedWorkingTimeForm
      }
    }))
  }
  const planningModal = {
    showModal: () => setIsPlanningModalOpen(true),
    handleCancel: () => setIsPlanningModalOpen(false),
    handleOk: () => {
      if (!plannedWorkingTimeForm.date || !plannedWorkingTimeForm.duration) {
        toast.error("Please complete all fields", { position: "top-center", autoClose: 2000 })
      } else if (isNaN(plannedWorkingTimeForm.duration) || plannedWorkingTimeForm.duration > 8) {
        toast.error("Duration time must be less than 8 hours and it must be a valid number", { position: "top-center", autoClose: 2000 })
      } else {
        setViewMode('edit')
        setShowSaveButton(true)
        setIsPlanningModalOpen(false)
        updatePlannedWorkingTime()
        toast.success("Press 'Save Changes' to update the task", { position: "top-center", autoClose: 2000 })
      }
    },
    resetState: () => { setIsPlanningModalOpen({ date: '', duration: '' }) },
    onDateChange: (date) => setPlannedWorkingTimeForm({ ...plannedWorkingTimeForm, date: date.toString() }),
    onDurationchange: (e) => setPlannedWorkingTimeForm({ ...plannedWorkingTimeForm, duration: e.target.value })
  }

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
          {loggedUserId === formData.asigneeId ?
            <div>
              <Row style={{ justifyContent: 'space-between' }}>
                <Button type="primary" onClick={planningModal.showModal}>Plan task completation time</Button>
                <Button type="primary" onClick={logWorkModal.showModal}>Log time</Button>
              </Row>

              <Modal title="Basic Modal" visible={isLogWorkModalOpen} onOk={logWorkModal.handleOk} onCancel={logWorkModal.handleCancel}>
                <p>Nothing for now</p>
              </Modal>

              <Modal title="Add the task completation time" visible={isPlanningModalOpen} onOk={planningModal.handleOk} onCancel={planningModal.handleCancel}>
                <Form layout={'vertical'}>
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
                      value={plannedWorkingTimeForm.duration}
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

