import { TableTypeContext } from '@/contexts/TableContext';
import { Form, Input, InputNumber, InputRef } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import { EditableContext } from '../context';
import { ieditableCellProps } from '../interface/interface';

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  ...restProps
}: ieditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext);
  const { typeInputEditable } = useContext(TableTypeContext);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (record.editable === true) {
      setEditing(!editing);
      form?.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    } else {
      setEditing(false);
      form?.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    }
  };

  const save = async () => {
    try {
      const values = await form?.validateFields();
      toggleEdit();
      if (typeInputEditable) {
        handleSave({
          ...record,
          value: values.value,
        });
      } else {
        handleSave({
          ...record,
          ...values,
        });
      }
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;

  if (editable) {
    if (typeInputEditable === 'number') {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={String(dataIndex)}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <InputNumber
            // ref={inputRef}
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
    } else {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={String(dataIndex)}
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

export default EditableCell;
