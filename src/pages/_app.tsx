import { Layout } from '@/components/layout/Layout';
import { store, wrapper } from '@/store/configReducer';
import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { useStore } from 'react-redux';

function App({ Component, pageProps }: any) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
export default wrapper.withRedux(App);
