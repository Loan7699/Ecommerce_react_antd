import { Badge, Drawer, InputNumber, Table, Button, Form, Input, Checkbox, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ProductApi } from '../api/ProductApi';

function Cart() {
    const [openCart, setOpenCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [openConfirmOrder, setOpenConfirmOrder] = useState(false)

    useEffect(() => {
        const renderCart = async () => {
            try {
                const response = await ProductApi.getProductsOfCart()
                setCartItems(response.data.products)
            } catch (error) {
                console.log(error);
            }
        }
        renderCart()
    }, [])

    const confirmOrder = (values) => {
        setOpenCart(false)
        setOpenConfirmOrder(false)
        message.success("Your order has been confirmed");
    }

    const columns = [
        {
            title: "Product's name",
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: "Quantity",
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value, record) => {
                return (
                    <InputNumber min={0} defaultValue={value} onChange={(value) => {
                        setCartItems(prev => prev.map(cart => {
                            if (record.id === cart.id) {
                                cart.total = cart.price * value
                            }
                            return cart
                        }))
                    }}></InputNumber>
                )
            }
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price'
        }, {
            title: "Total",
            dataIndex: 'total',
            key: 'total',
            render: (value) => (
                <>{value}</>
            )
        },
    ]

    return (
        <>
            <Badge count={7} className='badge-cart' offset={[-15, -2]} onClick={() => setOpenCart(true)}>
                <ShoppingCartOutlined className="cart-icon" />
            </Badge>
            <Drawer open={openCart} onClose={() => setOpenCart(false)}
                title="Your cart"
                contentWrapperStyle={{ width: '450px' }}
            >
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={cartItems}
                    summary={(data) => {
                        const priceTotal = data.reduce((pre, curr) => {
                            return pre + curr.total;
                        }, 0)
                        return <span>Total: ${priceTotal}</span>
                    }}
                />
                <Button type='primary' onClick={() => setOpenConfirmOrder(true)}>Checkout your cart</Button>

            </Drawer>
            <Drawer open={openConfirmOrder} onClose={() => setOpenConfirmOrder(false)} title="Confirm your order" contentWrapperStyle={{ width: '450px' }}>
                <Form labelCol={{span: 6}} labelAlign='left' onFinish={confirmOrder}>
                    <Form.Item label="Full name" name="name" rules={[{
                        required: true,
                        message: 'Please enter your full name'
                    }]}>
                        <Input placeholder='Enter your full name'></Input>
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{
                        required: true,
                        type: 'email',
                        message: 'Please enter a valid email'
                    }]}>
                        <Input placeholder='Enter your email'></Input>
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{
                        required: true,
                        message: 'Please enter your address'
                    }]}>
                        <Input placeholder='Enter your address'></Input>
                    </Form.Item>
                    <Checkbox defaultChecked>Cash on delivery</Checkbox>
                    <Typography.Paragraph type='secondary'>More methods payment</Typography.Paragraph>
                    <Button type='primary' htmlType='submit'>Confirm</Button>
                </Form>
            </Drawer></>
    );
}

export default Cart;