import { Error404 } from '@/pages/Error404';
import HomePage from '@/pages/Home';
import { Route, Routes } from 'react-router-dom';
import Router from '.';
import BasicRegisters from '@/pages/BasicRegisters';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/:instance" element={<HomePage />} />
      <Route
        path="/dashboard/:instance/cadastrosBasicos"
        element={<BasicRegisters />}
      />
      <Route
        path="/dashboard/:instance/cadastrosBasicos/cluster"
        element={<ClusterGrid />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

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
