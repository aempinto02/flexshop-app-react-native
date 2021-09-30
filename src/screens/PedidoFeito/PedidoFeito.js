import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight,
    Alert,
} from 'react-native';
import CatalogoButton from '../../components/CatalogoButton/CatalogoButton';
import stylesScroll from './stylesScroll';
import MenuImage from '../../components/MenuImage/MenuImage';

export default class PedidoFeitoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Pedido realizado',
        headerLeft: () => <MenuImage
            onPress={() => {
                navigation.openDrawer();
            }}
        />
    });

    render() {
        return (
            <ScrollView style={stylesScroll.container}>
                <View style={stylesScroll.infoRecipeContainer}>
                    <Image style={stylesScroll.photo} source={require('../../../assets/icons/success.png')} />
                </View>
                <View style={stylesScroll.infoRecipeContainer}>
                    <Text style={stylesScroll.infoRecipeName}>Seu pedido foi feito com sucesso!</Text>
                    <View style={stylesScroll.infoContainer}>
                        <TouchableHighlight>
                            <Text style={stylesScroll.category}>Um email foi enviado com os dados da compra!</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={stylesScroll.infoContainer}>
                            <Text style={stylesScroll.category}>Aguarde a entrega ou contato do vendedor</Text>
                    </View>
                    <View style={stylesScroll.infoContainer}>
                        <Text style={stylesScroll.infoRecipe}> Para comprar mais, retorne aos catálogos </Text>
                    </View>

                    <View style={stylesScroll.infoContainer}>
                        <CatalogoButton onPress={() => this.props.navigation.navigate('Catalogos')} />
                    </View>
                </View>
            </ScrollView>
        )
    }
};
