import React from "react"
import IntlMessages from '@iso/components/utility/intlMessages';
import getColumnSearchProps from "./getColumnSearchProps.js";

const columnsSearch = (
    tableColumns,
    setSearchText,
    searchText,
    searchedColumn,
    searchInput,
    setSearchedColumn,
    data
) => {
    
    const arr = tableColumns.map((c, index) => {

        if (c.dataIndex === 'changedField') {
        return ({...c, render: (text, record) => (<IntlMessages id={`table.changedField.${record.changedField}`}/>)})
        }
    
        if (c.dataIndex === "completions") {
        return ({
            ...c, 
            render: (text, record) => {
            const completions = record.completions.map(c => {
                return <span key={c.id}>{record.completions.length > 1 ? `${c.name} / ` : `${c.name}`}</span>
            })
    
            return completions
            }
        })
        }
    
        if (c.dataIndex === "reservoirs") {
        return ({
            ...c, 
            render: (text, record) => {
            const completions = record.completions.map(c => {
                return <span key={c.id}>{c.reservoir !==null ? `${c.reservoir.name}` : ``}</span>
            })
    
            return completions
            }
        })
        }
    
        if (c.dataIndex === "zones") {
        return ({
            ...c, 
            render: (text, record) => {
            const completions = record.completions.map(c => {
                return <span key={c.id}>{c.reservoir !== null && c.reservoir.zone.codZone !== null ? `${c.reservoir.zone.codZone}` : ``}</span>
            })
    
            return completions
            }
        })
        }
    
        if (c.search){
            return ({...c, ...getColumnSearchProps(
              c.dataIndex, 
              c.title, 
              setSearchText,
              searchText,
              searchedColumn,
              searchInput,
              setSearchedColumn,
              data 
            )})
        }
    
        return c
    })

    return arr

}

export default columnsSearch
