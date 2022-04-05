import React from 'react'
import {useDispatch} from 'react-redux'

import RollingDieLayout from '../../components/layouts/RollingDieLayout'
import RollingDieBox from '../../containers/RollingDieBox'
import dieTypeSlice from '../../slices/dieType'

export async function getServerSideProps({params}) {
  const {dieTypeId} = params
  return {props: {dieTypeId}}
}

export default function RollingDiePage({dieTypeId}) {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(dieTypeSlice.actions.setAll([
      {
        id: 1,
        name: '普通六面骰',
        description: '就是一個很普通的六面骰',
        faces: [1, 2, 3, 4, 5, 6]
      }
    ]))
  })

  return (
    <RollingDieLayout>
      <RollingDieBox dieTypeId={dieTypeId}/>
    </RollingDieLayout>
  )
}
