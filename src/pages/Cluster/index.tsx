import { ContainerPage } from '@/Container/Dashboard';
import { Button } from '@/components/Button';
import TableModel from '@/components/Table';
import { storageGetInstance } from '@/storage/storageInstance';
import { Link } from 'react-router-dom';
import ContainerPageCluster from './styles';
import { tableColumnList } from './tableColumns';
import bCrumb from './bCrumbs/listPageCrumb';

const instanceName = storageGetInstance();

// const { Content } = Layout;

export function ClusterPage() {
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
              <Button
                type="primary"
                icon="Plus"
                toolTipMessage="Cadastrar Cluster"
              />
            )}
          </Link>
        </div>
        <div className="containerTable">
          <TableModel
            tableColumns={tableColumnList}
            data={[
              {
                key: 1,
                isActive: true,
                name: 'Bravo',
                description: 'Descrição',
              },
            ]}
            isPagination={true}
          />
        </div>
      </ContainerPageCluster>
    </>
  );

  return <ContainerPage children={PageContent} bCrumbArr={bCrumb} />;
}
