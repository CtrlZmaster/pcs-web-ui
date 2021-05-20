import { ActionPayload, selectors } from "app/store";
import { useClusterSelector, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("constraintLocationCreate");

  const { clusterName, dispatch, state, close } = task;
  const [clusterStatus] = useClusterSelector(selectors.getCluster);

  return {
    ...task,
    nodeNameList: clusterStatus.nodeList.map(n => n.name),
    resourceIdList: clusterStatus.resourceTree.reduce<string[]>(
      (idList, resource) => {
        if (resource.itemType === "primitive") {
          return [...idList, resource.id];
        }

        if (resource.itemType === "group") {
          return [...idList, resource.id, ...resource.resources.map(r => r.id)];
        }

        return idList;
      },
      [],
    ),

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.LOCATION.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.UPDATE",
        key: { clusterName },
        payload,
      }),

    createLocation: () => {
      const resourceSpecification = state.resourceSpecification;
      const resourceValue =
        resourceSpecification === "pattern"
          ? state.resourcePattern
          : state.resourceId;

      const score = `${state.preference === "prefer" ? "" : "-"}${state.score}`;
      const locationSpecification = state.locationSpecification;

      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE",
        key: { clusterName, task: task.name },
        payload:
          locationSpecification === "node"
            ? {
                locationSpecification,
                constraint: {
                  location: {
                    resourceSpecification,
                    resourceValue,
                    nodeName: state.nodeName,
                    score,
                  },
                },
              }
            : {
                locationSpecification,
                constraint: {
                  location: {
                    resourceSpecification,
                    resourceValue,
                    rule: state.rule,
                    score,
                  },
                },
              },
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CONSTRAINT.SINGLE.CREATE.FAIL.RECOVER",
        key: { clusterName, task: task.name },
      });
    },

    close: () => {
      close();
      dispatch({
        type: "CONSTRAINT.LOCATION.CREATE.CLOSE",
        key: { clusterName },
      });
    },
  };
};
