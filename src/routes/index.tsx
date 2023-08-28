import { useAuth } from '@/hooks/useAuth';
import { storageGetToken } from '@/storage/storageToken';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Router() {
  const { user } = useAuth();
  const token = storageGetToken();

  if (user && token) {
    return <AppRoutes />;
  }

  return <AuthRoutes />;
}

// import HomePage from '@/pages/Home';
// import { LandingPage } from '@/pages/LandingPage';
// import { SignIn } from '@/pages/SignIn';
// import { Route, Routes } from 'react-router-dom';

// export default function Router() {
//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/signIn/:instance" element={<SignIn />} />
//       <Route path="/dashboard/:instance" element={<HomePage />} />

//       <Route path="blank_page" element={<Component />} />

/* <Route path="/" element={<LandingPage />} />
    <Route path="/signIn/:instance" element={<SignIn />} />
    <Route path="/dashboard/:instance" element={<Home />} />
    <Route path="/dashboard/:instance/cadastrosBasicos" element={<CadastrosBasicos />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/cluster" element={<ClusterGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cluster/cadCluster/:id?" element={<ClusterForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/instalacoes" element={<InstalacaoGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/instalacoes/cadInstalacao/:id?" element={<InstalacaoForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/campos" element={<FieldGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadCampo/:id?" element={<FieldForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/zonas" element={<ZoneGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadZona/:id?" element={<ZoneForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/reservatorios" element={<ReservoirGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadReservatorio/:id?" element={<ReservoirForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/pocos" element={<WellGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadPoco/:id?" element={<WellForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/pocos" element={<WellGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadPoco/:id?" element={<WellForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/completacoes" element={<CompletionGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadCompletacao/:id?" element={<CompletionForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/pontosMedicao" element={<MeasurementPointGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadPontoMedicao/:id?" element={<MeasurementPointForm />} />

    <Route path="/dashboard/:instance/cadastrosBasicos/equipamentosMedicao" element={<MeasurementEquipmentGrid />} />
    <Route path="/dashboard/:instance/cadastrosBasicos/cadEquipamentoMedicao/:id?" element={<MeasurementEquipmentForm />} /> */
