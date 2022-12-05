import {ActionPayload} from "app/store";
import {Cluster} from "app/view/cluster/types";

export type Acls = Cluster["acls"];

export type AclType<ACL_TYPE extends "role" | "user" | "group"> = Exclude<
  Acls[ACL_TYPE],
  undefined
>[keyof Acls[ACL_TYPE]];

export type PermissionListForWrite =
  ActionPayload["CLUSTER.ACL.ROLE.PERMISSION.UPDATE"]["permissionInfoList"];
