import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {TYPOGRAPHY} from 'theme/theme';

type MaskedTextProps = {
  text: string;
  style?: TextStyle;
  colors?: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
};

const MaskedText: React.FC<MaskedTextProps> = ({
  text,
  style,
  colors = [
    'rgba(255, 255, 255, 0.7)',
    'rgba(255, 255, 255, 0.3)',
    'rgba(255, 255, 255, 0)',
  ],
  start = {x: 0, y: 0},
  end = {x: 0, y: 1},
}) => {
  return (
    <MaskedView maskElement={<Text style={[styles.text, style]}>{text}</Text>}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text numberOfLines={1} style={[styles.text, style, {opacity: 0}]}>
          {text}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    textTransform: 'uppercase',
  },
});

export default MaskedText;
