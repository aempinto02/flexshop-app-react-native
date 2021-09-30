import { LogBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/CreateAccount/SignUp';
import CatalogosScreen from '../screens/Catalogos/CatalogosScreen';
import CarrinhoScreen from '../screens/Carrinho/CarrinhoScreen';
import ProdutosScreen from '../screens/Produtos/ProdutosScreen';
import ProdutoScreen from '../screens/Produto/ProdutoScreen';
import PedidoFeitoScreen from '../screens/PedidoFeito/PedidoFeito';

const MainNavigator = createStackNavigator(
  {
    Auth: SignIn,
    Carrinho: CarrinhoScreen,
    Catalogos: CatalogosScreen,
    CreateAccount: SignUp,
    PedidoFeito: PedidoFeitoScreen,
    Produtos: ProdutosScreen,
    Produto: ProdutoScreen,
  },
  {
    initialRouteName: 'Auth',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

export default AppContainer = createAppContainer(DrawerStack);

LogBox.ignoreAllLogs(true);