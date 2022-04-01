import RollingDieLayout from '../../components/layouts/RollingDieLayout'
import RollingDieBox from '../../containers/RollingDieBox'

export async function getServerSideProps({params}) {
  const {dieId} = params
  return {props: {dieId}}
}

export default function RollingDiePage({dieId}) {
  return (
    <RollingDieLayout>
      <RollingDieBox dieId={dieId}/>
    </RollingDieLayout>
  )
}
