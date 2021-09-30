import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components';

const { width: viewportWidth } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #F5F5F5;
`;

const Logo = styled.Image`
  height: 30%;
  marginBottom: 40px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #FFF;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 16px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginTop: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #FAD8A8;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
`;

const SignUpLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;


const stylesScroll = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },

  photo: {
    width: 200,
    height: 170
  },

  input: {
    textAlign: 'center',
    borderColor: '#2cd18a',
    width: 250,
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: '#FAD8A8',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2cd18a',
    color: '#000',
    fontSize: 14
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 160,
    width: 160,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    fontStyle: 'italic',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }
});

export default stylesScroll;
export { Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText };