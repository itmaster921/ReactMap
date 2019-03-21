import {StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.tabBar,
  searchView: {
    paddingTop: 20,
    paddingBottom: 20
  }
})
