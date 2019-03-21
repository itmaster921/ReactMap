import {StyleSheet} from "react-native";
import {Colors} from "../../Themes/";
import AppConfig from "../../Config/AppConfig";

export default StyleSheet.create({
  circle: {
    borderRadius: 20,
    backgroundColor: AppConfig.defaultPinColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.snow
  },
  pinText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: Colors.transparent
  },
  callOut: {
    borderRadius: 4,
    backgroundColor: Colors.snow,
    borderWidth: 1,
    borderColor: Colors.background
  },
  callOutText: {
    color: Colors.background,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginTop: 5,
    width: 100
  },
  pinImage: {
    height: 30,
    width: 30
  }
})



