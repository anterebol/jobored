import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';

function App({ Component, pageProps }: any) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
export default App;
