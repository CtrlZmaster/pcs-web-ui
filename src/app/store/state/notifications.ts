import { Reducer } from "app/store/redux";
import { NotificationActions } from "app/store/actions";

export type Notification = NotificationActions["Create"]["payload"]["notification"];

export type NotificationState = Notification[];

const notifications: Reducer<NotificationState> = (state = [], action) => {
  switch (action.type) {
    case "NOTIFICATION.CREATE":
      return [...state, action.payload.notification];
    case "NOTIFICATION.DESTROY":
      return state.filter(n => n.id !== action.payload.id);
    case "AUTH.REQUIRED":
      return [];
    default:
      return state;
  }
};

export default notifications;
