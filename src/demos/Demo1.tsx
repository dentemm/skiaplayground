import React, {useEffect} from 'react';

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
  Turbulence,
  runTiming,
} from '@shopify/react-native-skia';
import {Images} from '../assets/images';
import {useWindowDimensions} from 'react-native';

const ratio = 0.45;

const Demo1: React.FC = () => {
  const image = useImage(Images.hauntedhouse);

  const {width} = useWindowDimensions();

  const fog = useValue(0);
  const focusX = useValue(width / 2);
  const focusY = useValue(100);

  const [reverse, setReverse] = React.useState(false);

  const changePosition = () => {
    runTiming(
      fog,
      reverse ? 0 : 500,
      {
        duration: 12000,
      },
      () => {
        setReverse(v => !v);
      },
    );
  };

  useEffect(() => {
    changePosition();
  }, [reverse]);

  const transformFog = useComputedValue(() => {
    return [
      {
        translateX: fog.current - width / 2,
      },
    ];
  }, [fog]);

  const transformSpotlight = useComputedValue(() => {
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
    <Canvas style={{flex: 1}} onTouch={onTouch}>
      {image && (
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={width * ratio}
          fit={'contain'}
        />
      )}
      <Rect
        x={0}
        y={0}
        width={2 * width}
        height={2 * width * ratio}
        transform={transformFog}>
        <Turbulence freqX={0.01} freqY={0.03} octaves={1.5} />
      </Rect>
      <Rect x={0} y={0} width={width} height={width * 0.7}>
        <RadialGradient
          c={vec(width / 2, width / 2)}
          r={90}
          colors={['rgba(220, 220, 120, 0.1)', 'rgba(30, 30, 20, 0.85)']}
          transform={transformSpotlight}
        />
      </Rect>
    </Canvas>
  );
};

export default Demo1;
