import {testMarks} from "app/view/dataTest";
import {
  DetailLayout,
  DetailToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

import {AclType} from "../types";

import {RolesAssignedTo} from "./RolesAssignedTo";

const {currentUser} = testMarks.cluster.acl;

export const UserView = ({
  userId,
  roleIdList,
}: {
  userId: string;
  roleIdList: AclType<"user">;
}) => {
  const {clusterName} = useLoadedCluster();

  return (
    <DetailLayout
      caption={
        <span>
          user: <strong {...currentUser.id.mark}>{userId}</strong>
        </span>
      }
      toolbar={
        <DetailToolbar
          buttonsItems={[
            {
              name: "assign-role",
              taskName: "aclSubjectAssign",
              taskInitAction: {
                type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
                key: {clusterName},
                payload: {subjectType: "user", subjectId: userId},
              },
            },
            {
              name: "delete-user",
              confirm: {
                title: "Delete user?",
                description: `This deletes the user ${userId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: {clusterName},
                  payload: {
                    taskLabel: `delete user "${userId}"`,
                    call: {
                      name: "acl-remove-target",
                      payload: {target_id: userId},
                    },
                  },
                },
              },
            },
          ]}
        />
      }
      {...currentUser.mark}
    >
      <RolesAssignedTo
        subjectId={userId}
        roleIdList={roleIdList}
        unassignCall={roleId => ({
          name: "acl-unassign-role-from-target",
          payload: {role_id: roleId, target_id: userId},
        })}
      />
    </DetailLayout>
  );
};
