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
import { storageGetInstance } from '@/storage/storageInstance';

const BasicRegisterScreen = () => {
  const instance = storageGetInstance();

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <NavigationButton
          icon={ClusterImg}
          href={`/dashboard/${instance}/cadastrosBasicos/cluster`}
          label="Cluster"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={InstalationImg}
          href="cadastrosBasicos"
          label="Instalações"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={WellImg}
          href="cadastrosBasicos"
          label="Campos"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ZoneImg}
          href="cadastrosBasicos"
          label="Zonas"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={ReservatorioImg}
          href="cadastrosBasicos"
          label="Reservatórios"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={PocoImg}
          href="cadastrosBasicos"
          label="Poços"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={CompletationImg}
          href="cadastrosBasicos"
          label="Completações"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedidorImg}
          href="cadastrosBasicos"
          label="Pontos de Medicao"
        />
      </Col>

      <Col>
        <NavigationButton
          icon={MedicaoImg}
          href="cadastrosBasicos"
          label="Equipamentos De Medicao"
        />
      </Col>
    </Row>
  );
};

export default BasicRegisterScreen;
