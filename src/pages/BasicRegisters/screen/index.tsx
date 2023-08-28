import CompletationImg from '@/assets/images/Registers/completation.svg';
import MedidorImg from '@/assets/images/Registers/medidor.svg';
import MedicaoImg from '@/assets/images/Registers/oil-valve.svg';
import ClusterImg from '@/assets/images/Registers/plataform.svg';
import ReservatorioImg from '@/assets/images/Registers/reservatorio.svg';
import InstalationImg from '@/assets/images/Registers/ship.svg';
import PocoImg from '@/assets/images/Registers/well.svg';
import ZoneImg from '@/assets/images/Registers/zone.svg';
import WellImg from '@/assets/images/Registers/oil-can.svg';
import { Col, Row } from 'antd';
import NavigationButton from '@/components/Button/NavigationButton';

const BasicRegisterScreen = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col>
        <NavigationButton
          icon={ClusterImg}
          menuItem="cadastrosBasicos"
          label="Cluster"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={InstalationImg}
          menuItem="cadastrosBasicos"
          label="Instalações"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={WellImg}
          menuItem="cadastrosBasicos"
          label="Campos"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ZoneImg}
          menuItem="cadastrosBasicos"
          label="Zonas"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ReservatorioImg}
          menuItem="cadastrosBasicos"
          label="Reservatórios"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={PocoImg}
          menuItem="cadastrosBasicos"
          label="Poços"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={CompletationImg}
          menuItem="cadastrosBasicos"
          label="Completações"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedidorImg}
          menuItem="cadastrosBasicos"
          label="Pontos de Medicao"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedicaoImg}
          menuItem="cadastrosBasicos"
          label="Equipamentos De Medicao"
        />
      </Col>
    </Row>
  );
};

export default BasicRegisterScreen;
