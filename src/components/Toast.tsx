import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onHide,
}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  }, [duration, onHide]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return COLORS.status.success;
      case 'error':
        return COLORS.status.errorLight;
      case 'info':
        return COLORS.status.info;
      default:
        return COLORS.status.info;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'error':
        return COLORS.text.error;
      default:
        return COLORS.white;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          backgroundColor: getBackgroundColor(),
        },
      ]}>
      <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: SPACING[8],
    left: SPACING[4],
    right: SPACING[4],
    padding: SPACING[3],
    borderRadius: BORDER_RADIUS.base,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  message: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    textAlign: 'center',
  },
});

export default Toast; 