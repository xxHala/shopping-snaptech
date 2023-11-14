
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CMS from "@/components/cms"

export default function Admin() {
  return (
    <CMS />
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
