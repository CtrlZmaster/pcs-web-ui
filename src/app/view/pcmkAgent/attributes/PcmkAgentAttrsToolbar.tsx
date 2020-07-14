import React from "react";

import { types } from "app/store";
import { ToolbarFilterTextGroupPair } from "app/view/toolbar";

type AgentParameter = types.pcmkAgents.AgentParameter;

const useState = (): {
  filterState: ReturnType<
    typeof ToolbarFilterTextGroupPair.useState
  >["filterState"];
  filterParameters: (parameters: AgentParameter[]) => AgentParameter[];
} =>
  ToolbarFilterTextGroupPair.useState(
    {
      Required: true,
      Optional: true,
      Advanced: false,
    },
    p => ({
      Advanced: p.advanced,
      Required: p.required,
      Optional: !p.required && !p.advanced,
    }),
    p => p.name,
  );

export const PcmkAgentAttrsToolbar = ({
  actions = {},
  filterState,
}: {
  actions?: React.ComponentProps<typeof ToolbarFilterTextGroupPair>["actions"];
  filterState: ReturnType<typeof useState>["filterState"];
}) => {
  return (
    <ToolbarFilterTextGroupPair
      textSearchId="agent-attributes-name"
      groupName="Importance"
      filterState={filterState}
      actions={actions}
    />
  );
};

PcmkAgentAttrsToolbar.useState = useState;