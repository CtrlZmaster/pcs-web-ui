import * as cs from "dev/responses/clusterStatus/tools";

import {assert, goToCluster, mock} from "test/tools";

const {cluster} = marks;

const clusterName = "ok";

const startOnOverview = async () => {
  await goToCluster(clusterName);
  await assert.textIs(cluster.breadcrumbs.clusterName, clusterName);
  await isVisible(cluster.overview);
};

describe("Cluster detail tab switch", () => {
  beforeEach(
    async () =>
      await mock.shortcuts.withCluster({
        clusterStatus: cs.cluster(clusterName, "ok"),
      }),
  );
  afterEach(mock.stop);

  it("should allow switch to nodes", async () => {
    await startOnOverview();
    await click(cluster.tabs.nodes);
    await isVisible(cluster.nodes);
  });

  it("should allow switch to resources", async () => {
    await startOnOverview();
    await click(cluster.tabs.resources);
    await isVisible(cluster.resources);
  });

  it("should allow switch to fence devices", async () => {
    await startOnOverview();
    await click(cluster.tabs.fenceDevices);
    await isVisible(cluster.fenceDevices);
  });

  it("should allow switch to sbd", async () => {
    await startOnOverview();
    await click(cluster.tabs.sbd);
    await isVisible(cluster.sbd);
  });

  it("should allow switch to constraits", async () => {
    await startOnOverview();
    await click(cluster.tabs.constraints);
    await isVisible(cluster.constraints);
  });

  it("should allow switch to properties", async () => {
    await startOnOverview();
    await click(cluster.tabs.properties);
    await isVisible(cluster.properties);
  });

  it("should allow switch to acl", async () => {
    await startOnOverview();
    await click(cluster.tabs.acl);
    await isVisible(cluster.acl);
  });

  it("should allow switch to permissions", async () => {
    await startOnOverview();
    await click(cluster.tabs.permissions);
    await isVisible(cluster.permissions);
  });
});
