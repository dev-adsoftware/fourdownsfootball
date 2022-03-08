import React from 'react';
import {
  Notifications as RNNotifications,
  Notification as RNNotification,
  Registered as RNRegistered,
  RegistrationError as RNRegistrationError,
} from 'react-native-notifications';
import {DeviceRegistrationsService} from '../services/device-registrations';
import {DeviceRegistrationDto} from '../services/dtos';
import {useData} from './data';

interface Notification {}

const NotificationContext = React.createContext<Notification | undefined>(
  undefined,
);

type NotificationProviderProps = {
  children: React.ReactNode;
};

function NotificationProvider({children}: NotificationProviderProps) {
  const [deviceToken, setDeviceToken] = React.useState<string>();

  const {ownerDashboard} = useData();

  const getOrCreateDeviceRegistration = async (
    id: string,
    ownerId: string,
  ): Promise<DeviceRegistrationDto> => {
    const service = new DeviceRegistrationsService();
    if (!(await service.deviceRegistrationExists(id))) {
      const deviceRegistrationDto = new DeviceRegistrationDto();
      deviceRegistrationDto.id = id;
      deviceRegistrationDto.token = id;
      deviceRegistrationDto.ownerId = ownerId;
      await service.createDeviceRegistration(deviceRegistrationDto);
    }

    return await service.getDeviceRegistration(id);
  };

  const updateDeviceRegistration = React.useCallback(
    async (localDeviceToken: string, ownerId: string) => {
      try {
        const deviceRegistration = await getOrCreateDeviceRegistration(
          localDeviceToken,
          ownerId,
        );
        if (deviceRegistration.ownerId !== ownerId) {
          await new DeviceRegistrationsService().updateDeviceRegistration(
            localDeviceToken,
            deviceRegistration,
            {
              ownerId: ownerId,
            },
            ['ownerId'],
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
          if (!event.localizedDescription.endsWith('simulator')) {
            console.error(event);
          }
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
      if (ownerDashboard.item?.owner.id) {
        updateDeviceRegistration(
          deviceToken,
          ownerDashboard.item.owner.id as string,
        );
      }
    }
  }, [deviceToken, updateDeviceRegistration, ownerDashboard.item?.owner.id]);

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
