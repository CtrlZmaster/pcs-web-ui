import {aclAssignSubjectToRole} from "./aclAssignSubjectToRole";
import {aclRoleAddPermission} from "./aclRoleAddPermission";
import {aclRoleCreate} from "./aclRoleCreate";
import {clusterImportExisting} from "./clusterImportExisting";
import {clusterSetup} from "./clusterSetup";
import {constraintColocationCreate} from "./constraintColocationCreate";
import {constraintLocationCreate} from "./constraintLocationCreate";
import {constraintOrderCreate} from "./constraintOrderCreate";
import {constraintTicketCreate} from "./constraintTicketCreate";
import {fenceDeviceArgumentsEdit} from "./fenceDeviceArgumentsEdit";
import {fenceDeviceCreate} from "./fenceDeviceCreate";
import {nodeAdd} from "./nodeAdd";
import {permissionEdit} from "./permissionEdit";
import {resourceCreate} from "./resourceCreate";
import {resourcePrimitiveGroupChange} from "./resourcePrimitiveGroupChange";
import {sbdDisable} from "./sbdDisable";

export const task = {
  aclAssignSubjectToRole,
  aclRoleAddPermission,
  aclRoleCreate,
  clusterImportExisting,
  clusterSetup,
  constraintColocationCreate,
  constraintLocationCreate,
  constraintOrderCreate,
  constraintTicketCreate,
  fenceDeviceArgumentsEdit,
  fenceDeviceCreate,
  nodeAdd,
  permissionEdit,
  resourceCreate,
  resourcePrimitiveGroupChange,
  sbdDisable,
};
