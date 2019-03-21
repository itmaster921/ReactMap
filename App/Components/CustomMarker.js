import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import MapView from "react-native-maps";
import _ from 'lodash'

import {Images} from "../Themes";
import styles from "./Styles/CustomMarkerStyles";
import AppConfig from "../Config/AppConfig";

export default class CustomMarker extends Component {

  static defaultProps = {
    onPress: () => {
    },
    pinColor: AppConfig.defaultPinColor
  }

  static propTypes = {
    point: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      layout: {}
    }

    this.onLayout = this.onLayout.bind(this)
    this.showCallout = this.showCallout.bind(this)
  }

  onLayout(event) {
    const {layout} = event.nativeEvent
    this.setState({layout})
    this.refs.marker.hideCallout()
  }

  showCallout() {
    this.refs.marker.showCallout()
  }

  render() {
    const {point} = this.props

    const title = (point.json && point.json.name) ? point.json.name : null
    let pinText = '  '

    let icon = null

    if (point.point_count > 1000000) {
      pinText = '1M+'
    } else if (point.point_count > 100000) {
      pinText = '100K+'
    } else if (point.point_count > 10000) {
      pinText = '10K+'
    } else if (point.point_count > 1000) {
      pinText = '1K+'
    } else if (point.point_count > 1) {
      pinText = point.point_count
    }
    else {
      // non-cluster point
      if( _.indexOf(point.types, 2) !== -1){
        icon = Images.boatRamp

      }
      else if( _.indexOf(point.types, 4) !== -1){
        icon = Images.anchor
      }
    }

    return (
      <View>
        <MapView.Marker title={title} ref='marker'
                        coordinate={{latitude: point.centroid_lat, longitude: point.centroid_lon}}>
          <TouchableOpacity onLayout={this.onLayout} onPress={this.props.onPress.bind(this, point, this)}>
            <View style={[styles.circle, {backgroundColor: this.props.pinColor}]}>
              {point.point_count === 1 ? <Image source={icon} style={styles.pinImage}/> :
                <Text style={styles.pinText}>{pinText}</Text>  }
            </View>
          </TouchableOpacity>
          <MapView.Callout tooltip>
          </MapView.Callout>
        </MapView.Marker>
      </View>
    )
  }
}
