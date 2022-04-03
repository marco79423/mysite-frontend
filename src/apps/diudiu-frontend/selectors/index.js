import {createEntityAdapter} from '@reduxjs/toolkit'

const entityAdapter = createEntityAdapter()

export const selectDeveloperMode = state => state.app.developerMode

const dieTypeSelectors = entityAdapter.getSelectors((state) => state.dieType)
export const selectDieType = dieTypeId => state => dieTypeSelectors.selectById(state, dieTypeId)

const dieSelectors = entityAdapter.getSelectors((state) => state.die)
export const selectDie = dieId => state => dieSelectors.selectById(state, dieId)
