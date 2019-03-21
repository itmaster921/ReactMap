import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 40,
    backgroundColor: Colors.silver,
    paddingRight: Metrics.marginHorizontal
  },
  optionTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
  },
  optionValue: {
    color: Colors.charcoal,
    fontSize: Fonts.size.medium
  },
  rowIcon:{
    marginLeft: Metrics.marginHorizontal,
    fontSize: 20,
    color: Colors.iosBlue
  },
  detailIcon:{
    fontSize: 15,
    color: Colors.steel
  }
})
