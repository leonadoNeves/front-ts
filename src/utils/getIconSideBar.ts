import {
  AuditOutlined,
  CloudUploadOutlined,
  FileAddOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SwapRightOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import { createElement } from 'react';

export function getIconSideBar(name: string) {
  switch (name) {
    case 'User':
      return createElement(UserOutlined);
    case 'FileArrowUp':
      return createElement(CloudUploadOutlined);
    case 'Gear':
      return createElement(SettingOutlined);
    case 'WarningOctagon':
      return createElement(WarningOutlined);
    case 'ClipboardText':
      return createElement(SnippetsOutlined);
    case 'File':
      return createElement(FileAddOutlined);
    case 'Files':
      return createElement(AuditOutlined);
    case 'Point':
      return createElement(SwapRightOutlined);
  }
}
