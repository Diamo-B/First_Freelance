import '../styles/reset.css';
import '../styles/globals.css';
import Layout from '../components/Layouts/GeneralLayout';
import CategoryLayout from '../components/Layouts/CategoryLayout';
import DetailsLayout from '../components/Layouts/DetailsLayout';
import FavoritesLayout from '../components/Layouts/FavoritesLayout';
import AdminLayout from '../components/Layouts/AdminLayout';
import { useRouter } from 'next/router';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if(router.asPath.includes('/Categories')){
   return(
      <CategoryLayout>
          <Component {...pageProps} />
        </CategoryLayout>
      )
  }
  else if(router.asPath.includes('productDetails')||router.asPath.includes('Cart'))
  {
    return (
      <DetailsLayout>
        <Component {...pageProps} />
      </DetailsLayout>
    );
  }
  else if (router.asPath.includes('Favorites'))
  {
    return (
      <FavoritesLayout>
        <Component {...pageProps} />
      </FavoritesLayout>
    );
  }
  else if(router.asPath.includes('Admin') && !router.asPath.includes('api')){
    return(
        <SessionProvider>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </SessionProvider>
       )
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
