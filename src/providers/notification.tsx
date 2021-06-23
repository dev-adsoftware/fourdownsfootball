import React from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

interface Notification {
  configure: () => void;
}

const NotificationContext = React.createContext<Notification | undefined>(
  undefined,
);

type NotificationProviderProps = {
  children: React.ReactNode;
};

function NotificationProvider({ children }: NotificationProviderProps) {
  const configure = () => {
    // PushNotification.configure({
    //   onRegister: (tokenData) => {
    //     const { token } = tokenData;
    //     console.log(`Received notification token: ${token}`);
    //   },
    //   onNotification: (notification) => {
    //     console.log('onNotification:', notification);
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   onRegistrationError: function (err) {
    //     console.error(err.message, err);
    //   },
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
  };

  return (
    <NotificationContext.Provider value={{ configure: configure }}>
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

export { NotificationProvider, useNotification };
