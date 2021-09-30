import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 180,
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnIcon: {
    height: 13,
    width: 20
  }
});

export default styles;
