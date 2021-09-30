import { StyleSheet } from "react-native";

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginBottom: 30,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    width: 100,
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    width: 100,
    backgroundColor: "#990033",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: "center"
  }
});

export default stylesModal;