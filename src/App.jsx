import React, { useState, useEffect } from 'react'
import { Table, Tag } from 'antd'
import CreateOrderModal from './CreateOrder'
import CreateButton from './components/createButton'
import axios from 'axios'

const columns = [
  {
    title: 'User ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: 'Product ID',
    dataIndex: 'product_id',
    key: 'product_id',
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Product Price',
    dataIndex: 'total_price',
    key: 'total_price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Order ID',
    dataIndex: 'order_id',
    key: 'order_id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: () => (
      <>
        <Tag color='green' key='nice'>
          Ordered
        </Tag>
      </>
    ),
  },
]

const App = () => {
  const [open, setOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:3020/users')
        setUsers(usersRes.data)

        if (usersRes.data.length > 0) {
          const ordersRes = await axios.get(`http://localhost:3020/orders/${usersRes.data[0].id}`)
          setOrders(ordersRes.data)
        }

        const productsRes = await axios.get('http://localhost:3020/products')
        setProducts(productsRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <CreateButton setOpen={setOpen} />
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <Table columns={columns} dataSource={orders} rowKey={record => record.id} />
      </div>
      <CreateOrderModal
        open={open}
        setOpen={setOpen}
        handleCancel={() => setOpen(false)}
        setOrders={setOrders}
        user={users[0]}
        products={products}
      />
    </div>
  )
}
export default App
