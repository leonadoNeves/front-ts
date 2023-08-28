import { GroupDTO } from './GroupDTO';
import { PermissionsDTO } from './PermissionsDTO';

export interface UserDTO {
  id: string;
  email: string;
  name: string;
  username: string;
  group: GroupDTO;
  userPermissions: PermissionsDTO[];
}
