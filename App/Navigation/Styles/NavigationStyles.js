import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'
import ApplicationStyles from '../../Themes/ApplicationStyles'

export default StyleSheet.create({
  ...ApplicationStyles.navBar,
  header: {
    backgroundColor: Colors.backgroundColor
  }
})
