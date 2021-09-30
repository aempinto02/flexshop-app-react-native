import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    marginTop: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 200,
    height: 180,
  },
  itemLista: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    width: '100%'
  },
  infoLista: {
    alignContent: 'flex-start',
  },
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 180,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesItemContainerFim: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: 100,
    height: 100,
    borderRadius: 20,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  infoTitle: {
    width: '100%',
    height: 10,
    fontSize: 15,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 4
  },
  infoTitle1: {
    width: '100%',
    height: 10,
    fontSize: 12,
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2cd18a',
  },
  infoTitle2: {
    width: '100%',
    height: 10,
    fontSize: 14,
    flex: 1,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#19A0D8',
  },
  categoriesName: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 4
  },
  categoriesInfo: {
    marginTop: 2,
    marginBottom: 2
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainerFim: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainerModal: {
    flex: 1,
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  loading: {
    width: 100,
    height: 100
  },
  containerLista: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLinha: {
    width: 300,
    height: '100%',
    textAlign: 'justify',
  },
  lista: {
    borderRadius: 50,
    padding: 13,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2cd18a',
    borderStyle: 'solid'
  }
});

export default styles;
