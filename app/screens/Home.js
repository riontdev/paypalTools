import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView, Text } from 'react-native';
import Numeral from 'numeral'; 

import { Container } from '../componets/Container';
import { Logo } from '../componets/Logo';
import { InputWithButton } from '../componets/TextInput';

const TEMP_BASE_CURRENSY = 'USD';
const TEMP_FEED_CURRENSY = 'BSF';
const TEMP_BASE_PRICE = '1';
const TEMP_QUOTE_PRICE = '320.000';
// create a component
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: TEMP_QUOTE_PRICE,
      total: 0,
    };
  }

  componentWillMount() {
    fetch('https://s3.amazonaws.com/dolartoday/data.json')
      .then(response => response.json())
      .then((res) => {
        this.setState({ quote: res.USD.bitcoin_ref, total: (res.USD.bitcoin_ref - 40000) });
      });
  }

  handledPressBaseCurrency = () => {

  }

  handledPressQuoteCurrency = () => {

  }

  changeBaseText = (text) => {
    const total = parseFloat(text) * (this.state.quote - 40000);
    if (!isNaN(total)) {
      this.setState({ total });
    } else {
      this.setState({ total: 0 });
    }
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding">
          <Logo />
          <InputWithButton
            onPress={this.handledPressBaseCurrency}
            buttonText={TEMP_BASE_CURRENSY}
            keyboardType="numeric"
            defaultValue={TEMP_BASE_PRICE}
            onChangeText={text => this.changeBaseText(text)}
          />
          <InputWithButton
            onPress={this.handledPressQuoteCurrency}
            buttonText={TEMP_FEED_CURRENSY}
            editable={false}
            defaultValue={Numeral(this.state.total).format('0,0.00')}
          />
        </KeyboardAvoidingView>
        <Text style={{ color: 'white' }}> 1 USD = {Numeral(this.state.quote).format('0,0.00')} BSF</Text>
      </Container>
    );
  }
}

// make this component available to the app
export default Home;

