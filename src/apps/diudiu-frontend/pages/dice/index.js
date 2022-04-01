import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import React from 'react'
import BaseLayout from '../../components/layouts/BaseLayout'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  }
})

export default function DieListPage() {
  return (
    <BaseLayout>
      <Link href="/dice/123">
        <a>骰子頁</a>
      </Link>
    </BaseLayout>
  )
}
