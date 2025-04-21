import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from 'theme/theme';
import { useAuth } from 'contexts/AuthContext';
import { getInitials } from 'utils/getInitials';
import Icon from './Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LogoutModal } from './LogoutModal';
import { APP_CONSTANTS } from 'constants/appConstants';

interface HeaderProps {
  onLogout: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onLogout();
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalVisible(false);
    }
  };

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top }]} >
        <ImageBackground
          source={require('assets/images/pokeball.png')}
          style={styles.headerBackground}
          imageStyle={styles.headerImage}>
          <View style={styles.headerContent}>
            <View style={styles.leftContent}>
              <View style={styles.avatarWrapper}>
                {user?.photoURL ? (
                  <Image
                    source={{uri: user.photoURL}}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarInitials}>
                      {getInitials(user?.displayName)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.textContent}>
                <Text style={styles.greeting}>{APP_CONSTANTS.WELCOME}</Text>
                <Text style={styles.userName}>{user?.displayName || 'Trainer'}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={() => setIsLogoutModalVisible(true)}
              activeOpacity={0.7}
            >
              <Icon name="logout" size={22} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <LogoutModal
        isVisible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}
        onLogout={handleLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: SPACING[7],
    paddingBottom: SPACING[4],
  },
  headerBackground: {
    paddingHorizontal: SPACING[5],
    paddingTop: SPACING[2],
  },
  headerImage: {
    resizeMode: 'contain',
    opacity: 0.09,
    tintColor: COLORS.white,
    position: 'absolute',
    top: -SPACING[4],
    right: -SPACING[8],
    width: 220,
    height: 220,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING[3],
  },
  textContent: {
    marginLeft: SPACING[2],
  },
  greeting: {
    color: COLORS.white ,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING[1],
  },
  userName: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: BORDER_RADIUS.full,
    padding: SPACING[1],
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: BORDER_RADIUS.full,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  logoutButton: {
    backgroundColor: COLORS.white + '1A',
    padding: SPACING[2],
    borderRadius: BORDER_RADIUS.base,
    borderWidth: 1,
    borderColor: COLORS.white + '33',
  },
});

export default Header; 
