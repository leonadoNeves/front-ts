import iTableCloumn from '@/interface/tableColumn.interface';
import React from 'react';

export interface iTableModel {
  tableColumns: iTableCloumn[];
  data: any[];
  tableSize?: string | number;
  loading?: boolean;
  expandableRows?: () => React.ReactNode;
  rowOnlyExpandable?: string[];
  isPagination?: boolean;
  isEditable?: boolean;
  dataTable?: any[];
  rowNoExpandable?: string[];
  nameLine?: string;
  rowSelection?: any;
}

export interface ieditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof any;
  record: any;
  inputType?: string;
  handleSave: (record: any) => void;
}
