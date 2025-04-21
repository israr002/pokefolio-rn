import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING } from 'theme/theme';
import { getFooterState, setFooterState } from 'utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Footer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('catch');
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const state = getFooterState();
    setSelectedTab(state);
  }, []);

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    setFooterState(tab);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'catch' && styles.selectedTab]}
        onPress={() => handleTabPress('catch')}
      >
        <Text style={[styles.tabText, selectedTab === 'catch' && styles.selectedText]}>
          Catch
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'team' && styles.selectedTab]}
        onPress={() => handleTabPress('team')}
      >
        <Text style={[styles.tabText, selectedTab === 'team' && styles.selectedText]}>
          Team
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, selectedTab === 'settings' && styles.selectedTab]}
        onPress={() => handleTabPress('settings')}
      >
        <Text style={[styles.tabText, selectedTab === 'settings' && styles.selectedText]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: COLORS.white,
    borderTopWidth: 0.5,  // Thinner border
    borderTopColor: COLORS.gray,  // Slightly lighter gray for a soft look // Rounded top corners
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,  // Light shadow for a subtle lift effect
    shadowRadius: 5,
    paddingBottom: SPACING[2],
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING[2],
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  selectedText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Footer;
