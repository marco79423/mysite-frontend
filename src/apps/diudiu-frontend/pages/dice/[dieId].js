export async function getServerSideProps({params}) {
  const {dieId} = params
  return {props: {dieId}}
}

export default function RollingDiePage({dieId}) {
  return (
    <div>RollingDiePage {dieId}</div>
  )
}
