import ContainerPage from './Container/Dashboard';
import { GlobalStyles } from './style/globalStyle';
import { defaultTheme } from './style/theme';
import { ThemeProvider } from 'styled-components';

const ComponentTeste2 = () => {
  return (
    <>
      <h2>Teste 2</h2>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ContainerPage children={<ComponentTeste2 />} />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
