import { WarningOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Button } from '../Button';

interface IModal {
  open: boolean;
  handleCancel: () => void;
  onSubmit: () => void;
  hasDeleteMessage?: boolean;
}

export const ModalConfirm = ({
  open,
  handleCancel,
  onSubmit,
  hasDeleteMessage,
}: IModal) => {
  return (
    <Modal
      open={open}
      width={500}
      onCancel={handleCancel}
      centered
      footer={[
        <div
          key="1"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            htmlType="button"
            title="Cancelar"
            variant="outlined"
            onClick={handleCancel}
          />

          <Button
            htmlType="submit"
            title="Confirmar"
            variant="contained"
            onClick={onSubmit}
          />
        </div>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '1rem',
          fontSize: '1rem',
        }}
      >
        <WarningOutlined
          style={{
            color: '#FFCE1B',
            fontSize: '2rem',
          }}
        />
        <p
          style={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
          }}
        >
          <span
            style={{ color: 'black', fontWeight: 'bold', marginBottom: '6px' }}
          >
            Você tem certeza que deseja realizar essa ação?
          </span>

          <span>
            {hasDeleteMessage &&
              'Ao inativar, todas as aterações serão perdidas e todas as hierarquias serão desativadas.'}
          </span>
        </p>
      </div>
    </Modal>
  );
};
