import { OperationDTO } from './OperationDTO';

interface ChildrenDTO {
  hasChildren: boolean;
  hasParent: boolean;
  menuIcon: string;
  menuName: string;
  menuOrder: string;
  menuRoute: string;
  userOperation: OperationDTO[];
}

export interface PermissionsDTO {
  hasChildren: boolean;
  hasParent: boolean;
  menuIcon: string;
  menuName: string;
  menuOrder: string;
  menuRoute: string;
  userOperation: OperationDTO[];
  children: ChildrenDTO[];
}
