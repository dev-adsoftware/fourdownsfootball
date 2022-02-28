import React from 'react';
import {
  Notifications as RNNotifications,
  Notification as RNNotification,
  Registered as RNRegistered,
  RegistrationError as RNRegistrationError,
} from 'react-native-notifications';
import {
  DeviceRegistration,
  DeviceRegistrationsService,
} from '../services/device-registrations';
import {getStatusFromError} from '../services/types';
import {useAuth} from './auth';

interface Notification {}

const NotificationContext = React.createContext<Notification | undefined>(
  undefined,
);

type NotificationProviderProps = {
  children: React.ReactNode;
};

function NotificationProvider({children}: NotificationProviderProps) {
  const [deviceToken, setDeviceToken] = React.useState<string>();

  const auth = useAuth();

  const getOrCreateDeviceRegistration = async (
    id: string,
    ownerId: string,
  ): Promise<DeviceRegistration> => {
    const service = new DeviceRegistrationsService();
    try {
      return await service.get(id);
    } catch (e) {
      if (getStatusFromError(e) === 404) {
        return await service.create({
          id,
          sequence: '0',
          token: id,
          ownerId,
        });
      }
      throw e;
    }
  };

  const updateDeviceRegistration = React.useCallback(
    async (localDeviceToken: string, ownerId: string) => {
      try {
        const deviceRegistration = await getOrCreateDeviceRegistration(
          localDeviceToken,
          ownerId,
        );
        if (deviceRegistration.ownerId !== ownerId) {
          await new DeviceRegistrationsService().update(
            localDeviceToken,
            ['ownerId', 'sequence', 'lastUpdateDate', 'lastUpdatedBy'],
            {
              ownerId: ownerId,
              sequence: deviceRegistration.sequence,
              lastUpdateDate: new Date().toISOString(),
              lastUpdatedBy: ownerId,
            },
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!deviceToken) {
      RNNotifications.registerRemoteNotifications();

      RNNotifications.events().registerRemoteNotificationsRegistered(
        async (event: RNRegistered) => {
          setDeviceToken(event.deviceToken);
        },
      );
      RNNotifications.events().registerRemoteNotificationsRegistrationFailed(
        (event: RNRegistrationError) => {
          console.error(event);
        },
      );

      RNNotifications.events().registerNotificationReceivedForeground(
        (notification: RNNotification, completion) => {
          console.log(
            `Notification received in foreground: ${JSON.stringify(
              notification.payload,
              null,
              2,
            )}`,
          );
          completion({alert: false, sound: false, badge: false});
        },
      );

      RNNotifications.events().registerNotificationOpened(
        (notification: RNNotification, completion) => {
          console.log(
            `Notification opened: ${JSON.stringify(
              notification.payload,
              null,
              2,
            )}`,
          );
          completion();
        },
      );
    } else {
      updateDeviceRegistration(deviceToken, auth.owner?.id as string);
    }
  }, [deviceToken, updateDeviceRegistration, auth.owner]);

  return (
    <NotificationContext.Provider value={{}}>
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
