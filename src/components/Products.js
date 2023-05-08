import { List, Card, Image, Typography, Badge, Button, Rate, message } from 'antd'
import { useState, useEffect } from 'react'
import { ProductApi } from '../api/ProductApi'
import { useParams } from 'react-router-dom'

export default function Products() {
    const [products, setProducts] = useState([])
    const param = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const api = param.categoryId ? ProductApi.getProductsOfCategory(param.categoryId) : ProductApi.getAllProducts()
            await api
                .then(res => {
                    setProducts(res.data.products)
                })
                .catch(err => console.log(err))
        }
        getProduct()
    }, [param])

    const AddToCart = async(title) => {
        try {
           await ProductApi.addProductToCart(title)
            message.success(`Đã thêm sản phẩm ${title} vào giỏ hàng`)
        } catch (error) {
            console.log(error);
        }
    }

    const renderItem = (product) => (
        <Badge.Ribbon color='red' text={product.discountPercentage}>
            <Card className='card-product' title={product.title} key={product.id} cover={<Image src={product.thumbnail} className='thumbnail' />} actions={[<Rate disabled value={product.rating}/>, <Button type='link' onClick={() => AddToCart(product.title)}>Add to cart</Button>]}>
                <Typography.Paragraph>Price: ${product.price}
                    <Typography.Text className='original-price' delete>${Number(product.price + product.price * product.discountPercentage / 100).toFixed(2)}</Typography.Text></Typography.Paragraph>
                <Card.Meta description={<Typography.Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'more' }}>{product.description
                }</Typography.Paragraph>}></Card.Meta>
            </Card>
        </Badge.Ribbon>
    )

    return (
        <List grid={{ gutter: 16, column: 3 }} dataSource={products} renderItem={renderItem} />
    )
}