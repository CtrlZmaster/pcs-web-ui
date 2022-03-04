import { Alert } from "@patternfly/react-core";

import { FenceDevice } from "app/view/cluster/types";
import { DetailLayout, ResourceDetailCaption } from "app/view/share";

export const FenceDevicePage = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={fenceDevice.id}
          type={fenceDevice.type}
        />
      }
      data-test={`resource-detail ${fenceDevice.id}`}
    >
      <Alert variant="danger" isInline title="Fence device inside group">
        Fence device inside group is not supported although it is formally
        possible. Please remove this fence device from the group via pcs.
      </Alert>
    </DetailLayout>
  );
};
