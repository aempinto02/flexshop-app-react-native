import React from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight
} from 'react-native';
import { ErrorMessage } from './styles';
import AnimatedLottieView from 'lottie-react-native';
import styles from './styles';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import api from '../../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class ProdutoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  state = {
    activeSlide: 0,
    produto: this.props.navigation.getParam('item'),
    catalogo: this.props.navigation.getParam('catalogo'),
    unidades: undefined,
    valorTotal: 0.0,
    carrinho: [],
    error: '',
    isVisible: false
  }

  constructor(props) {
    super(props);
  }

  setIsVisible = (visible) => {
    this.setState({ isVisible: visible });
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.foto.url }} />
      </View>
    </TouchableHighlight>
  );

  onChangeNumber = unidades => {
    this.setState({ unidades });
    valorTotal => this.setState({ valorTotal });
  };

  inserirNoCarrinho = async () => {
    if (typeof this.state.unidades === 'undefined' || this.state.unidades === '') {
      this.setState({ error: 'Digite quantas unidades quer! Digite 0(Zero) para excluir do carrinho!' }, () => false);
    } else {
      const unidades = Number(this.state.unidades);
      this.setIsVisible(true);
      const itemStr = JSON.stringify({
        "produtoId": this.state.produto.id,
        "unidades": unidades,
      });
      this.setState({ unidades: undefined });

      const objeto = await AsyncStorage.getItem('token');
      const token = JSON.parse(objeto);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      try {
        await api.post('/carrinho', itemStr, options);
      } catch (err) {
        console.log('ERROR:' + err.message);
      }

      this.setState({ isVisible: false });
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Carrinho' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    const produto = this.state.produto;
    const catalogo = this.state.catalogo;
    const foto = produto.foto.url;
    const title = produto.titulo;

    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.isVisible);
            }}
          >
            <AnimatedLottieView
              source={require("../../../assets/loading.json")}
              loop
              autoPlay
            />
          </Modal>

          <Image style={styles.photo} source={{ uri: foto }} />
          <View style={styles.infoRecipeContainer}>
            <Text style={styles.infoRecipeName}>{title}</Text>
            <Text style={styles.infoDescriptionRecipe}>{produto.descricao}</Text>
            <View style={styles.infoContainer}>
              <TouchableHighlight>
                <Text style={styles.category}>{catalogo.nome.toUpperCase()}</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.infoContainer}>
              <Image style={styles.infoPhoto} source={require('../../../assets/icons/money.png')} />
              <Text style={styles.infoRecipe}>R$ {produto.preco.toFixed(2)} </Text>
            </View>

            <View style={styles.infoContainer}>
              <Image style={styles.infoPhoto} source={require('../../../assets/icons/total.png')} />
              <Text style={styles.infoRecipe}>Valor total: R$ {this.state.valorTotal.toFixed(2)} </Text>
            </View>

            <TextInput
              style={styles.input}
              onChangeText={unidades => {
                this.setState({ unidades },
                  unidades => this.setState)
                this.state.valorTotal = unidades * produto.preco;
              }
              }
              value={this.state.unidades}
              placeholder="Unidades de produto desejada"
              keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            />
            {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
            <View style={styles.infoContainer}>
              <ViewIngredientsButton onPress={() => { this.inserirNoCarrinho() }} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}
