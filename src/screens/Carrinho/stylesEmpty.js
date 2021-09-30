import { StyleSheet } from "react-native";

const stylesEmpty = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  fotoCarrinho: {
    marginTop: 80,
    width: 200,
    height: 200
  },
  alerta: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#DC143C'
  },
  texto: {
    width: 200,
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#909090',
    textAlign: 'justify'
  }
});

export default stylesEmpty;