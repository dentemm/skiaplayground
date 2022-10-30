import React from 'react';

import {
  Canvas,
  Image,
  useImage,
  Rect,
  RadialGradient,
  vec,
  useTouchHandler,
  useValue,
  useComputedValue,
} from '@shopify/react-native-skia';
import {Images} from '../assets/images';
import {useWindowDimensions} from 'react-native';

const Demo1: React.FC = () => {
  const image = useImage(Images.hauntedhouse);

  const {width} = useWindowDimensions();

  const focusX = useValue(width / 2);
  const focusY = useValue(width / 2);

  const transform2 = useComputedValue(() => {
    return [
      {
        translateX: focusX.current - width / 2,
      },
      {
        translateY: focusY.current - width / 2,
      },
    ];
  }, [focusX, focusY]);

  const onTouch = useTouchHandler({
    onActive({x, y}) {
      focusX.current = x;
      focusY.current = y;
    },
  });

  return (
    <Canvas style={{flex: 1, backgroundColor: 'lightgreen'}} onTouch={onTouch}>
      {image && (
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={width * 0.7}
          fit={'cover'}
        />
      )}
      <Rect x={0} y={0} width={width} height={width * 0.7}>
        <RadialGradient
          c={vec(width / 2, width / 2)}
          r={70}
          colors={['rgba(220, 220, 120, 0.1)', 'rgba(30, 30, 20, 0.85)']}
          transform={transform2}
        />
      </Rect>
    </Canvas>
  );
};

export default Demo1;
