import React from "react";
import { Card, CardBody } from "@patternfly/react-core";

import { url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { ConstraintValue } from "../common";

export const ConstraintCardColocationResource = ({
  label,
  id,
  role,
  instance,
}: {
  label: string;
  id: string;
  role: string | undefined;
  instance: number | undefined;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <Card>
      <CardBody>
        <ConstraintValue label={label}>
          <Link to={url.cluster.resources(clusterName, id)} />
        </ConstraintValue>
        <ConstraintValue label="Role" value={role} />
        <ConstraintValue label="Instance" value={instance} />
      </CardBody>
    </Card>
  );
};