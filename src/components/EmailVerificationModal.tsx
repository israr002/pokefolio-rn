import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Linking } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from 'theme/theme';
import CustomButton from './CustomButton';
import { Icon } from './Icon';
import { APP_CONSTANTS } from 'constants/appConstants';

interface EmailVerificationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onResendEmail: () => void;
  email: string;
  isResending?: boolean;
  isEmailSent?: boolean;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isVisible,
  onClose,
  onResendEmail,
  email,
  isResending = false,
  isEmailSent = false,
}) => {
  const handleCheckInbox = () => {
    Linking.openURL('message://');
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{APP_CONSTANTS.VERIFY_EMAIL_TITLE}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" width={24} height={24} stroke={COLORS.gray[500]} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.message}>
            {isEmailSent 
              ? APP_CONSTANTS.VERIFY_EMAIL_SUCCESS
              : APP_CONSTANTS.VERIFY_EMAIL_MESSAGE.replace('{email}', email)}
          </Text>

          <View style={styles.buttonContainer}>
            {!isEmailSent ? (
              <CustomButton
                title={isResending ? 'Sending...' : APP_CONSTANTS.RESEND_EMAIL_BUTTON}
                onPress={onResendEmail}
                variant="primary"
                isLoading={isResending}
                disabled={isResending}
              />
            ) : (
              <CustomButton
                title={APP_CONSTANTS.CHECK_INBOX_BUTTON}
                onPress={handleCheckInbox}
                variant="primary"
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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