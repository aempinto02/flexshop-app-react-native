import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimatedLottieView from 'lottie-react-native';

import { StatusBar, Modal, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from '../../routes';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class SignIn extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
    username: '',
    password: '',
    error: '',
    produtos: {}
  };

  handleEmailChange = (username) => {
    this.setState({ username });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('CreateAccount');
  };

  handleSignInPress = async () => {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      this.setState({ loading: true });
      try {
        var response = await api.post('/login', {
          username: this.state.username,
          password: this.state.password,
        });

        AsyncStorage.setItem('token', JSON.stringify(response.headers.authorization));

        const objeto = await AsyncStorage.getItem('token');
        const token = JSON.parse(objeto);

        this.setState({ loading: false });
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Catalogos' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        console.log(_err);
        this.setState({ loading: false });
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais ou internet!' }, () => false);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.loading}
          onRequestClose={() => {
            this.setState({ loading: !this.state.loading });
          }}
        >
          <AnimatedLottieView
            source={require("../../../assets/loading.json")}
            loop
            autoPlay
          />
        </Modal>

        <StatusBar hidden />
        <Logo source={require('../../../assets/splash.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
};
