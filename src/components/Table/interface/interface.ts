import { ITableColumnDTO } from '@/dtos/TableColumnDTO';
import React from 'react';

export interface iTableModel {
  tableColumns: ITableColumnDTO[];
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
