import React, { useEffect, useState, useRef } from 'react';
import MsgEdit from '../components/MsgEdit';
import { Form, Button } from 'antd';

const InputMessageAndShow = ({
  value, onChange
}: any) => {
  const onEditChange = (value: string) => {
    onChange && onChange({
      content: value,
    })
  }
  return (
    <>
      <MsgEdit 
        value={value.content}
        onChange={onEditChange}
      />
      <div
        style={{
          whiteSpace: 'pre-wrap',
          width: 464,
        }}
      >{value.content}</div>
    </>
  )
}

const MsgEditDemo = () => {
  const [form] = Form.useForm();
  const [value] = useState(
    `这是一个增强`
  );

  useEffect(() => {
    setTimeout(() => {
      form.setFieldsValue({
        messageConfig: {
          content: `真快看到了#客户名称#额尔登#员工昵称#呃呃到底是\n12大#员工昵称#大的等等\n`
        }
      })
    }, 1000)
  }, [])
  
  const onFinishFailed = () => {}
  const onFinish = (values: any) => {
    console.log('values', values)
  }

  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ messageConfig: {
          content: ``,
        } }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="内容"
          name="messageConfig"
        >
          <InputMessageAndShow 
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default MsgEditDemo;
