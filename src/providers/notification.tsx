import React from 'react';
import OneSignal from 'react-native-onesignal';
import {NotificationDto} from '../services/dtos';

import {useAuth} from './auth';

interface Listener {
  eventType: string;
  callback: (recordId: string) => void;
  id: string;
}
interface Notification {
  addListener: (listener: Listener) => void;
  removeListener: (id: string) => void;
}

const NotificationContext = React.createContext<Notification | undefined>(
  undefined,
);

type NotificationProviderProps = {
  children: React.ReactNode;
};

type QueueAction =
  | {type: 'queue-notification'; payload: NotificationDto}
  | {type: 'pop-notification'};

const queueReducer = (
  state: NotificationDto[],
  action: QueueAction,
): NotificationDto[] => {
  switch (action.type) {
    case 'queue-notification':
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    case 'pop-notification':
      let poppedState = [...state];
      poppedState = poppedState.slice(1);
      return poppedState;
  }
};

type ListenerAction =
  | {type: 'add-listener'; payload: Listener}
  | {type: 'remove-listener'; payload: string};

const listenerReducer = (
  state: Listener[],
  action: ListenerAction,
): Listener[] => {
  switch (action.type) {
    case 'add-listener':
      const newState = [
        ...state.filter(l => {
          return l.id !== action.payload.id;
        }),
      ];

      newState.push(action.payload);
      return newState;
    case 'remove-listener':
      return [
        ...state.filter((listener: Listener) => {
          return listener.id !== action.payload;
        }),
      ];
  }
};

function NotificationProvider({children}: NotificationProviderProps) {
  const [isRegistered, setIsRegistered] = React.useState(false);

  const [notificationQueueState, notificationQueueDispatch] = React.useReducer(
    queueReducer,
    [],
  );

  const [listenerState, listenerDispatch] = React.useReducer(
    listenerReducer,
    [],
  );

  const {user} = useAuth();

  React.useEffect(() => {
    if (!isRegistered) {
      setIsRegistered(true);

      OneSignal.setAppId('9e051574-ebf4-4f71-93e2-1218b7739d5d');
      OneSignal.promptForPushNotificationsWithUserResponse();

      OneSignal.setNotificationWillShowInForegroundHandler(
        notificationReceivedEvent => {
          console.log(
            'Notification received in foreground',
            notificationReceivedEvent,
          );
          notificationQueueDispatch({
            type: 'queue-notification',
            payload: new NotificationDto().init(
              notificationReceivedEvent.getNotification()
                .additionalData as Record<string, unknown>,
            ),
          });
          notificationReceivedEvent.complete();
        },
      );

      OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
      });
    }
  }, [isRegistered]);

  React.useEffect(() => {
    if (notificationQueueState.length > 0) {
      const notification = notificationQueueState[0];
      console.log('handling notification', notification);
      notificationQueueDispatch({type: 'pop-notification'});

      if (notification.recordType === 'games') {
        console.log('received games event');

        listenerState
          .filter(listener => {
            return listener.eventType === 'games';
          })
          .map(listener => {
            listener.callback(notification.recordId);
          });
      }
    }
  }, [notificationQueueState, listenerState]);

  React.useEffect(() => {
    if (user?.username) {
      OneSignal.setExternalUserId(user?.username, results => {
        console.log('Registered external user id', results);
      });
    }
  }, [user?.username]);

  const addListener = React.useCallback((listener: Listener) => {
    listenerDispatch({type: 'add-listener', payload: listener});
  }, []);

  const removeListener = React.useCallback((id: string) => {
    listenerDispatch({type: 'remove-listener', payload: id});
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        addListener,
        removeListener,
      }}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }

  return context;
}

export {NotificationProvider, useNotification};
