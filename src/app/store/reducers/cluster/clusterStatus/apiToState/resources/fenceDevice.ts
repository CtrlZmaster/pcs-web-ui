import { api } from "app/backend";

import { FenceDevice, FenceDeviceStatusFlag } from "../../types";
import { transformIssues } from "../issues";

import { statusToSeverity } from "./statusInfoList";

type ApiStonith = api.clusterStatus.Stonith;

const transformStatus = (
  status: ApiStonith["status"],
): FenceDeviceStatusFlag => {
  switch (status) {
    case "blocked":
      return "BLOCKED";
    case "failed":
      return "FAILED";
    case "disabled":
      return "DISABLED";
    case "running":
    default:
      return "RUNNING";
  }
};

export const toFenceDevice = (apiFenceDevice: ApiStonith): FenceDevice => ({
  id: apiFenceDevice.id,
  type: apiFenceDevice.type,
  status: transformStatus(apiFenceDevice.status),
  statusSeverity: statusToSeverity(apiFenceDevice.status),
  issueList: transformIssues(apiFenceDevice),
  agentName: `${apiFenceDevice.class}:${apiFenceDevice.type}`,
  arguments: apiFenceDevice.instance_attr.reduce(
    (attrMap, nvpair) => ({
      ...attrMap,
      [nvpair.name]: { id: nvpair.id, value: nvpair.value },
    }),
    {},
  ),
});
