import React, {useCallback} from 'react';
import {useTiming} from '@shopify/react-native-skia';

export const useShadowAnimation = (
  radiusStart: number,
  radiusEnd: number,
  blurStart: number,
  blurEnd: number,
) => {
  const [toggled, setIsToggled] = React.useState(false);

  const radius = useTiming(toggled ? radiusEnd : radiusStart, {
    duration: 250,
  });
  const radiusInverted = useTiming(toggled ? -radiusEnd : -radiusStart, {
    duration: 250,
  });
  const blur = useTiming(toggled ? blurEnd : blurStart, {duration: 250});

  const toggle = useCallback(() => {
    setIsToggled(state => {
      return !state;
    });
  }, []);

  return {
    radius,
    radiusInverted,
    blur,
    toggle,
  };
};
