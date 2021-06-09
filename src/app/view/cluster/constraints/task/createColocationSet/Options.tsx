import React from "react";
import {
  Flex,
  FlexItem,
  Form,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { FormGroup, FormRadios, FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

export const Options: React.FC = () => {
  const {
    updateState,
    isCustomIdValid,
    isScoreValid,
    state: {
      id,
      useCustomId,
      showValidationErrors,
      placement,
      score,
      libCall: { reports },
    },
  } = useTask();

  const customIdValid =
    showValidationErrors && !isCustomIdValid ? "error" : "default";
  const scoreValidated =
    showValidationErrors && !isScoreValid ? "error" : "default";

  const useCustomIdId = "use-custom-id";
  return (
    <TaskLibStep title="Colocation constraint options" reports={reports}>
      <Form isHorizontal>
        <FormGroup
          fieldId={useCustomIdId}
          label="Use custom id"
          helperTextInvalid={"Please provide a value of custom id"}
          validated={customIdValid}
          popover={{
            header: "Constraint id",
            body: (
              <>
                You can specify constraint id. Otherwise it will be generated
                automatically.
              </>
            ),
          }}
        >
          <Flex>
            <FlexItem className="pf-u-pt-sm">
              <Switch
                id={useCustomIdId}
                isChecked={useCustomId}
                onChange={value => updateState({ useCustomId: value })}
              />
            </FlexItem>
            {useCustomId && (
              <FlexItem>
                <TextInput
                  id={`${useCustomIdId}-id`}
                  value={id}
                  type="text"
                  onChange={value => updateState({ id: value })}
                  validated={customIdValid}
                />
              </FlexItem>
            )}
          </Flex>
        </FormGroup>

        <FormRadios
          id="constraint-colocation-create-placement"
          label="Placement"
          options={["together", "apart"]}
          selected={placement}
          onChange={value => updateState({ placement: value })}
        />

        <FormText
          label="Score"
          id="score"
          value={score}
          validated={scoreValidated}
          helperTextInvalid="Score must be integer or INFINITY"
          onChange={value => updateState({ score: value })}
        />
      </Form>
    </TaskLibStep>
  );
};
