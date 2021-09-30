import { StyleSheet } from 'react-native';
import { block } from 'react-native-reanimated';

const styles = StyleSheet.create({
  photoContainer: {
    marginTop: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 200,
    height: 180,
  },
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
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
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
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
    flex: 1,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
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
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  loading: {
    width: 100,
    height: 100
  }
});

export default styles;
