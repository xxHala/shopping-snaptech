
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CMS from "@/components/cms"
import ProductTable from '@/components/cms/adminProduct'

export default function Admin() {
  return (
    <ProductTable />
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
