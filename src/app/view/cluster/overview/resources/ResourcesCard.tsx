import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@patternfly/react-icons";

import {Cluster} from "app/view/cluster/types";
import {
  EmptyStateNoItem,
  Link,
  location,
  useSelectedClusterName,
} from "app/view/share";
import {StatisticsIsueInfo} from "app/view/cluster/overview/StatisticsIsueInfo";

import {ResourceCounts} from "./ResourceCounts";
import {buildStatistics} from "./buildStatistics";
import {ResourceLink} from "./ResourceLink";

export const ResourcesCard = ({
  resourceTree,
}: {
  resourceTree: Cluster["resourceTree"];
}) => {
  const clusterName = useSelectedClusterName();
  if (resourceTree.length === 0) {
    return (
      <EmptyStateNoItem
        title="No resource is configured."
        message="You don't have any configured resources here."
      />
    );
  }

  const statistics = buildStatistics(resourceTree);

  const createResourceLink = (resourceId: string | string[]) => (
    <ResourceLink resourceIdMixed={resourceId} />
  );

  return (
    <>
      <div className="pf-u-my-sm">
        There {statistics.totalCount > 1 ? "are" : "is"}{" "}
        <strong>{statistics.totalCount}</strong>{" "}
        <Link isInline to={location.resourceList({clusterName})}>
          {statistics.totalCount === 1 ? "resources" : "resource"}
        </Link>{" "}
        in the cluster.
      </div>
      <div className="pf-u-my-sm">
        <ResourceCounts
          resourceIdLists={statistics.plain}
          description="standalone resources"
        />
        <ResourceCounts
          resourceIdLists={statistics.groups}
          description="groups"
        />
      </div>
      {Object.entries(statistics.issues.errors).map(
        ([label, resourceIdList]) => (
          <StatisticsIsueInfo
            key={label}
            color="red"
            icon={<ExclamationCircleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createItemLabel={createResourceLink}
          />
        ),
      )}
      {Object.entries(statistics.issues.warnings).map(
        ([label, resourceIdList]) => (
          <StatisticsIsueInfo
            key={label}
            color="orange"
            icon={<ExclamationTriangleIcon />}
            issueName={label.toLowerCase()}
            itemList={resourceIdList}
            createItemLabel={createResourceLink}
          />
        ),
      )}
    </>
  );
};
