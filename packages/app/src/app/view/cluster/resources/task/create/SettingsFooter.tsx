import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.resourceCreate.settingsFooter;

export const SettingsFooter = () => {
  const {areSettingsValid} = useTask();
  return (
    <TaskFooter {...testMarks.task.resourceCreate.settingsFooter.mark}>
      <WizardFooterNext actionIf={areSettingsValid} {...next.mark} />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
