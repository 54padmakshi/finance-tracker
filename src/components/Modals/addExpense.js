import React from 'react';
import { Modal,Form,Button,Input,DatePicker,Select } from 'antd';

function AddExpense({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish
}){
    const [form] = Form.useForm();
  return (
    <Modal
    style={{fontWeight : 600}}
    title="Add Expense"
    open={isExpenseModalVisible}
    onCancel={handleExpenseCancel}
    footer={null}
    >
   {/*Form starts */}     <Form
        form={form}
        layout='vertical'
        onFinish={(values)=>{onFinish(values,"expense");
        form.resetFields();
        }}
        >
        {/*Name  field*/}
            <Form.Item
            style={{fontWeight : 600}}
            label="Name"
            name="name"
            rules={[{
                required:true,
                message : " Please input the name of the transaction!"
            }]}
            >
             <Input type='text' className='custom-input' />
            </Form.Item>

{/*Amount field*/}
            <Form.Item
            style={{fontWeight : 600}}
            label="Amount"
            name="amount"
            rules={[{
                required:true,
                message : " Please enter the Expense Amount!"
            }]}
            >
             <Input type='number' className='custom-input' />
            </Form.Item>

{/*date field*/}
            <Form.Item
            style={{fontWeight : 600}}
            label="Date"
            name="date"
            rules={[{
                required:true,
                message : " Please select the Expense Date!"
            }]}
            >
             <DatePicker format="YYYY-MM-DD" className='custom-input' />
            </Form.Item>

{/*Tag field*/}
            <Form.Item style={{fontWeight:600}}
               label= "Tag"
               name="tag"
               rules={[{
                    required:true,
                    message:"Please select a Tag from the dropdown!",
                   }]}
             >
           <Select className='select-input-2'>
           <Select.Option value="salary">Food</Select.Option>
           <Select.Option value="freelance">Education</Select.Option>
           <Select.Option value="investment">Office commutation</Select.Option>
           {/* Add more Tags here */}
            </Select>         
         </Form.Item>        
        
{/*Button field*/}
            <Form.Item>
            <Button className='button button-blue' type='primary' htmlType='submit'>Add Expense</Button>
         </Form.Item>

        </Form>
    </Modal>
  )
}

export default AddExpense