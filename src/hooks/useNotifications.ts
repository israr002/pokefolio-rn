import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import { createNotificationChannel, showLocalNotification } from 'services/notificationService';
import { navigate } from 'services/navigationService';

// Background message handler (must be outside component scope)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM in background:', remoteMessage);
});

export function useNotification() {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const settings = await notifee.requestPermission();
        const authStatus = await messaging().requestPermission();

        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          await messaging().registerDeviceForRemoteMessages();
          const fcmToken = await messaging().getToken();
          console.log('FCM Token:', fcmToken);
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    };

    const createChannel = async () => {
      if (Platform.OS === 'android') {
        await createNotificationChannel();
      }
    };

   

    const unsubscribeOnMessage = messaging().onMessage(async message => {
      console.log('Foreground FCM:', message);
      await showLocalNotification(
        message.notification?.title || '',
        message.notification?.body || '',
        message.data as Record<string, string>
      );
    });

    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          if (detail.notification?.data?.screen === 'PokemonDetail' && detail.notification?.data?.pokemonId) {
            navigate('PokemonDetail', { 
              pokemonId: Number(detail.notification.data.pokemonId) 
            });
          }
          break;
        case EventType.DISMISSED:
          console.log('Notification dismissed:', detail.notification);
          break;
      }
    });

    const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data?.screen === "PokemonDetail" && remoteMessage?.data?.pokemonId) {
        navigate('PokemonDetail', { 
          pokemonId: Number(remoteMessage.data.pokemonId) 
        });
      }
    });

    // const checkInitialNotification = async () => {
    //   const initialNotification = await messaging().getInitialNotification();
    //   if (initialNotification) {
    //     console.log('Notification caused app to open from quit state:', initialNotification);
    //     if (initialNotification?.data) {
    //       console.log("====>in",initialNotification?.data)
    //       const { screen, pokemonId} = initialNotification?.data;
    //       console.log("====>in",screen,pokemonId)
    //       switch (screen) {
    //         case "PokemonDetail":
    //           console.log("====>in switch",screen,pokemonId)
    //           navigate('PokemonDetail', { 
    //             pokemonId: Number(pokemonId) 
    //           });
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //     // You can navigate to a specific screen or perform actions here based on the notification data
    //   }
    // };

    requestPermission();
    createChannel();

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotifee();
      unsubscribeNotificationOpenedApp();
    };
  }, []);

  
}
