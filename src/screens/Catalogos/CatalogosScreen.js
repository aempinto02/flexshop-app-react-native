import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import MenuImage from '../../components/MenuImage/MenuImage';
import api from '../../routes';

export default class CatalogosScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Catálogos',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  state = {
    catalogos: []
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    api.get('/catalogo').then(response => this.setState({catalogos: response.data}));
  }

  onPressCatalogo = item => {
    const catalogo = item;
    const title = item.nome;
    this.props.navigation.navigate('Produtos', { catalogo, title });
  };

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCatalogo(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.foto.url }} />
        <Text style={styles.categoriesName}>{item.nome}</Text>
        <Text style={styles.categoriesInfo}>{item.quantidadeProdutos} produtos</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.state.catalogos}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
