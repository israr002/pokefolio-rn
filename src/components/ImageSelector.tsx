import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  View,
  ActivityIndicator,
  ImageStyle,
  Platform,
  Linking,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {Icon} from './Icon';
import {requestPermission} from 'utils/permissions';
import {COLORS} from '../theme/theme';
import {PERMISSIONS} from 'react-native-permissions';

interface ImageSelectorProps {
  imageUri?: string;
  onImageSelected: (uri: string) => void;
  size?: number;
  iconSize?: number;
  isLoading?: boolean;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  imageUri,
  onImageSelected,
  size = 120,
  iconSize = 40,
  isLoading = false,
}) => {
  const showImageSourceOptions = () => {
    Alert.alert(
      'Select Profile Picture',
      'Choose how you want to add your profile picture',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Take Photo',
          onPress: () => openCamera(),
        },
        {
          text: 'Choose from Gallery',
          onPress: () => openGallery(),
        },
      ],
    );
  };

  const options: ImagePicker.CameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 500,
    maxHeight: 500,
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  const openGallery = async () => {
    try {
      const isStoragePermitted = await requestPermission(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : (Platform.Version as number) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      
      if (!isStoragePermitted) {
        Alert.alert(
          'Permission Required',
          'Please grant photo library access to select a profile picture',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: openSettings,
            },
          ],
        );
        return;
      }

      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Error', 'Gallery access is not available on this device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert(
            'Permission Required',
            'Please grant photo library access in your device settings',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: openSettings,
              },
            ],
          );
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert('Error', response.errorMessage || 'An unexpected error occurred');
          return;
        }
        if (response.assets && response.assets[0]) {
          onImageSelected(response.assets[0].uri as string);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to access gallery. Please try again.');
    }
  };

  const openCamera = async () => {
    try {
      const isCameraPermitted = await requestPermission(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );

      if (!isCameraPermitted) {
        Alert.alert(
          'Permission Required',
          'Please grant camera access to take a profile picture',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: openSettings,
            },
          ],
        );
        return;
      }

      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Error', 'Camera is not available on this device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert(
            'Permission Required',
            'Please grant camera access in your device settings',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: openSettings,
              },
            ],
          );
          return;
        } else if (response.errorCode === 'others') {
          Alert.alert('Error', response.errorMessage || 'An unexpected error occurred');
          return;
        }
        if (response.assets && response.assets[0]) {
          onImageSelected(response.assets[0].uri as string);
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to access camera. Please try again.');
    }
  };

  const backgroundColor =
    typeof COLORS.background === 'string'
      ? COLORS.background
      : COLORS.background.light;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor,
          borderColor: COLORS.primary,
        },
      ]}
      onPress={showImageSourceOptions}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : imageUri ? (
        <Image source={{uri: imageUri}} style={styles.image as ImageStyle} />
      ) : (
        <View style={styles.iconContainer}>
          <Icon name="camera-plus" width={iconSize} height={iconSize} fill={COLORS.text.gray} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
