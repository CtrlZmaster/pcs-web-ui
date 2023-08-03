import React from "react";
import {PageSection} from "@patternfly/react-core";

import {LauncherItem} from "app/view/share/toolbar/types";

import {LaunchersToolbar} from "./LaunchersToolbar";

export const ClusterToolbar = (props: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdown?: React.ReactNode;
  after?: React.ReactNode;
  before?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <PageSection
      variant="light"
      style={{paddingTop: "0"}}
      data-test={props["data-test"]}
    >
      <LaunchersToolbar
        toolbarName={props.toolbarName}
        buttonsItems={props.buttonsItems}
        dropdown={props.dropdown}
        after={props.after}
        before={props.before}
      />
    </PageSection>
  );
};
