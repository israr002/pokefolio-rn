import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
}) => {

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: COLORS.card.light,
          borderColor: COLORS.border.light,
          borderWidth: 1,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.primary,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: COLORS.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SPACING[2],
          paddingHorizontal: SPACING[3],
        };
      case 'large':
        return {
          paddingVertical: SPACING[4],
          paddingHorizontal: SPACING[6],
        };
      default:
        return {
          paddingVertical: SPACING[3],
          paddingHorizontal: SPACING[4],
        };
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return COLORS.primary;
    if (variant === 'secondary') return COLORS.text.dark;
    return COLORS.text.light;
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: BORDER_RADIUS.base,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.5 : 1,
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    text: {
      fontSize: size === 'small' ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: getTextColor(),
    },
    loading: {
      marginRight: SPACING[2],
    },
    iconContainer: {
      marginRight: SPACING[2],
    },
  });
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <ActivityIndicator
          style={styles.loading}
          color={getTextColor()}
        />
      )}
     {icon && <View style={styles.iconContainer}>{icon}</View>}
           <Text style={styles.text}>{title}</Text> 
    </TouchableOpacity>
  );
};

export default CustomButton; 

