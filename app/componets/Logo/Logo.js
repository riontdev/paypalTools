import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Keyboard, Animated, Platform, StyleSheet, Easing } from 'react-native';
 
import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';
    this.keyboardDidShowListener = Keyboard.addListener(
      `keyboard${name}Show`,
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      this.keyboardWillHide,
    );
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardWillShow = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.spinValue,
      {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.linear
      }),
    ]).start();
  };

  keyboardWillHide = () => {
    this.setState({ spinValue: new Animated.Value(0) });
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };
  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const containerImageStyles = [
      styles.containerImage,
      { 
        width: this.state.containerImageWidth,
        height: this.state.containerImageWidth
      },
    ];
    const imageStyles = [
      styles.logo,
      { 
        width: this.state.imageWidth,
        height: this.state.containerImageWidth,
        transform: [{rotate: spin}],
       },
      this.props.tintColor ? { tintColor: this.props.tintColor } : null,
    ];

    return (
      <View style={styles.container}>
        <Animated.Image
          resizeMode="contain"
          style={containerImageStyles}
          source={require('./images/background.png')}
        >
          
        </Animated.Image>
        <Animated.Image
            resizeMode="contain"
            style={imageStyles}
            source={require('./images/logo.png')}
          />
        <Text style={styles.text}>Dolar Today</Text>
      </View>
    );
  }
}

export default Logo;