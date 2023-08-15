import * as responses from "dev/responses";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {countIs} = shortcuts.expect;

const clusterName = responses.clusterStatus.ok.cluster_name;

const interceptWithDashboard = (routeList: intercept.Route[] = []) => {
  intercept.run([
    intercept.route.importedClusterList({clusterNameList: [clusterName]}),
    intercept.route.clusterStatus({clusterStatus: responses.clusterStatus.ok}),
    ...routeList,
  ]);
};

const {notifications} = marks;

const launchClusterRemove = async () => {
  await shortcuts.dashboard.goToDashboard();
  await shortcuts.dashboard.importedClusters
    .inCluster(clusterName)
    .launchAction(action => action.remove);
  await click(marks.task.confirm.run);
};

const expectNotificationsInDrawer = async ({
  success,
  error,
}: {
  success: number;
  error: number;
}) => {
  await countIs(notifications.drawer.success, success);
  await countIs(notifications.drawer.error, error);
};

describe("Notification drawer", () => {
  afterEach(intercept.stop);

  it("should be displayed", async () => {
    interceptWithDashboard();

    await shortcuts.dashboard.goToDashboard();
    await click(notifications.badge);
    await isVisible(notifications.drawer);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster remove success notification", async () => {
    interceptWithDashboard([intercept.route.removeCluster({clusterName})]);

    await launchClusterRemove();
    await isVisible(notifications.toast.success);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 1, error: 0});
  });

  it("should be able to close notification in badge", async () => {
    interceptWithDashboard([intercept.route.removeCluster({clusterName})]);

    await launchClusterRemove();
    await isVisible(notifications.toast.success);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 1, error: 0});
    await click(notifications.drawer.success.destroy);
    await expectNotificationsInDrawer({success: 0, error: 0});
  });

  it("should display cluster remove error notification", async () => {
    interceptWithDashboard([
      intercept.route.removeCluster({clusterName, status: 400}),
    ]);

    await launchClusterRemove();
    await isVisible(notifications.toast.error);
    await click(notifications.badge);
    await expectNotificationsInDrawer({success: 0, error: 1});
  });
});
