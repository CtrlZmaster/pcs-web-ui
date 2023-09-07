import {ActionPayload} from "app/store";
import {useClusterSources, useClusterTask} from "app/view/cluster/share";

const useAgent = (agentName: string) => {
  const {pcmkAgents} = useClusterSources();
  const agent = pcmkAgents[agentName];
  return {
    agent,
    isAgentLoaded:
      agent
      && (agent.loadStatus === "LOADED" || agent.loadStatus === "RELOADING"),
  };
};

export const useTask = () => {
  const task = useClusterTask("fenceDeviceCreate");
  const {clusterName, state, dispatch} = task;
  const {agent, isAgentLoaded} = useAgent(state.agentName);

  return {
    ...task,
    isAgentLoaded,

    // validations
    isNameTypeValid:
      state.fenceDeviceName.length > 0 && state.agentName.length > 0,

    areInstanceAttrsValid:
      isAgentLoaded
      && agent.parameters.every(
        param =>
          !param.required
          || ("deprecated" in param && param.deprecated)
          || param.name in state.instanceAttrs,
      ),

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "FENCE_DEVICE.CREATE.CLOSE",
        key: {clusterName},
      });
    },

    updateState: (payload: ActionPayload["FENCE_DEVICE.CREATE.UPDATE"]) => {
      dispatch({
        type: "FENCE_DEVICE.CREATE.UPDATE",
        key: {clusterName},
        payload,
      });
    },

    create: ({force}: {force: boolean}) => {
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: `create fence device "${state.fenceDeviceName}"`,
          call: {
            name: "stonith-create",
            payload: {
              stonith_id: state.fenceDeviceName,
              stonith_agent_name: state.agentName,
              instance_attributes: state.instanceAttrs,
              ensure_disabled: state.disabled,
              operations: [],
              meta_attributes: {},
              allow_absent_agent: force,
              allow_invalid_operation: force,
              allow_invalid_instance_attributes: force,
            },
          },
        },
      });
    },
  };
};