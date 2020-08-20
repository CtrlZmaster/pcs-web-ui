import React from "react";
import { useDispatch } from "react-redux";

import { Action, selectors } from "app/store";
import { useClusterSelector } from "app/view";

export const useClusterFenceAgent = (agentName: string) => {
  const [fenceAgent, clusterUrlName] = useClusterSelector(
    selectors.getPcmkAgent,
    agentName,
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!fenceAgent) {
      dispatch<Action>({
        type: "FENCE_AGENT.LOAD",
        payload: { agentName, clusterUrlName },
      });
    }
  }, [agentName, clusterUrlName, dispatch, fenceAgent]);
  return {
    fenceAgent,
  };
};
