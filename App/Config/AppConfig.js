// Simple React Native specific changes
import {Colors, Images} from "../Themes";

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  initialRegion: {
    latitude: 29.00,
    longitude: -82.00,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  },
  apiBaseUrl: 'https://api.fishory.com/fishory/',
  defaultRadius: 0.0005,
  defaultTypes: [2, 4],
  defaultPinColor: Colors.transparent,
  clusterPinColor: Colors.bloodOrange,
  ptTypeTwoColor: Colors.transparent,
  ptTypeFourColor: Colors.transparent,
  clusterZoomFactor: 0.6,
  throttleDelay: 1000,
  mapTileSize: 256,
  zoomLevelToRadius: [0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1,
    0.1, //10
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005,
    0.0005], // and so on up to 20
  defaultMapType: 'standard',
  defaultPoiInfo: {icon: Images.logo, text: 'Unknown'}
}
