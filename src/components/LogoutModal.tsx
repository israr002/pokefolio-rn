import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import CustomButton from './CustomButton';
import { Icon } from './Icon';
import { APP_CONSTANTS } from 'constants/appConstants';

interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
  isLoading?: boolean;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isVisible,
  onClose,
  onLogout,
  isLoading = false,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Logout</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" width={24} height={24} stroke={COLORS.gray[500]} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.message}>
            Are you sure you want to logout?
          </Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Cancel"
              onPress={onClose}
              variant="secondary"
            />
            <CustomButton
              title={isLoading ? 'Logging out...' : APP_CONSTANTS.LOGOUT_BUTTON}
              onPress={onLogout}
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.black + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING[6],
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING[4],
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  closeButton: {
    padding: SPACING[2],
  },
  message: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    marginBottom: SPACING[6],
    lineHeight: 24,
  },
  buttonContainer: {
    gap: SPACING[3],
  },
}); 