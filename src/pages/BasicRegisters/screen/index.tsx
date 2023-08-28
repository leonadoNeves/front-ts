import CompletationImg from '@/assets/images/Registers/completation.svg';
import MedidorImg from '@/assets/images/Registers/medidor.svg';
import WellImg from '@/assets/images/Registers/oil-can.svg';
import MedicaoImg from '@/assets/images/Registers/oil-valve.svg';
import ClusterImg from '@/assets/images/Registers/plataform.svg';
import ReservatorioImg from '@/assets/images/Registers/reservatorio.svg';
import InstalationImg from '@/assets/images/Registers/ship.svg';
import PocoImg from '@/assets/images/Registers/well.svg';
import ZoneImg from '@/assets/images/Registers/zone.svg';
import { NavigationButton } from '@/components/NavigationButton';
import { Col, Row } from 'antd';

export const BasicRegisterScreen = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col>
        <NavigationButton
          icon={ClusterImg}
          menuItem="cadastrosBasicos"
          label="Cluster"
          href="cluster"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={InstalationImg}
          menuItem="cadastrosBasicos"
          label="Instalações"
          href="instalacoes"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={WellImg}
          menuItem="cadastrosBasicos"
          label="Campos"
          href="campos"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ZoneImg}
          menuItem="cadastrosBasicos"
          label="Zonas"
          href="zonas"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ReservatorioImg}
          menuItem="cadastrosBasicos"
          label="Reservatórios"
          href="reservatorios"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={PocoImg}
          menuItem="cadastrosBasicos"
          label="Poços"
          href="pocos"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={CompletationImg}
          menuItem="cadastrosBasicos"
          label="Completações"
          href="completacoes"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedidorImg}
          menuItem="cadastrosBasicos"
          label="Pontos de Medicao"
          href="pontosMedicao"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedicaoImg}
          menuItem="cadastrosBasicos"
          label="Equipamentos De Medicao"
          href="equipamentosMedicao"
        />
      </Col>
    </Row>
  );
};
