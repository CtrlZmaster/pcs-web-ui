import { TaskFinishLib, TaskSimple, TaskSimpleFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";

export const Task = () => {
  const {
    close,
    aclRolePermissionAdd,
    recoverFromError,
    state: {
      libCall: { response, reports },
    },
  } = useTask();
  
  return (
    <TaskSimple
        title="Add permission to role"
      task={"aclRolePermissionAdd"}
      close={close}
      footer={
           response !== "no-response" ? null : (
          <TaskSimpleFooter
            run={aclRolePermissionAdd}
            runLabel="Add permission to role"
          />
        )
      }
    >
      {response === "no-response" && <Configure />}
      {response !== "no-response" && (
          <TaskFinishLib
          response={response}
          taskName="Add permission to role"
          backToUpdateSettings={recoverFromError}
          proceedForce={aclRolePermissionAdd}
          tryAgain={aclRolePermissionAdd}
          reports={reports}
        />
      )}
    </TaskSimple>
  );
};
