import React, {Component} from "react";
import {Text, TouchableOpacity, View, WebView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import {connect} from "react-redux";
import _ from "lodash";
// Styles
import AppActions from "../Redux/AppRedux"
import ExploreActions from "../Redux/ExploreRedux"
import styles from "./Styles/PoiDetailScreenStyles"
import {Colors} from '../Themes'


class PoiDetailScreen extends Component {

  static navigationOptions = ({navigation}) => {
    let headerRight = null
    let headerLeft = null

    if (navigation.state.params) {
      const iconName = navigation.state.params.isFavorite ? 'heart' : 'heart-o'

      headerRight = (
        <TouchableOpacity onPress={navigation.state.params.onFavoritePressed}>
          <Icon name={iconName} style={styles.navBarRightIcon} color={Colors.heart}/>
        </TouchableOpacity>)

      headerLeft = (<TouchableOpacity onPress={navigation.state.params.onBackPressed} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
        <EvilIcon name='chevron-left' style={styles.navBarLeftIcon} color={Colors.iosBlue}/>
      </TouchableOpacity>)
    }
    return ({
      title: 'Details',
      headerRight,
      headerLeft
    })
  }

  constructor(props) {
    super(props)

    this.onFavoritePressed = this.onFavoritePressed.bind(this)
    this.isPointFavorite = this.isPointFavorite.bind(this)
    this.onBackPressed = this.onBackPressed.bind(this)
  }

  onFavoritePressed() {
    if (this.isPointFavorite(this.props.favoritePoints) === false) {
      this.props.addPointToFavorite(this.props.point)
    }
    else {
      this.props.removePointFromFavorite(this.props.point)
    }
  }

  onBackPressed() {
    this.props.selectPoint(null)
    this.props.navigation.goBack()
  }

  isPointFavorite(favoritePoints) {
    const favoritePoint = _.find(favoritePoints, (pt) => {
      return (pt.id === this.props.point.id)
    })
    return (favoritePoint !== undefined)
  }

  componentDidMount() {
    const isFavorite = this.isPointFavorite(this.props.favoritePoints)

    this.props.navigation.setParams({
      isFavorite,
      onFavoritePressed: this.onFavoritePressed,
      onBackPressed: this.onBackPressed
    })
  }

  componentWillReceiveProps(nextProps) {
    const isFavorite = this.isPointFavorite(nextProps.favoritePoints)

    if (nextProps.navigation.state.params.isFavorite !== isFavorite) {
      this.props.navigation.setParams({isFavorite})
    }

  }

  render() {
    const {point} = this.props
    return (
      <View style={styles.mainContainer}>
        {point && <WebView source={{uri: `https://fishory.com/services/poi-detail.php?id=${point.id}&v=2`}}/>}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    point: state.explore.selectedPoint,
    favoritePoints: state.app.favoritePoints
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPointToFavorite: (point) => dispatch(AppActions.addPointToFavorite(point)),
  removePointFromFavorite: (point) => dispatch(AppActions.removePointFromFavorite(point)),
  selectPoint: (point) => dispatch(ExploreActions.selectPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(PoiDetailScreen)

