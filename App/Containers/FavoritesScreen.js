import React, {Component} from "react";
import {Image, ListView, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import EvilIcon from "react-native-vector-icons/EvilIcons"
// Styles
import styles from "./Styles/FavoritesScreenStyles"
import ExploreActions from "../Redux/ExploreRedux"
import {Colors, Fonts, Metrics} from '../Themes'
import {getPoiInfo} from "../Lib/Poi";

class FavoritesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Favorites',
    tabBarLabel: 'Favorites',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="heart" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  showDetails(point) {
    this.props.selectPoi(point)
    this.props.navigation.navigate('detail')
  }

  renderRow(point) {

    const info = getPoiInfo(point)

    return (
      <TouchableOpacity onPress={this.showDetails.bind(this, point)}>
        <View style={{
          flexDirection: 'row',
          backgroundColor: Colors.silver,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: Metrics.marginVertical,
          paddingBottom: Metrics.marginVertical,
          paddingLeft: Metrics.marginHorizontal
        }}>
          <Image source={info.icon} style={{height: 40, width: 40}}/>
          <View
            style={{flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'center', marginLeft: 10}}>
            <Text numberOfLines={2} style={{
              color: Colors.black,
              fontSize: Fonts.size.regular,
              backgroundColor: Colors.transparent
            }}>{point.name}</Text>
            <Text style={{
              color: Colors.black,
              fontSize: Fonts.size.medium,
              backgroundColor: Colors.transparent
            }}>{info.text}</Text>
          </View>
          <EvilIcon name='chevron-right' size={40} style={{marginRight: Metrics.marginHorizontal}}/>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ListView
          renderScrollComponent={(props) => (<ScrollView/>)}
          dataSource={this.ds.cloneWithRows(this.props.points)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    points: state.app.favoritePoints

  }
}

const mapDispatchToProps = (dispatch) => ({
  selectPoi: (point) => dispatch(ExploreActions.selectPoi(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)

