import BasicRegisters from '@/pages/BasicRegisters';
import { ClusterPage } from '@/pages/Cluster';
import { Error404 } from '@/pages/Error404';
import { HomePage } from '@/pages/Home';
import { InstalationPage } from '@/pages/Instalation';
import { CadInstalacaoPage } from '@/pages/Instalation/formPage';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/:instance" element={<HomePage />} />

      <Route
        path="/dashboard/:instance/cadastrosBasicos"
        element={<BasicRegisters />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cluster"
        element={<ClusterPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cluster/cadCluster/:id?"
        element={<h2>Teste</h2>}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/instalacoes"
        element={<InstalationPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cadInstalacao"
        element={<CadInstalacaoPage />}
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

/*
    <Route path="/dashboard/:instance/cadastrosBasicos/cluster/cadCluster/:id?" element={<ClusterForm />} />

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
