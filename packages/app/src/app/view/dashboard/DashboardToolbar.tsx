import {dataTest} from "app/view/dataTest";
import {LaunchersToolbar} from "app/view/share";

import * as task from "./task";

export const DashboardToolbar = () => {
  return (
    <LaunchersToolbar
      toolbarName="dashboard"
      buttonsItems={[
        {
          name: "add-existing-cluster",
          "data-test": dataTest("dashboard.toolbar.addExistingCluster"),
          task: {
            component: task.importExistingCluster.ImportExistingCluster,
            useTask: task.importExistingCluster.useTask,
          },
        },
        {
          name: "setup-cluster",
          "data-test": dataTest("dashboard.toolbar.setupCluster"),
          task: {
            component: task.clusterSetup.ClusterSetup,
            useTask: task.clusterSetup.useTask,
          },
        },
      ]}
      data-test={dataTest("dashboard.toolbar")}
    />
  );
};
