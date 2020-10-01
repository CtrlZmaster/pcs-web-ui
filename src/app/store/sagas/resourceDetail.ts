import { push } from "connected-react-router";

import { ResourceDetailActions } from "app/store/actions";

import { putNotification, sagaPut, takeEvery } from "./common";

function* correctView({
  payload: { resourceId, viewName, url },
}: ResourceDetailActions["CorrectWrongResourceTypeView"]) {
  yield putNotification(
    "INFO",
    `No view "${viewName}" for resource "${resourceId}". Redirecting to ${url}`,
  );
  yield sagaPut(push(url));
}

export default [takeEvery("RESOURCE_TREE_ITEM_TYPE.CORRECT_VIEW", correctView)];
