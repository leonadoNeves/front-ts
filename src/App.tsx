/* eslint-disable @typescript-eslint/no-explicit-any */
// import ContainerPage from './Container/Dashboard';
import { GlobalStyles } from './style/globalStyle';
import { defaultTheme } from './style/theme';
import { ThemeProvider } from 'styled-components';
// import { HomeOutlined, UserOutlined } from '@ant-design/icons';

// const ComponentTeste2 = () => {
//   return (
//     <>
//       <h2>Teste 2</h2>
//     </>
//   );
// };

// const bCrumbArr: any = [
//   {
//     href: '',
//     title: <HomeOutlined />,
//   },
//   {
//     href: '',
//     title: (
//       <>
//         <UserOutlined />
//         <span>Application List</span>
//       </>
//     ),
//   },
//   {
//     title: 'Application',
//   },
// ];

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* <ContainerPage children={<ComponentTeste2 />} bCrumbArr={bCrumbArr} /> */}
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
