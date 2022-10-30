import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/GeneralLayout';
import CategoryLayout from '../components/CategoryLayout';
import DetailsLayout from '../components/DetailsLayout'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if(router.asPath.includes('/Categories')){
   return(
      <CategoryLayout>
          <Component {...pageProps} />
        </CategoryLayout>
      )
  }
  else if(router.asPath.includes('/productDetails'))
  {
    return (
      <DetailsLayout>
        <Component {...pageProps} />
      </DetailsLayout>
    );
  }
  else
  {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp
