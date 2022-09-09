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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const loggedUserId = useSelector(state => state.auth.user.id)
  const [user, setUser] = useState('')
  const { viewMode, setViewMode } = props.display
  const { setShowSaveButton } = props.saveButton
  const { formData, setFormData } = props.form
  const [isLogWorkModalOpen, setIsLogWorkModalOpen] = useState(false);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [taskCompletationData, setTaskCompletationData] = useState({
    date: '',
    duration: '',
  })

  useEffect(() => {
    dispatch(getUser(loggedUserId)).then((res) => { setUser(res.payload) })
  }, [])

  const generateLoggedTimeObject = (loggedTime, workDescription, userId) => {
    return {
      loggedTime: loggedTime,
      workDescription: workDescription,
      userId: userId
    }
  }
  const logWorkModal = {
    showModal: () => setIsLogWorkModalOpen(true),
    handleCancel: () => setIsLogWorkModalOpen(false),
    handleOk: () => setIsLogWorkModalOpen(false),
  }

  const updatedPlannedWorkload = (newWorkload) => {

    let updatedWorkload = user.plannedWorkload
    const taskId = parseInt(params.taskId)
    const newDate = moment(taskCompletationData.date).format('DD-MM-YYYY')


    // //used "every" so that after we update/add the information we can break the loop
    // //using 'return false', forEach would continue iterating
    // user.plannedWorkload.every((plannedItem, index) => {
    //   const plannedItemDate = moment(plannedItem.date).format('DD-MM-YYYY')
    //   if (plannedItemDate == newDate) {
    //     updatedWorkload[index].plannedWork.every((task, taskIndex) => {
    //       console.log(task.taskId)
    //       if (task.taskId === taskId) {
    //         updatedWorkload[index].plannedWork[taskIndex].workDuration = parseInt(newWorkload.duration)
    //         return true
    //       } else {
    //         updatedWorkload[index].plannedWork.push({ taskId: taskId, workDuration: parseInt(newWorkload.duration) })
    //         return false

    //       }
    //       console.log('ye')
    //     })
    //   } else {


    //   }
    // })
    for (let i = 0; i < user.plannedWorkload.length; i++) {
      const plannedItemDate = moment(updatedWorkload[i].date).format('DD-MM-YYYY')

      if (plannedItemDate == newDate) {
        for (let taskIndex = 0; taskIndex < updatedWorkload[i].plannedWork.length; taskIndex++) {
          const task = updatedWorkload[i].plannedWork[taskIndex]
          // console.log(updatedWorkload[i].plannedWork)
          // console.log(task)
          const foundItem = updatedWorkload[i].plannedWork.find(item => {
            return item.taskId === taskId
          })
          if (foundItem) {
            updatedWorkload[i].plannedWork[i].workDuration = parseInt(newWorkload.duration)
          } else {
            updatedWorkload[i].plannedWork.push({ taskId: taskId, workDuration: parseInt(newWorkload.duration) })
          }
          console.log(foundItem)
          // console.log(updatedWorkload[i].plannedWork[taskIndex])
          // if (task.taskId === taskId) {
          //   updatedWorkload[i].plannedWork[taskIndex].workDuration = parseInt(newWorkload.duration)
          // } else {
          //   updatedWorkload[i].plannedWork.push({ taskId: taskId, workDuration: parseInt(newWorkload.duration) })
          // }
        }

      } else {


      }
    }
    setUser({
      ...user,
      plannedWorkload: [...updatedWorkload]
    })
    console.log(updatedWorkload)
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
        toast.success("Press 'Save Changes' to update the task", { position: "top-center", autoClose: 2000 })
        // dispatch(updateUser({ data: { plannedWorkload: [{ date: 'dada', duration: 4 }, { date: 'ye', duration: 4 }] }, userId: loggedUserId }))
      }
    },
    resetState: () => { setIsPlanningModalOpen({ date: '', duration: '' }) },
    onDateChange: (date) => setTaskCompletationData({ ...taskCompletationData, date: date.toString() }),
    onDurationchange: (e) => setTaskCompletationData({ ...taskCompletationData, duration: e.target.value })
  }
  return (
    <div>
      <button onClick={() => { updatedPlannedWorkload(taskCompletationData) }}>test</button>
      <button onClick={() => console.log(taskCompletationData)}> Show task planning data</button>
      <Row style={{ padding: '1rem 0 0 0', textAlign: 'left' }} justify={'end'}>
        <Col span={12}>
          <p style={{ fontWeight: 'bold' }}><ClockCircleOutlined /> Time tracker</p>
          <Progress percent={30} />

          <Row style={{ justifyContent: 'space-between' }}>
            <p>Estimated working time: X hours</p>
            <p>Logged time: X hours</p>
          </Row>

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

        </Col>
      </Row>
    </div >
  )
}


