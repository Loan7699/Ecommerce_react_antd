import { useNavigate } from 'react-router-dom';
import { Menu, Typography } from 'antd'
import Cart from './Cart';

function Header(props) {
    const navigate = useNavigate()

    const items = [
        {
            label: "Home",
            key: ''
        },
        {
            label: "Men",
            key: 'Men',
            children: [
                {
                    label: "Men's Shirts",
                    key: "Men's Shirts"
                },
                {
                    label: "Men's Shoes",
                    key: "Men's Shoes"
                },
                {
                    label: "Men's Watches",
                    key: "Men's Watches"
                },

            ]
        },
        {
            label: "Women",
            key: 'Women',
            children: [
                {
                    label: "Women's Dresses",
                    key: "Women's Dresses"
                },
                {
                    label: "Women's Shoes",
                    key: "Women's Shoes"
                },
                {
                    label: "Women's Watches",
                    key: "Women's Watches"
                },
                {
                    label: "Women's Bags",
                    key: "Women's Bags"
                },
                {
                    label: "Women's Jewellery",
                    key: "Women's Jewellery"
                },
            ]
        },
        {
            label: "Fragrances",
            key: 'Fragrances'
        },
    ]

    const handleClickMenu = (items) => {
        navigate(`/${items.key}`)
    }

    return (
        <div className='header'>
            <Menu className='menu-header' items={items} mode='horizontal' onClick={handleClickMenu} />
            <Typography.Title level={2}>Phuong Loan Store
            </Typography.Title>
            <Cart />
        </div>
    );
}

export default Header;