import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';


export const showLocalNotification = async (title: string, body: string, data?: Record<string, string>) => {
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        pressAction: { id: 'default' },
        sound: 'default',
        smallIcon: 'ic_launcher',
      },
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
      data,
    });
  };

  export const createNotificationChannel = async () => {
    await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
        badge: true,
      });
  }