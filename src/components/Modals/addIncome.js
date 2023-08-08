import React from 'react';
import { Button,Modal,Form,Input,DatePicker,Select } from 'antd';

function AddIncome({isIncomeModalVisible,
    handleIncomeCancel,
    onFinish,}) {

const [form] = Form.useForm();

  return (
    <Modal
    style={{fontWeight:600}}
    title="Add Income"
    open={isIncomeModalVisible}
    onCancel={handleIncomeCancel}
    footer={null}
    >
        <Form
        form={form}
        layout='vertical'
        onFinish={(values)=>{
            onFinish(values,"income");
            form.resetFields();
        }}
        >
        <Form.Item 
        style={{fontWeight:600}}
        label= "Name"
        name="name"
        rules={[{
            required:true,
            message:"Please input the name of the transaction!",
        }]}
        >

        <Input 
            type='text'
            className='custom-input'
        />                   
        </Form.Item>

         <Form.Item style={{fontWeight:600}}
        label= "Amount"
        name="amount"
        rules={[{
            required:true,
            message:"Please enter the Income Amount!",
        }]}
        >

        <Input 
            type='number'
            className='custom-input'
        /> 
         </Form.Item>

         <Form.Item style={{fontWeight:600}}
        label= "Date"
        name="date"
        rules={[{
            required:true,
            message:"Please select the Income Date!",
        }]}
        >

        <DatePicker format="YYYY-MM-DD" className='custom-input'/> 
         </Form.Item>

         <Form.Item style={{fontWeight:600}}
        label= "Tag"
        name="tag"
        rules={[{
            required:true,
            message:"Please select a Tag from the dropdown!",
        }]}
        >
         <Select className='select-input-2'>
           <Select.Option value="salary">Salary</Select.Option>
           <Select.Option value="freelance">FreeLance</Select.Option>
           <Select.Option value="investment">Investment</Select.Option>
           {/* Add more Tags here */}
         </Select>         
         </Form.Item>

         <Form.Item>
            <Button className='button button-blue' type='primary' htmlType='submit'>Add Income</Button>
         </Form.Item>
        </Form>
    </Modal>
  )
}

export default AddIncome