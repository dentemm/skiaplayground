import React from 'react';

import {
  Canvas,
  Image,
  useImage,
  Rect,
  RadialGradient,
  vec,
  Text,
  useTouchHandler,
  useValue,
  useComputedValue,
  RoundedRect,
  rrect,
  Shadow,
  BoxShadow,
  LinearGradient,
  rect,
} from '@shopify/react-native-skia';
import {Images} from '../assets/images';
import {Animated, Pressable, useWindowDimensions} from 'react-native';
import {useShadowAnimation} from './hooks';
import {wait} from './utils';

const Demo2: React.FC = () => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const {width} = useWindowDimensions();

  const {radius, radiusInverted, blur, toggle} = useShadowAnimation(4, 1, 3, 1);

  const animateScale = () => {
    const zoomOut = Animated.timing(scale, {
      duration: 250,
      toValue: 0.96,
      useNativeDriver: true,
    });

    const zoomIn = Animated.timing(scale, {
      duration: 250,
      delay: 250,
      toValue: 1,
      useNativeDriver: true,
    });

    Animated.sequence([zoomOut, zoomIn]).start();
  };

  const aRect = rect(50, 50, width - 100, 100);
  const roundedRect = rrect(aRect, 15, 15);

  const onPress = async () => {
    animateScale();
    toggle();
    await wait(250);
    //  onSelect();
    await wait(250);
    console.log('toggle 2');
    toggle();
    // setToggled(false);
  };

  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      <Canvas style={{flex: 1, backgroundColor: 'lightgreen', height: '100%'}}>
        <RoundedRect rect={roundedRect} color={'lightgreen'}>
          <Shadow
            dx={radius}
            dy={radius}
            blur={blur}
            color="rgba(40, 40, 40, 0.9)"
          />
          <Shadow
            dx={radiusInverted}
            dy={radiusInverted}
            blur={blur}
            color="rgba(255, 255, 255, 0.9)"
          />
        </RoundedRect>
      </Canvas>
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Text
          style={[
            {
              color: '#fff',
              fontSize: 40,
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}>
          {'text'}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default Demo2;
