import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimatedLottieView from 'lottie-react-native';

import { StatusBar, Modal, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from '../../routes';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
} from './styles';

export default class SignUp extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    loading: false,
    nome: '',
    email: '',
    endereco: '',
    senha: '',
    error: '',
    success: '',
  };

  handleNomeChange = (nome) => {
    this.setState({ nome });
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handleEnderecoChange = (endereco) => {
    this.setState({ endereco });
  };

  handlePasswordChange = (senha) => {
    this.setState({ senha });
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      this.setState({ loading: false });
      try {
        await api.post('/conta', {
          nome: this.state.nome,
          email: this.state.email,
          endereco: this.state.endereco,
          senha: this.state.senha,
          tipo: 1
        });
        this.setState({ loading: false });
        this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });

        setTimeout(this.goToLogin, 2000);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos ou sua conexão de internet!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Auth' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          {/* <Logo source={require('../../images/airbnb_logo.png')} resizeMode="contain" /> */}
          {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
          <Input style={stylesKey.firstInput}
            placeholder="Nome do usuário"
            value={this.state.nome}
            onChangeText={this.handleNomeChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="E-mail"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Endereço"
            value={this.state.endereco}
            onChangeText={this.handleEnderecoChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Senha"
            value={this.state.senha}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
          <Button onPress={this.handleSignUpPress}>
            <ButtonText>Criar conta</ButtonText>
          </Button>
          <SignInLink onPress={this.handleBackToLoginPress}>
            <SignInLinkText>Voltar ao login</SignInLinkText>
          </SignInLink>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
};

const stylesKey = StyleSheet.create({
  firstInput: {
    marginTop: 170,
  }
});