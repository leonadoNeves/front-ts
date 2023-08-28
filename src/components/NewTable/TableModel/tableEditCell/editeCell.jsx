import React, { useEffect } from "react"
import { Form, Input, InputNumber, InputNumberput } from "antd";
import { EditableContext } from "../../../expansiveEditable/context";
import { useContext, useRef, useState } from "react";
import { TableTypeObjContext } from "../../../../../context/tableContext";

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    inputType,
    ...restProps
  }) => {
  
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    const {typeInputEditable} = useContext(TableTypeObjContext)
  
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      if(record.editable === true){
        setEditing(!editing);
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
      }else{
        setEditing(false)
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
      }
    };
    
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        if(typeInputEditable){

          handleSave({
            ...record,
            value: values.value,
          });
        }else{
          handleSave({
            ...record,
            ...values
          });
        }
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;

    if (editable) {

      if(typeInputEditable === "number"){
        
        childNode = editing ? (
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <InputNumber 
              ref={inputRef}
              min={0} 
              // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              onPressEnter={save} 
              onBlur={save}
            />
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{
              paddingRight: 24,
            }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );

      }else{

        childNode = editing ? (
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input 
              ref={inputRef}
              min={0} 
              max={1}
              step="0.01"
              onPressEnter={save} 
              onBlur={save}
            />
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{
              paddingRight: 24,
            }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );

      }
    }

  
    return <td {...restProps}>{childNode}</td>;
  
};

export default EditableCell