import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { useAuth } from 'contexts/AuthContext';
import { getInitials } from 'utils/getInitials';
import Icon from './Icons';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <View style={styles.header}>
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
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.displayName || 'Trainer'}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <Icon name="logout" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: SPACING[7],
    paddingBottom: SPACING[4],

  },
  headerBackground: {
    paddingHorizontal: 20,
    paddingTop: 7,
  },
  headerImage: {
    resizeMode: 'contain',
    opacity: 0.1,
    position: 'absolute',
    top: -18,
    right: -30,
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
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: '700',
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 50,
    padding: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },
  avatarFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: SPACING[2],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default Header; 