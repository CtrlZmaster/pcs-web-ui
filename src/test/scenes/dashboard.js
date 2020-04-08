const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url } = require("test/tools/backendAddress");
const { dt } = require("test/tools/selectors");

const endpoints = require("dev/api/endpoints");
const responses = require("dev/api/responses/all");

const CLUSTERS = dt("cluster-list", "^cluster ");
const CLUSTER_OK = dt("cluster-list", "cluster ok");
const CLUSTER_ERROR = dt("cluster-list", "cluster error");

const pollyManager = getPollyManager(() => page());

const scenarios = {
  multipleCluster: [
    endpoints.clustersOverview((req, res) => {
      res.json(
        responses.clustersOverview.withClusters([
          responses.clusterStatus.ok,
          responses.clusterStatus.error,
        ]),
      );
    }),
    endpoints.clusterStatus((req, res) => {
      res.json(responses.clusterStatus.ok);
    }),
    endpoints.getResourceAgentMetadata((req, res) => {
      res.json(responses.resourceAgentMetadata.ok);
    }),
  ],
};

const displayClusters = async () => {
  await page().goto(url());
  await page().waitFor(CLUSTERS);
};

const waitForMetadata = async () => {
  await page().waitForResponse((response) => {
    return response.url().includes("get_resource_agent_metadata");
  });
};

describe("Dashboard scene", () => {
  afterEach(async () => {
    await pollyManager().stop();
  });

  beforeEach(async () => {
    pollyManager().reset(scenarios.multipleCluster);
  });

  it("should render multiple cluster information", async () => {
    await displayClusters();
    const clusterInfoList = await page().$$eval(CLUSTERS, clusterElements =>
      clusterElements.map(e => ({
        name: e.querySelector("[data-test='name']").textContent,
        issuesTotal: e.querySelector("[data-test='issues']").textContent,
        nodesTotal: e.querySelector("[data-test='nodes']").textContent,
        resourcesTotal: e.querySelector("[data-test='resources']").textContent,
        fenceDevicesTotal: e.querySelector("[data-test='fence-devices']")
          .textContent,
      })));

    const response2Info = response => ({
      name: response.cluster_name,
      issuesTotal: (
        response.error_list.length + response.warning_list.length
      ).toString(),
      nodesTotal: response.node_list.length.toString(),
      resourcesTotal: response.resource_list
        .filter(r => !r.stonith)
        .length.toString(),
      fenceDevicesTotal: response.resource_list
        .filter(r => r.stonith)
        .length.toString(),
    });

    expect(clusterInfoList).to.eql([
      response2Info(responses.clusterStatus.error),
      response2Info(responses.clusterStatus.ok),
    ]);
  });

  it("should allow to display cluster issues", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_ERROR, "issues", "expansion-button"));
    await page().waitFor(dt(CLUSTER_ERROR, "issues-status"));

    const issues = await page().$$eval(
      dt(CLUSTER_ERROR, "issues-status"),
      issuesBoxes =>
        issuesBoxes.map(e => ({
          alerts: Array.from(
            e.querySelectorAll("[data-test^='cluster-issue']"),
          ).map(ae => ae.attributes["data-test"].value),
        })),
    );
    expect(issues).to.eql([
      {
        alerts: [
          "cluster-issue ERROR Unable to connect to the cluster.",
          "cluster-issue WARNING No fencing configured in the cluster",
          "cluster-issue WARNING Not authorized against node(s) node-3",
        ],
      },
    ]);
  });

  it("should allow to display empty cluster issues", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_OK, "issues", "expansion-button"));
    // just check that it exists
    await page().waitFor(dt(CLUSTER_OK, "issues-status"));
  });

  it("should allow to add existing cluster", async () => {
    const actionSelector = dt("dashboard-toolbar", "add-cluster");
    await page().goto(url());
    await page().waitFor(actionSelector);
    await page().click(actionSelector);
    expect(page().url()).to.equal(url("/add-cluster"));
  });

  it("should allow go to a cluster detail", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_OK, "name", "link"));
    expect(page().url()).to.equal(url("/cluster/ok"));
  });

  it("should allow go to a resource detail", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_OK, "resources", "expansion-button"));

    const RESOURCE_R1 = dt(CLUSTER_OK, "resource-list", "resource R1");
    await page().waitFor(RESOURCE_R1);
    await page().click(dt(RESOURCE_R1, "name", "link"));
    expect(page().url()).to.equal(url("/cluster/ok/resources/R1"));
    await waitForMetadata();
  });

  it("should allow go to a node detail", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_OK, "nodes", "expansion-button"));

    const NODE_1 = dt(CLUSTER_OK, "node-list", "node node-1");
    await page().waitFor(NODE_1);
    await page().click(dt(NODE_1, "name", "link"));
    expect(page().url()).to.equal(url("/cluster/ok/nodes/node-1"));
  });

  it("should allow go to a fence device detail", async () => {
    await displayClusters();
    await page().click(dt(CLUSTER_OK, "fence-devices", "expansion-button"));

    const NODE_1 = dt(CLUSTER_OK, "fence-device-list", "fence-device F1");
    await page().waitFor(NODE_1);
    await page().click(dt(NODE_1, "name", "link"));
    expect(page().url()).to.equal(url("/cluster/ok/fence-devices/F1"));
  });
});
