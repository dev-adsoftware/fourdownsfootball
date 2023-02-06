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
  // const [deviceToken, setDeviceToken] = React.useState<string>();
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

  // const getOrCreateDeviceRegistration = async (
  //   id: string,
  //   ownerId: string,
  // ): Promise<DeviceRegistrationDto> => {
  //   const service = new DeviceRegistrationsService();
  //   if (!(await service.deviceRegistrationExists(id))) {
  //     const deviceRegistrationDto = new DeviceRegistrationDto();
  //     deviceRegistrationDto.id = id;
  //     deviceRegistrationDto.token = id;
  //     deviceRegistrationDto.ownerId = ownerId;
  //     await service.createDeviceRegistration(deviceRegistrationDto);
  //   }

  //   return await service.getDeviceRegistration(id);
  // };

  // const updateDeviceRegistration = React.useCallback(
  //   async (localDeviceToken: string, ownerId: string) => {
  //     try {
  //       const deviceRegistration = await getOrCreateDeviceRegistration(
  //         localDeviceToken,
  //         ownerId,
  //       );
  //       if (deviceRegistration.ownerId !== ownerId) {
  //         await new DeviceRegistrationsService().updateDeviceRegistration(
  //           localDeviceToken,
  //           deviceRegistration,
  //           {
  //             ownerId: ownerId,
  //           },
  //           ['ownerId'],
  //         );
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  //   [],
  // );

  React.useEffect(() => {
    if (!isRegistered) {
      setIsRegistered(true);

      OneSignal.setAppId('9e051574-ebf4-4f71-93e2-1218b7739d5d');
      OneSignal.promptForPushNotificationsWithUserResponse();

      // RNNotifications.registerRemoteNotifications();

      // RNNotifications.events().registerRemoteNotificationsRegistered(
      //   async (event: RNRegistered) => {
      //     setDeviceToken(event.deviceToken);
      //   },
      // );

      // RNNotifications.events().registerRemoteNotificationsRegistrationFailed(
      //   (event: RNRegistrationError) => {
      //     if (!event.localizedDescription.endsWith('simulator')) {
      //       console.error(event);
      //     }
      //   },
      // );

      OneSignal.setNotificationWillShowInForegroundHandler(
        notificationReceivedEvent => {
          console.log(
            'Notification received in foreground',
            notificationReceivedEvent,
          );
          notificationQueueDispatch({
            type: 'queue-notification',
            payload: new NotificationDto().init(
              JSON.parse(notificationReceivedEvent.getNotification().body),
            ),
          });
          notificationReceivedEvent.complete();
        },
      );

      // RNNotifications.events().registerNotificationReceivedForeground(
      //   (notification: RNNotification, completion) => {
      //     console.log(
      //       `Notification received in foreground: ${JSON.stringify(
      //         notification.payload,
      //         null,
      //         2,
      //       )}`,
      //     );
      //     notificationQueueDispatch({
      //       type: 'queue-notification',
      //       payload: new NotificationDto().init(
      //         JSON.parse(notification.payload.notification),
      //       ),
      //     });
      //     completion({alert: false, sound: false, badge: false});
      //   },
      // );

      OneSignal.setNotificationOpenedHandler(notification => {
        console.log('OneSignal: notification opened:', notification);
      });

      // RNNotifications.events().registerNotificationOpened(
      //   (notification: RNNotification, completion) => {
      //     console.log(
      //       `Notification opened: ${JSON.stringify(
      //         notification.payload,
      //         null,
      //         2,
      //       )}`,
      //     );
      //     completion();
      //     console.log('completed opened notification');
      //   },
      // );
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

        // if (activeGame?.id === notification.recordId) {
        //   refreshActiveGame(false)
        //     .then(() => console.log('refreshed active game'))
        //     .catch(e => console.log(e));
        // }
        // refreshOwnerDashboard(false)
        //   .then(() => console.log('refreshed owner dashboard'))
        //   .catch(e => console.log(e));
      } else if (notification.recordType === 'game-requests') {
        console.log('received game-requests event');
        listenerState
          .filter(listener => {
            return listener.eventType === 'game-requests';
          })
          .map(listener => {
            listener.callback(notification.recordId);
          });

        // refreshOwnerDashboard(false)
        //   .then(() => console.log('refreshed owner dashboard'))
        //   .catch(e => console.log(e));
      } else if (notification.recordType === 'game-invites') {
        console.log('received game-invites event');
        listenerState
          .filter(listener => {
            return listener.eventType === 'game-invites';
          })
          .map(listener => {
            listener.callback(notification.recordId);
          });

        // refreshOwnerDashboard(false)
        //   .then(() => console.log('refreshed owner dashboard'))
        //   .catch(e => console.log(e));
      }
    }
  }, [notificationQueueState, listenerState]);

  React.useEffect(() => {
    if (user?.username) {
      console.log('updating device registration');

      // set external user id here

      // updateDeviceRegistration(deviceToken, user?.username as string);

      OneSignal.setExternalUserId(user?.username, results => {
        // The results will contain push and email success statuses
        console.log('Results of setting external user id');
        console.log(results);
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
