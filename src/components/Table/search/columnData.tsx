import { ITableColumnDTO } from '@/dtos/TableColumnDTO';
import React from 'react';
import { Tooltip } from 'antd';

const columnsSearch = (
  tableColumns: ITableColumnDTO[],
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  searchText: string,
  searchedColumn: string,
  searchInput: React.MutableRefObject<HTMLInputElement | null>,
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>,
  data: any,
) => {
  const arr = tableColumns.map((c: any) => {
    if (c.dataIndex === 'changedField') {
      return {
        ...c,
        render: (_text: any, record: { changedField: any }) => (
          <Tooltip placement="bottomLeft" title={record.changedField}>
            <span>{record.changedField}</span>
          </Tooltip>
        ),
      };
    }

    if (c.dataIndex === 'completions') {
      return {
        ...c,
        render: (_text: any, record: { completions: any[] }) => {
          const completions = record.completions.map(c => {
            return (
              <span key={c.id}>
                <Tooltip placement="bottomLeft" title={record.completions.length > 1 ? `${c.name} / ` : `${c.name}`}>
                  {record.completions.length > 1 ? `${c.name} / ` : `${c.name}`}
                </Tooltip>
              </span>
            );
          });

          return completions;
        },
      };
    }

    if (c.dataIndex === 'reservoirs') {
      return {
        ...c,
        render: (_text: any, record: { completions: any[] }) => {
          const completions = record.completions.map(c => {
            return (
              <span key={c.id}>
                <Tooltip placement="bottomLeft" title={c.reservoir !== null ? `${c.reservoir.name}` : ``}>
                  {c.reservoir !== null ? `${c.reservoir.name}` : ``}
                </Tooltip>
              </span>
            );
          });

          return completions;
        },
      };
    }

    if (c.dataIndex === 'zones') {
      return {
        ...c,
        render: (_text: any, record: { completions: any[] }) => {
          const completions = record.completions.map(c => {
            return (
              <span key={c.id}>
                <Tooltip
                  placement="bottomLeft"
                  title={
                    c.reservoir !== null && c.reservoir.zone.codZone !== null
                      ? `${c.reservoir.zone.codZone}`
                      : ``
                  }
                >
                  {c.reservoir !== null && c.reservoir.zone.codZone !== null
                    ? `${c.reservoir.zone.codZone}`
                    : ``}
                </Tooltip>
              </span>
            );
          });

          return completions;
        },
      };
    }

    if (c.search) {
      return {
        ...c,
        // ...getColumnSearchProps(
        //   c.dataIndex,
        //   c.title,
        //   setSearchText,
        //   searchText,
        //   searchedColumn,
        //   searchInput,
        //   setSearchedColumn,
        //   data,
        // ),
      };
    }

    return c;
  });

  return arr;
};

export default columnsSearch;
