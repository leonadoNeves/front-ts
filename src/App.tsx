/* eslint-disable @typescript-eslint/no-explicit-any */
// import ContainerPage from './Container/Dashboard';
import { defaultTheme } from './style/theme';
import { ThemeProvider } from 'styled-components';
import Router from './routes';
import { GlobalStyles } from './style/globalStyle';
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
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
