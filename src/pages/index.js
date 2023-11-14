import HeroSection from '@/components/Homepage';
import GoogleMapComponent from '@/components/GoogleMap';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <GoogleMapComponent />

    </div>
  );
};

export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Home;
