
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CategoryTable from '@/components/cms/adminCategory'

export default function Admin() {
  return (
    <CategoryTable />
  )
}

export async function getServerSideProps(context) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
