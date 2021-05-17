import React from "react";

import { ActionPayload } from "app/store";
import { useClusterState, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("nodeAdd");
  const { clusterName, state, dispatch } = task;

  const { clusterState } = useClusterState(clusterName);

  const checkCanAddNode = () =>
    dispatch({
      type: "NODE.ADD.CHECK_CAN_ADD",
      key: { clusterName },
      payload: {
        nodeName: state.nodeName,
      },
    });

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        checkCanAddNode();
      }
    });
  };

  const filledSbdDevices = state.sbdDevices.filter(a => a.length > 0);
  const filledNodeAddresses = Object.values(state.nodeAddresses).filter(
    a => a.length > 0,
  );

  return {
    ...task,

    filledSbdDevices,

    filledNodeAddresses,

    isNameValid: state.nodeName.length > 0,

    isNodeCheckDoneValid: state.nodeCheck === "success",

    isSbdEnabled:
      clusterState.sbdDetection !== null && clusterState.sbdDetection.enabled,

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: "nodeAdd" },
      });
      dispatch({
        type: "NODE.ADD.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionPayload["NODE.ADD.UPDATE"]) =>
      dispatch({
        type: "NODE.ADD.UPDATE",
        key: { clusterName },
        payload,
      }),

    updateNodeName: (nodeName: string) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: { clusterName, task: "nodeAdd" },
      });
      dispatch({
        type: "NODE.ADD.UPDATE_NODE_NAME",
        key: { clusterName },
        payload: {
          nodeName,
        },
      });
    },

    checkAuth: () =>
      dispatch({
        type: "NODE.ADD.CHECK_AUTH",
        key: { clusterName },
        payload: {
          nodeName: state.nodeName,
        },
      }),

    nodeAdd: () =>
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: { clusterName, task: "nodeAdd" },
        payload: {
          taskLabel: `add node ${state.nodeName}`,
          call: {
            name: "cluster-add-nodes",
            payload: {
              nodes: [
                {
                  name: state.nodeName,
                  ...(filledNodeAddresses.length > 0
                    ? { addrs: filledNodeAddresses }
                    : {}),
                  ...(filledSbdDevices.length > 0
                    ? { devices: filledSbdDevices }
                    : {}),
                  ...(state.sbdWatchdog.length > 0
                    ? { watchdog: state.sbdWatchdog }
                    : {}),
                },
              ],
              no_watchdog_validation: state.sbdNoWatchdogValidation,
            },
          },
        },
      }),

    nodeStart: () =>
      dispatch({
        type: "NODE.START",
        key: { clusterName },
        payload: { nodeName: state.nodeName },
      }),

    sendKnownHosts: () =>
      dispatch({
        type: "NODE.ADD.SEND_KNOWN_HOSTS",
        key: { clusterName },
        payload: { nodeName: state.nodeName },
      }),

    checkCanAddNode,

    useNodeCheck,
  };
};
