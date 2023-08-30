import { ReactNode } from 'react';

export interface ITableColumnDTO {
  editable?: any;
  key: string | number;
  title: string | React.ReactNode;
  dataIndex: string | string[];
  align?: string | number;
  width?: string | number;
  search?: boolean;
  fixed?: string;
  ellipsis?: {
    showTitle: boolean;
  };
  sorter?: { compare?: (a: any, b: any) => 1 | -1 | 0 };
  render?: (text: any, record: any) => ReactNode;
}
