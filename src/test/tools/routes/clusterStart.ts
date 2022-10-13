import { endpoints } from "app/backend/endpoints";

import { RequestData, RouteResponse } from "test/tools/interception";

export const clusterStart = ({
  clusterName,
  nodeName,
  response,
}: {
  clusterName: string;
  nodeName?: string;
  response?: RouteResponse;
}) => {
  const body: RequestData["body"] = nodeName
    ? { name: nodeName }
    : { all: "1" };
  return {
    url: endpoints.clusterStart.url({ clusterName }),
    body,
    ...(response ?? { text: "" }),
  };
};
