import React from "react"
import {SearchOutlined} from "@ant-design/icons";
import { Button, Input, Space, Tooltip } from "antd";
import Highlighter from "react-highlight-words";

const getColumnSearchProps = (
    dataIndex, 
    name,
    setSearchText,
    searchText,
    searchedColumn,
    searchInput,
    setSearchedColumn,
    data  
) => {

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText("");
        confirm();
    };

    return ({
        filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
        }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
            ref={searchInput}
            placeholder={`Filtrar ${name}`}
            value={selectedKeys[0]}
            onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90, background: '#0D7C84', borderColor: '#0D7C84' }}
            >
                Filtrar
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                size="small"
                style={{ width: 90, borderColor: '#0D7C84' }}
            >
                Limpar
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
                style={{ color: '#0D7C84'}}
            >
                fechar
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
        ),
        onFilter: (value, record) => {
        
        let nestedValue = ""
        
        if(Array.isArray(dataIndex)){
        
            nestedValue = dataIndex.reduce((obj, key) => (obj ? obj[key] : undefined), record);
        
            return nestedValue !== undefined ? nestedValue.toString().toLowerCase().includes(value.toLowerCase()) : ""
        
        }else{
        
            data.forEach(elem => {
            
            if(Object(elem)[dataIndex]){
                
                if(Object(elem)[dataIndex] === value || Object(elem)[dataIndex].includes(value)){
        
                return Object(elem)[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        
                }
        
            }
        
            })
        
        }
        
        if(record[dataIndex]){
            return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        }
        
        },
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text, record) =>
        searchedColumn === dataIndex ? (
            <Tooltip placement="bottomLeft" title={text}>
            <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
            />
            </Tooltip>
        ) : dataIndex === "gasSafetyBurnVolume" ? (
            <Tooltip placement="bottomLeft" title={text}>
            {text ? text.toString().replace(".", ",") : text}
            </Tooltip>
        ) : (
            <Tooltip placement="bottomLeft" title={text}>
            {text}
            </Tooltip>
        ),
    });
}

export default getColumnSearchProps


