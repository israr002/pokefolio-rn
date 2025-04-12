import React from 'react';
import {SvgProps} from 'react-native-svg';

// Import all SVG icons
import GoogleIcon from 'assets/icons/google-signin.svg';

// Define the icon names as a union type for type safety
export type IconName = 'google-signin';

// Map icon names to their components
const iconMap: Record<IconName, React.FC<SvgProps>> = {
  'google-signin': GoogleIcon,
};

interface IconProps extends SvgProps {
  name: IconName;
  width?: number;
  height?: number;
  fill?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  fill,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={width}
      height={height}
      fill={fill}
      {...props}
    />
  );
}; 
