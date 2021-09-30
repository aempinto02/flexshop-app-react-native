import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import api from '../../routes';

export default class ProdutosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });
  
  state = {
    produtos: [],
    catalogo: this.props.navigation.getParam('catalogo')
  }
  
  constructor(props) {
    super(props);
  }
  
  async componentDidMount() {
    await api.get('/produto/catalogo/' + this.state.catalogo.id).then(response => this.setState({produtos: response.data}));
  }
  
  onPressProduto = (item, catalogo) => {
    this.props.navigation.navigate('Produto', { item, catalogo });
  };

  renderProdutos = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressProduto(item, this.state.catalogo)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.foto.url }} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.preco}>R$ {item.preco}</Text>
        <Text style={styles.category}>{this.state.catalogo.titulo}</Text>
        </View>
    </TouchableHighlight>
    );
    
  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.produtos}
          renderItem={this.renderProdutos}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
