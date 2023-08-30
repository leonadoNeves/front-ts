import BasicRegisters from '@/pages/BasicRegisters';
import { ClusterPage } from '@/pages/Cluster';
import FormCluster from '@/pages/Cluster/formPage';
import { Error404 } from '@/pages/Error404';
import { FieldPage } from '@/pages/Field';
import { CadFieldsPage } from '@/pages/Field/formPage';
import { HomePage } from '@/pages/Home';
import { InstallationPage } from '@/pages/Instalation';
import { CadInstalacaoPage } from '@/pages/Instalation/formPage';
import { ReservoirPage } from '@/pages/Reservoir';
import { CadReservoirPage } from '@/pages/Reservoir/formPage';
import { ZonePage } from '@/pages/Zones';
import { ZoneRegisterPage } from '@/pages/Zones/formPage';
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
        element={<FormCluster />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/instalacoes"
        element={<InstallationPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cadInstalacao/:id?"
        element={<CadInstalacaoPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/campos"
        element={<FieldPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cadCampo/:id?"
        element={<CadFieldsPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/zonas"
        element={<ZonePage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cadZona/:id?"
        element={<ZoneRegisterPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/reservatorios"
        element={<ReservoirPage />}
      />

      <Route
        path="/dashboard/:instance/cadastrosBasicos/cadReservatorio/:id?"
        element={<CadReservoirPage />}
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

/*
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
