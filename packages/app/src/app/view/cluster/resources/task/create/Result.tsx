import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonResultProceedAnyway,
  TaskButtonWizardResultBack,
  TaskFinishLibCommunicationError,
  TaskFinishLibUnsuccess,
  TaskLibReport,
  TaskLibReportList,
  TaskResultActionWizardTryAgain,
  TaskResultLib,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";

const {success, unsuccess, communicationError} = testMarks.task.resourceCreate;

export const Result = ({
  backStep,
  reviewStep,
}: {
  backStep: string;
  reviewStep: string;
}) => {
  const {
    create,
    state: {
      libCall: {reports, response},
    },
  } = useTask();
  return (
    <TaskResultLib
      response={response}
      reports={
        <TaskLibReportList
          reports={reports}
          renderReport={(report, i) => (
            <TaskLibReport
              key={i}
              report={report}
              {...testMarks.task.resourceCreate.report.mark}
            />
          )}
        />
      }
      success={
        <TaskSuccess
          primaryAction={<TaskButtonResult {...success.close.mark} />}
          {...success.mark}
        />
      }
      unsuccess={
        <TaskFinishLibUnsuccess
          reports={reports}
          back={
            <TaskButtonWizardResultBack
              stepName={backStep}
              {...unsuccess.back.mark}
            />
          }
          proceed={
            <TaskButtonResultProceedAnyway
              action={() => create({force: true})}
              {...unsuccess.proceedAnyway.mark}
            />
          }
          cancel={<TaskButtonResultCancel {...unsuccess.cancel.mark} />}
          {...unsuccess.mark}
        />
      }
      communicationError={
        <TaskFinishLibCommunicationError
          tryAgain={
            <TaskResultActionWizardTryAgain
              stepName={reviewStep}
              {...communicationError.tryAgain.mark}
            />
          }
          cancel={
            <TaskButtonResultCancel {...communicationError.cancel.mark} />
          }
          {...communicationError.mark}
        />
      }
    />
  );
};
