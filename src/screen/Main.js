import React, { useState, useEffect } from "react";
import { Button, Layout, Typography, Table, Modal, Space, Radio } from "antd";
import { ToolOutlined } from '@ant-design/icons';

import axios from "axios";
import moment from "moment";
import 'moment/locale/th';

const { Paragraph } = Typography;
const { Footer, Content } = Layout;


const Main = () => {

    const column = [
        {
            key: '1',
            title: 'สถานะ',
            dataIndex: 'status',
            render: (item, record) => (<>{
                item === 0 ?
                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <Paragraph style={{ fontWeight: 'bold', fontSize: 12, padding: 8, color: 'white', backgroundColor: 'red', borderRadius: 10 }}>ยังไม่ติดต่อ</Paragraph>
                        <ToolOutlined style={{ color: 'red', marginLeft: 10 }}
                            onClick={() => {
                                showModal();
                                console.log(record.id)
                                setId(record.id)
                            }} />
                    </div>

                    :
                    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        <Paragraph style={{ fontWeight: 'bold', fontSize: 12, padding: 8, color: 'white', backgroundColor: 'green', borderRadius: 10 }}>ติดต่อแล้ว</Paragraph>
                        <ToolOutlined style={{ color: 'red', marginLeft: 10 }}
                            onClick={() => {
                                showModal();
                                console.log(record.id)
                                setId(record.id)
                            }} />
                    </div>
            }</>)
        },
        {
            key: '2',
            title: 'วันที่',
            dataIndex: 'date',
            render: (date) => { return moment(date).format('LL') },
        },
        {
            key: '3',
            title: 'ประเภทสินเชื่อ',
            dataIndex: 'loan_type'
        },
        {
            key: '4',
            title: 'ชื่อ-สกุล',
            dataIndex: 'name'
        },
        {
            key: '5',
            title: 'ที่อยู่',
            dataIndex: 'address'
        },
        {
            key: '6',
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'phone'
        },
        {
            key: '7',
            title: 'หมายเหตุ',
            dataIndex: 'detail'
        },
        {
            key: '8',
            title: 'พนักงานการตลาด',
            dataIndex: 'CODE',
            render: (item, record) => (<>{
                // console.log(record)
                item !== null ?
                    <Paragraph style={{ fontWeight: 'bold', }}>{record.NAME} ({record.NIKNAME}) - {record.LOCAT}</Paragraph>
                    :
                    record.sale_id !== '' ?
                    <Paragraph style={{ fontWeight: 'bold', }}>{record.sale_id}</Paragraph> :
                    <Paragraph style={{ fontWeight: 'bold', }}>-</Paragraph> 
            }
            </>)
        },
    ]

    // const MAIN_URL = 'http://localhost:8080';
    const MAIN_URL = 'https://cal-it-management-api.herokuapp.com'
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(0);
    const [id, setId] = useState(0);

    useEffect(() => {
        getAllApplyLoan();
    }, []);

    const getAllApplyLoan = async () => {
        console.log('TEST')
        await axios.get(MAIN_URL + '/customer/applyloans/')
            .then((response) => {
                console.log(response.data);
                setDataSource(response.data);
            });
    }

    const updateStatus = async () => {
        const data = {
            status: value,
        }
        console.log(data)
        await axios.put(MAIN_URL + '/customer/applyloan/' + id, data)
            .then((response) => {
                if (response.status === 201) {
                    getAllApplyLoan();
                    setValue(0);
                } else {
                    getAllApplyLoan();
                    setValue(0);
                }
            }).catch(err => {
                //   setConfirmLoading(false);
                //   setVisible(false);
                //   setVisibleError(true);
            });
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        updateStatus()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onRadioChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <Layout className="App-header">
            <Content >
                <Table
                    // columns={columns}
                    // rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={column}
                />
            </Content>

            <Modal title={'แก้ไข'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Radio.Group onChange={onRadioChange} value={value} >
                    <Space direction="vertical">
                        <Radio value={0}>ยังไม่ติดต่อกลับ</Radio>
                        <Radio value={1}>ติดต่อกลับแล้ว</Radio>
                    </Space>
                </Radio.Group>
            </Modal>

            <Footer style={{ alignSelf: 'center', }}>
                <Paragraph  >Created By @ Drift CAL</Paragraph>
            </Footer>
        </Layout>
    )
}

export default Main;