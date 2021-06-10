import React from "react";
import { Form, FormGroup } from "@patternfly/react-core";

import { FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";
import { NameTypeTypeSelect } from "./NameTypeTypeSelect";

export const NameType: React.FC = () => {
  const {
    state: {
      agentName,
      resourceName,
      showValidationErrors,
      libCall: { reports },
    },
    clusterName,
    dispatch,
    updateState,
  } = useTask();

  const onSelect = (value: string) => {
    dispatch({
      type: "RESOURCE_AGENT.ENSURE",
      key: { clusterName },
      payload: { agentName: value.toString() },
    });
    updateState({ agentName: value.toString() });
  };

  const onClear = () => updateState({ agentName: "" });

  const changeResourceName = (value: string) =>
    updateState({ resourceName: value });

  const resourceNameValidated =
    showValidationErrors && resourceName.length === 0 ? "error" : "default";
  const agentNameValidated =
    showValidationErrors && agentName.length === 0 ? "error" : "default";

  return (
    <TaskLibStep
      title="Choose name and type for the new resource"
      reports={reports}
    >
      <Form>
        <FormText
          id="new-resource-name"
          label="Resource name"
          onChange={changeResourceName}
          value={resourceName}
          helperTextInvalid="Please provide the new resource name"
          isRequired
          validated={resourceNameValidated}
        />
        <FormGroup
          label="Resource type"
          isRequired
          fieldId="new-resource-agent-name"
          helperTextInvalid="Please select a resource agent"
          validated={agentNameValidated}
        >
          <NameTypeTypeSelect
            onSelect={onSelect}
            onClear={onClear}
            agentName={agentName}
          />
        </FormGroup>
      </Form>
    </TaskLibStep>
  );
};