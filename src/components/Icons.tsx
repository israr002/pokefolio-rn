import React from 'react';
import Svg, { Path } from 'react-native-svg';

type IconName = 'logout';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#000000' 
}) => {
  const icons: Record<IconName, React.ReactElement> = {
    logout: (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
          fill={color}
        />
      </Svg>
    ),
    // Add other icons here following the same pattern
  };

  return icons[name] || null;
};

export default Icon; 