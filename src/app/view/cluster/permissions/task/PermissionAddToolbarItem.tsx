import { Button } from "@patternfly/react-core";

import { PermissionTask } from "./PermissionTask";
import { useTask } from "./useTask";

export const PermissionAddToolbarItem = () => {
  const { open, isOpened } = useTask(); // CREATE MY TASK
  //const dispatch = useDispatch();

  return (
    <>
      <Button
        variant={"primary"}
        onClick={() => open({ type: "create" })}
        data-test="permission-add"
      >
        Create Permission
      </Button>
      {isOpened && <PermissionTask />}
    </>
  );
};
