import React from "react";
import { Button } from "@patternfly/react-core";

import { useTask } from "./useTask";
import { NodeAdd } from "./NodeAdd";

export const NodeAddToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const { open, isOpened } = useTask();
  return (
    <>
      <Button variant={variant} onClick={open} data-test="node-add">
        Add node
      </Button>
      {isOpened && <NodeAdd />}
    </>
  );
};