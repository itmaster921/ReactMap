import {StyleSheet} from "react-native";
import {ApplicationStyles, Colors, Metrics} from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.tabBar,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})
