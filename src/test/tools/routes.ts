import * as responses from "dev/responses";

import { Shapes, payload, url } from "test/tools";

import { RouteResponse } from "./interception";

export const can_add_cluster_or_nodes = (
  nodeName: string,
  response: RouteResponse = { text: "" },
) => ({
  url: url.canAddClusterOrNodes,
  query: { "node_names[]": nodeName },
  ...response,
});

export const check_auth_against_nodes = (
  nodeName: string,
  response: RouteResponse | null = null,
) => ({
  url: url.checkAuthAgainstNodes,
  query: { "node_list[]": nodeName },
  ...(response ?? { json: { [nodeName]: "Online" } }),
});

export const auth_gui_against_nodes = (
  nodes: Record<
    string,
    { password: string; dest_list: { addr: string; port: string }[] }
  >,
  response: RouteResponse | null = null,
) => ({
  url: url.authGuiAgainstNodes,
  body: {
    data_json: JSON.stringify({ nodes }),
  },
  ...(response ?? {
    json: {
      plaintext_error: "",
      node_auth_error: Object.keys(nodes).reduce<Record<string, 0>>(
        (nodesResponse, nodeName) => ({
          ...nodesResponse,
          [nodeName]: 0,
        }),
        {},
      ),
    },
  }),
});

export const send_known_hosts = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = { text: "success" },
) => ({
  url: url.sendKnownHosts({ clusterName }),
  body: { "node_names[]": nodeName },
  ...response,
});

export const getAvailResourceAgents = (clusterName: string) => ({
  url: url.libClusterResourceAgentListAgents({ clusterName }),
  payload: payload.libClusterResourceAgentListAgents,
  json: responses.lib.success({
    data: responses.resourceAgentListWithoutDescribe.ok,
  }),
});

export const getResourceAgentMetadata = ({
  clusterName,
  agentName,
  agentData,
}: {
  clusterName: string;
  agentName: string;
  agentData: Shapes["libClusterResourceAgentDescribeAgent"]["data"];
}) => ({
  url: url.libClusterResourceAgentDescribeAgent({ clusterName }),
  payload: payload.libClusterResourceAgentDescribeAgent(agentName),
  json: responses.lib.success({ data: agentData }),
});

export const clusterNodeAdd = (
  clusterName: string,
  nodeName: string,
  response: RouteResponse = {
    json: {
      status: "success",
      status_msg: null,
      report_list: [],
      data: null,
    },
  },
) => ({
  url: url.libCluster({ clusterName, command: "cluster-add-nodes" }),
  payload: {
    nodes: [{ name: nodeName }],
    no_watchdog_validation: false,
    force_flags: [],
  },
  ...response,
});
