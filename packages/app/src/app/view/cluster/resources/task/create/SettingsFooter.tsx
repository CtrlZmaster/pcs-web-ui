import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.createResource.settingsFooter;

export const SettingsFooter = () => {
  const {areSettingsValid} = useTask();
  return (
    <TaskFooter {...testMarks.createResource.settingsFooter.mark}>
      <WizardFooterNext actionIf={areSettingsValid} {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
