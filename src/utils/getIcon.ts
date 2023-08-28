import * as icons from '@phosphor-icons/react';

export default function getIcon(iconName: string) {
  const isValidIcon = Object.keys(icons).includes(iconName);
  let IconComponent = icons['Rectangle'];

  if (isValidIcon) {
    // @ts-ignore
    IconComponent = icons[iconName];
  }

  return IconComponent;
}
