import React from 'react'
import { Button } from 'antd'

const CreateButton = ({ setOpen }) => (
  <Button type='primary' onClick={() => setOpen(true)}>
    Create Order
  </Button>
)
export default CreateButton
