import _ from 'lodash'
import AppConfig from '../Config/AppConfig'
import {Images} from '../Themes'

export function getPoiInfo(point) {
  let info = _.clone(AppConfig.defaultPoiInfo)

  const types = _.intersection(point.type, [2, 4])

  // if contains only type 2 in array then "Boat Ramp"
  // if contains only type 4 in array then "Marina"
  // if contains both type 2 and type 4 then "Boat Ramp / Marina"

  if (types.length === 2) {
    info.text = 'Boat Ramp / Marina'
  }
  else if (_.indexOf(types, 2) !== -1) {
    info.text = 'Boat Ramp'
  }
  else if (_.indexOf(types, 4) !== -1) {
    info.text = 'Marina'
  }

  // if it contains a 2 it would get the "Ramp" icon
  // if it contains a 4 and not a 2 it would get the "Anchor" icon
  if (_.indexOf(types, 2) !== -1) {
    info.icon = Images.boatRamp
  }
  else if (_.indexOf(types, 4) !== -1) {
    info.icon = Images.anchor
  }

  return info

}
