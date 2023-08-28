import { Drawer } from 'antd';
import styled from 'styled-components';

interface IStatus {
  status: boolean;
}

export const CustomDrawer = styled(Drawer)`
  font-size: 16px;

  .ant-drawer-title {
    font-size: 18px;
  }
`;

export const Status = styled.div<IStatus>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 2px;
  background: ${({ theme, status }) => (status ? theme.online : theme.offline)};
`;
