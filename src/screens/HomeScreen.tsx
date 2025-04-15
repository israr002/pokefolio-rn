import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from 'theme/theme';
import CustomButton from 'components/CustomButton';
import { useAuth } from 'contexts/AuthContext';
import { APP_CONSTANTS } from 'constants/appConstants';

const HomeScreen = () => {
  const { user, } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING[4],
  },
  welcomeText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text.dark,
    marginBottom: SPACING[8],
    textAlign: 'center',
  },
});

export default HomeScreen; 