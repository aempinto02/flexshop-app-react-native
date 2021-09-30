import React, { ReactDOM } from 'react';
import {
  FlatList,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import PagamentoButton from '../../components/PagamentoButton/PagamentoButton';
import CatalogoButton from '../../components/CatalogoButton/CatalogoButton';
import EsvaziarButton from '../../components/EsvaziarButton/EsvaziarButton';
import styles from './styles';
import { NavigationEvents } from 'react-navigation';
import { SegmentedControls } from 'react-native-radio-buttons';
import AnimatedLottieView from 'lottie-react-native';
import { ErrorMessage } from '../Auth/styles';
import stylesModal from './stylesModal';
import stylesScroll from './stylesScroll';
import stylesFooter from './stylesFooter';
import MenuImage from '../../components/MenuImage/MenuImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../routes';

export default class CarrinhoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Carrinho',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  state = {
    carrinho: {},
    loading: true,
    options: [
      {
        label: 'Dinheiro',
        value: 1
      },
      {
        label: 'Cartão de Crédito',
        value: 2
      },
      {
        label: 'Cartão de Débito',
        value: 3
      },
      {
        label: 'PIX',
        value: 4
      },
    ],
    produtoVisible: false,
    esvaziarVisible: false,
    isVisible: false,
    selectedOption: undefined,
    itemExcluir: undefined,
    error0: '',
    error1: '',
    error2: '',
    valorTotalCarrinho: 0
  }

  async componentDidMount() {
    const objeto = await AsyncStorage.getItem('token');
    const token = JSON.parse(objeto);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    try {

      await api.get('/carrinho', options).then(response => this.setState({ carrinho: response.data }));
    } catch (error) {
      console.log('Deu erro ao pegar o carrinho!');
    }
    this.setState({ loading: false });
  }

  updateCarrinho = async () => {
    var token;
    AsyncStorage.getItem('token').then(response => { token = JSON.parse(objeto) });

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    try {
      await api.get('/carrinho', options).then(response => {
        if (Object.keys(this.state.carrinho).length === 0) {
          this.setState({ carrinho: response.data })
        } else if (JSON.stringify(response.data) !== JSON.stringify(this.state.carrinho)) {
          this.setState({ carrinho: response.data });
        }
      });
    } catch (error) {
      return (<ErrorMessage>Erro ao atualizar o carrinho</ErrorMessage>);
    }
    this.setState({ loading: false });
  }

  setIsVisible = (visible) => this.setState({ isVisible: visible });

  constructor(props) {
    super(props);
    this.updateCarrinho();
  }

  setSelectedOption = (selectedOption) => {
    this.setState({ selectedOption });
  }

  renderOption = (option, selected, onSelect, index) => {
    const style = selected ? { fontWeight: 'bold' } : {};
    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

  excluirItem = async (item) => {
    this.setState({ loading: true });
    const objeto = await AsyncStorage.getItem('token');
    const token = JSON.parse(objeto);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    try {
      await api.post('/carrinho/', { produtoId: item.produto.id, unidades: 0 }, options).then(response => this.setState({ carrinho: response.data }));
    } catch (err) {
      this.setState({ error0: 'Não foi possível fechar seu pedido! Tente novamente!' }, () => false);
    }
    this.setState({ produtoVisible: false });
    this.setState({ loading: false });
  }

  modalExcluir = (item) => {
    this.setState({ produtoVisible: true });
    this.setState({ itemExcluir: item });
  }

  fecharCompra = async () => {
    this.setState({ loading: true });
    const objeto = await AsyncStorage.getItem('token');
    const token = JSON.parse(objeto);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    try {
      await api.post('/pagamento/' + this.state.selectedOption.value, {}, options);
      await api.get('/carrinho', options).then(response => this.setState({ carrinho: response.data }));
    } catch (err) {
      this.setState({ error0: 'Não foi possível fechar seu pedido! Tente novamente!' }, () => false);
    }
    this.setIsVisible(false);
    this.setState({ loading: false });
    this.props.navigation.navigate('PedidoFeito');
  };

  renderItens = ({ item }) => {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.modalExcluir(item)}>
        <View style={styles.lista}>
          <View style={styles.itemLista}>
            <Image style={styles.categoriesPhoto} source={{ uri: item.produto.foto.url }} />
            <View style={styles.itemLinha}>
              <Text style={styles.infoTitle}>{item.produto.titulo}</Text>
              <Text style={styles.infoTitle1}>{item.unidades} unidades</Text>
              <Text style={styles.infoTitle2}>Pressione este item para excluir</Text>
              <View style={styles.infoContainer}>
                <Image style={styles.infoPhoto} source={require('../../../assets/icons/money.png')} />
                <Text style={styles.infoRecipe}>Preço unitário: R$ {item.produto.preco} </Text>
              </View>
              <View style={styles.infoContainer}>
                <Image style={styles.infoPhoto} source={require('../../../assets/icons/total.png')} />
                <Text style={styles.infoRecipe}>Valor total deste item: R$ {(item.produto.preco * item.unidades).toFixed(2)} </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  handleFinalizar = () => {
    if (typeof this.state.selectedOption !== 'undefined') {
      if (typeof this.state.selectedOption.value === 'number') {
        this.setIsVisible(!this.state.isVisible);
      }
    } else {
      this.setState({ error1: 'Selecione uma forma de pagamento!' }, () => false);
    }
  }

  handleEsvaziar = () => {
    this.setState({ esvaziarVisible: false });
    this.esvaziarCarrinho();
  }

  esvaziarCarrinho = async () => {
    this.setState({ loading: true });
    try {
      const objeto = await AsyncStorage.getItem('token');
      const token = JSON.parse(objeto);

      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      api.post('/carrinho/novo', {}, options).then(response => this.setState({ carrinho: response.data }));
    } catch (error) {
      return (<ErrorMessage>Não foi possível esvaziar o carrinho! Verifique internet e tente novamente!</ErrorMessage>)
    }
    this.setState({ selectedOption: undefined });
  };

  renderFooter = () =>
  (
    <View style={stylesFooter.container}>
      <View style={stylesFooter.infoRecipeContainer}>
        <Text style={stylesFooter.infoRecipeName}>Faça seu pedido!</Text>
        <Text style={stylesFooter.infoDescriptionRecipe}>Confira com atenção os dados</Text>

        <View style={stylesFooter.infoContainer}>
          <Image style={stylesFooter.infoPhoto} source={require('../../../assets/icons/pagamento.png')} />
          <Text style={stylesFooter.infoRecipe}>Valor total do carrinho: R$ {this.state.carrinho.valorTotal.toFixed(2)}</Text>
        </View>

        <View style={stylesFooter.infoContainerFormaPagamento}>
          <SegmentedControls style={stylesFooter.segmentedOptions}
            options={this.state.options}
            onSelection={this.setSelectedOption.bind(this)}
            selectedOption={this.state.selectedOption}
            extractText={(option) => option.label}
          />
        </View>

        <View style={stylesScroll.infoContainer}>
          <PagamentoButton onPress={() => this.handleFinalizar()} />
        </View>
        {this.state.error1.length !== 0 && <ErrorMessage>{this.state.error1}</ErrorMessage>}

        <View style={stylesScroll.infoContainer}>
          <EsvaziarButton onPress={() => this.setState({ esvaziarVisible: true })} />
        </View>
      </View>
    </View>
  );

  render() {
    const { isVisible } = this.state;
    if (this.state.carrinho.hasOwnProperty('valorTotal')) {
      if (this.state.carrinho.valorTotal !== 0) {
        return (
          <SafeAreaView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.esvaziarVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setModalVisible(!this.state.esvaziarVisible);
              }}
            >
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  {this.state.error2.length !== 0 && <ErrorMessage>{this.state.error2}</ErrorMessage>}
                  <Text style={stylesModal.modalText}>Deseja excluir este carrinho?</Text>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonOpen]}
                    onPress={() => this.handleEsvaziar()}
                  >
                    <Text style={stylesModal.textStyle}>Sim</Text>
                  </Pressable>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonClose]}
                    onPress={() => this.setState({ esvaziarVisible: false })}
                  >
                    <Text style={stylesModal.textStyle}>Não</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.produtoVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setModalVisible(!this.state.produtoVisible);
              }}
            >
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  {this.state.error2.length !== 0 && <ErrorMessage>{this.state.error2}</ErrorMessage>}
                  <Text style={stylesModal.modalText}>Deseja excluir este item do carrinho?</Text>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonOpen]}
                    onPress={() => this.excluirItem(this.state.itemExcluir)}
                  >
                    <Text style={stylesModal.textStyle}>Sim</Text>
                  </Pressable>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonClose]}
                    onPress={() => this.setState({ produtoVisible: false })}
                  >
                    <Text style={stylesModal.textStyle}>Não</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.loading}
              onRequestClose={() => {
                this.setModalVisible(!this.state.loading);
              }}
            >
              <AnimatedLottieView
                source={require("../../../assets/loading.json")}
                loop
                autoPlay
              />
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isVisible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                this.setModalVisible(!isVisible);
              }}
            >
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  {this.state.error0.length !== 0 && <ErrorMessage>{this.state.error0}</ErrorMessage>}
                  <Text style={stylesModal.modalText}>Deseja realmente finalizar a compra?</Text>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonOpen]}
                    onPress={() => this.fecharCompra()}
                  >
                    <Text style={stylesModal.textStyle}>Sim</Text>
                  </Pressable>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonClose]}
                    onPress={() => this.setIsVisible(false)}
                  >
                    <Text style={stylesModal.textStyle}>Não</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <SafeAreaView style={styles.categoriesInfo}>
              <FlatList
                data={this.state.carrinho.itens}
                renderItem={this.renderItens}
                keyExtractor={item => `${item.id}`}
                ListFooterComponent={this.renderFooter}
              />
            </SafeAreaView>
          </SafeAreaView>
        )
      } else {
        return (
          <ScrollView style={stylesScroll.container}>
            <View style={stylesScroll.infoRecipeContainer}>
              <Image style={stylesScroll.photo} source={require('../../../assets/icons/cart.png')} />
            </View>
            <View style={stylesScroll.infoRecipeContainer}>
              <Text style={stylesScroll.infoRecipeName}>Seu carrinho está vazio!</Text>
              <View style={stylesScroll.infoContainer}>
                <TouchableHighlight>
                  <Text style={stylesScroll.category}>Insira pelo menos um produto no carrinho</Text>
                </TouchableHighlight>
              </View>

              <View style={stylesScroll.infoContainer}>
                <Text style={stylesScroll.infoRecipe}> Para isso retorne aos catálogos </Text>
              </View>

              <View style={stylesScroll.infoContainer}>
                <CatalogoButton onPress={() => this.props.navigation.navigate('Catalogos')} />
              </View>
            </View>
          </ScrollView>
        )
      }
    }
    this.updateCarrinho();
    return (
      <AnimatedLottieView
        source={require("../../../assets/loading.json")}
        loop
        autoPlay
      />
    )
  }
};