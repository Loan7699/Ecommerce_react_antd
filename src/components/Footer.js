import { Typography, Space } from "antd";

function Footer() {
    return (
        <Space className="footer">
            <Typography.Link href="https://www.google.com/" target="_blank">Privacy Policy</Typography.Link>
            <Typography.Link href="https://www.google.com/" target="_blank">Terms & Conditions</Typography.Link>
             <Typography.Link href="https://www.google.com/" target="_blank">Return Policy</Typography.Link>
              <Typography.Link href="tel:+123456789" target="_blank">tel:+123456789</Typography.Link>
        </Space>
    );
}

export default Footer;