import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Typography } from 'antd'
import axios from 'axios'

const { Text } = Typography

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
}

const CreateOrderModal = ({ open, setOrders, handleCancel, user, products }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const productsNames = products.map(product => product.name)

  useEffect(() => {
    setError('')
    form.resetFields()
  }, [open])

  const onFinish = async values => {
    setLoading(true)
    setError('')

    const product = products.find(product => product.name === values.productName)
    if (!product) {
      setError('Enter correct product name')
      return
    }
    const productId = product.id

    try {
      const response = await axios.post('http://localhost:3020/orders', {
        userId: values.userId,
        productId: productId,
        quantity: +values.quantity,
      })
      setOrders(prev => [...prev, response.data])
      handleCancel()
    } catch (err) {
      let errorMessage = 'An error occurred while creating the order'

      if (err.response) {
        errorMessage =
          err.response.data.details?.[0]?.message || err.response.data.message || `Server error: ${err.response.status}`
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.'
      } else {
        errorMessage = err.message
      }

      setLoading(false)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Modal
        open={open}
        title='Create Order'
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Return
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={() => form.submit()}>
            Submit
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          style={{
            maxWidth: 600,
          }}
          layout='vertical'
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name='userId' label='User ID'>
            <Input placeholder='Enter your User ID' id='userId' />
          </Form.Item>

          <Form.Item name='productName' label='Product Name'>
            <Input placeholder='Enter your Product Name' id='productName' />
          </Form.Item>

          <Form.Item name='quantity' label='Quantity'>
            <Input placeholder='Enter your Quantity' id='quantity' type='number' />
          </Form.Item>

          <Text>
            <b>Note:</b> possible product names: {productsNames.join(', ')} <br />
            <b>Note:</b> possible user id: {Array.isArray(user) ? user[0]?.id : user?.id}
          </Text>

          {error && (
            <Text type='danger' style={{ display: 'block', marginTop: '10px' }}>
              {error}
            </Text>
          )}
        </Form>
      </Modal>
    </>
  )
}
export default CreateOrderModal
