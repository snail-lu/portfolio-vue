import menuSetting from './modules/menuSetting'
import managerGroup from './modules/managerGroup'
import dataStore from './modules/dataStore'
import getters from './getters'

const store = {
  menuSetting,
  managerGroup,
  dataStore
}

export { store, getters }