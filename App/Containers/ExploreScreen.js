import React, {Component} from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import {connect} from "react-redux";
import _ from "lodash";
import EvilIcon from "react-native-vector-icons/EvilIcons";
// Styles
import styles from "./Styles/ExploreScreenStyles";
import ExploreActions from "../Redux/ExploreRedux";
import AppActions from "../Redux/AppRedux";
import AppConfig from "../Config/AppConfig";
import CustomMarker from "../Components/CustomMarker";
import {Colors, Fonts, Metrics} from "../Themes";
import {getPoiInfo} from "../Lib/Poi";

class ExploreScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Explore',
    tabBarLabel: 'Explore',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="compass" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
  });

  constructor(props) {
    super(props)

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.onMarkerPress = this.onMarkerPress.bind(this)
  }

  onRegionChange(region) {
    this.props.selectPoint(null)
    this.props.setRegion(region)
  }

  onRegionChangeComplete(region) {
    this.props.setRegion(region)
    this.props.getPoints(region)
  }

  componentDidMount() {
    this.props.getPoints(this.props.region)
  }

  onMarkerPress(point, marker) {
    // console.log('point: ', point)
    // console.log('marker: ', marker)

    // zoom to cluster
    if (point.point_count > 1) {
      const latitudeDelta = (this.props.region.latitudeDelta * AppConfig.clusterZoomFactor)
      const longitudeDelta = (this.props.region.longitudeDelta * AppConfig.clusterZoomFactor)

      const region = _.mergeWith({latitude: point.centroid_lat, longitude: point.centroid_lon}, {
        latitudeDelta,
        longitudeDelta
      })

      this.props.selectPoint(null)
      this.props.setRegion(region)
    }
    else {
      // marker.showCallout()

      // Alert.alert(
      //   'Name',
      //   point.json.name,
      // )

      this.props.selectPoint(point)

    }
  }

  render() {

    const {point} = this.props
    let info = AppConfig.defaultPoiInfo

    if (point) {
      info = getPoiInfo(point)
    }

    return (
      <View style={styles.mainContainer}>
        <MapView style={styles.map}
                 ref='map'
                 pitchEnabled={false}
                 rotateEnabled={false}
                 mapType={this.props.mapType}
                 region={this.props.region}
                 initialRegion={this.props.region}
                 onRegionChange={this.onRegionChange}
                 onRegionChangeComplete={this.onRegionChangeComplete}>
          {this.props.points.map((point, i) => {
            let pinColor = AppConfig.defaultPinColor
            if (point.point_count > 1) {
              pinColor = AppConfig.clusterPinColor
            }
            else if (point.types.indexOf(2) !== -1) {
              pinColor = AppConfig.ptTypeTwoColor
            }
            else if (point.types.indexOf(4) !== -1) {
              pinColor = AppConfig.ptTypeFourColor
            }
            return (
              <CustomMarker key={'pt-' + i} pinColor={pinColor} point={point} onPress={this.onMarkerPress}/>
            )
          })}
        </MapView>
        {point && <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('detail')} style={{position: 'absolute', top: Metrics.navBarHeight, left: 0, right: 0, bottom: 0}}>
          <View style={{flexDirection: 'row', backgroundColor: Colors.silver, justifyContent: 'space-around', alignItems: 'center', paddingTop: Metrics.marginVertical, paddingBottom: Metrics.marginVertical, paddingLeft: Metrics.marginHorizontal }}>
            <Image source={info.icon} style={{height: 40, width: 40}}/>
            <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch', justifyContent: 'center', marginLeft: 10 }}>
              <Text numberOfLines={2}  style={{
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
        </TouchableWithoutFeedback>}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    points: state.explore.points,
    point: state.explore.selectedPoint,
    region: state.app.region,
    mapType: state.app.mapType
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPoints: (region) => dispatch(ExploreActions.getPoints(region)),
  setRegion: (region) => dispatch(AppActions.setRegion(region)),
  selectPoint: (point) => dispatch(ExploreActions.selectPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)

