// import React, { useEffect, useState, useContext } from "react";
// import { Layout, Space } from "antd";
// import Header from "@iso/components/Header";
// import CustomTable from "@iso/components/Table/Table";
// import { ActionButton as EditButton, ActionButton as AddButton } from '@iso/components/Buttons/ActionButton';
// import api from "@iso/containers/services/API/api";
// import { Link, useLocation, useHistory } from "react-router-dom";
// import ModalIsActive from "../../../../../components/modals/isActive";
// import { instanceContext } from '../../../../../context/instance';
// import { permissionsContext } from '../../../../../context/permissions';

import { Button } from '@/components/Button';
import { storageGetInstance } from '@/storage/storageInstance';
import { Link } from 'react-router-dom';
import ContainerPageCluster from './style';
import TableModel from '@/components/Table';
import { tableColumnList } from './tableColumns';
import ContainerPage from '@/Container/Dashboard';

const instanceName = storageGetInstance();

// const { Content } = Layout;

export default function ClusterGrid() {
  //   const [tableData, setTableData] = useState([])
  //   const [loadingTable, setLoadingTable] = useState(true)
  //   const history = useHistory();

  //   let location = useLocation();
  //   const instanceName = location.pathname.split("/")[2]
  //   const isBotafogoInstance = instanceName === "Botafogo"

  //   const {selectedInstance, setSelectedInstance} = useContext(instanceContext)
  //   const {postPermission, patchPermission, checkPermissions} = useContext(permissionsContext)

  //   const formatUpperCase = (coluna) => {
  //     if (coluna != null) {
  //       return coluna.toUpperCase();
  //     } else {
  //       return "";
  //     }
  //   };

  //   useEffect(() => {
  //     const abortEarly = new AbortController();

  //     checkPermissions(location, history)

  //     async function fetchAPIs() {

  //       try {

  //         setLoadingTable(true)

  //         await api.get(isBotafogoInstance ? `clusters?instance=${selectedInstance}` : "clusters").then((response) => {
  //           const { data } = response
  //           const dataWithKey = data.map(d => {
  //             return ({ ...d, key: d.id })
  //           })

  //           setTableData(dataWithKey)
  //         })

  //         setLoadingTable(false)

  //       } catch (error) {
  //         console.log(error)
  //       }

  //     }

  //     fetchAPIs()

  //     return () => {
  //       abortEarly.abort()
  //     }
  //   }, [])

  const PageContent = (
    <>
      <ContainerPageCluster>
        <div className="containerBtn">
          <Link to={`cadCluster`}>
            {instanceName != 'Botafogo' && (
              <Button type="primary" icon="Plus" />
            )}
          </Link>
        </div>

        <TableModel tableColumns={tableColumnList} data={[]} />
        {/* <CustomTable
          tableColumns={tableColumns}
          data={tableData}
          tableSize={1000}
          loading={loadingTable}
        /> */}
      </ContainerPageCluster>
    </>
  );

  return <ContainerPage children={PageContent} bCrumbArr={[]} />;
}
