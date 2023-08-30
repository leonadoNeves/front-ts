import { ReactNode } from 'react';

export interface IHistoryTableColumnDTO {
  key: string | number,
  title: string,
  dataIndex: string,
  search?: boolean,
  sorter?: { compare?: (a: any, b: any) => 1 | -1 | 0 };
  render?: (text: any, record: any) => ReactNode;
}