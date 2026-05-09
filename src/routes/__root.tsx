import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HelpSection from '../components/district-season/HelpSection';

import appCss from '../styles.css?url';

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark')?stored:'light';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(mode);root.setAttribute('data-theme',mode);root.style.colorScheme=mode;}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'District Season Calculation',
      },
      {
        name: 'description',
        content:
          'Hitung skor District Season (Hospital & Field)',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: 'https://i.imgur.com/Wp8Id3x.png',
        type: 'image/png',
      },
      {
        rel: 'apple-touch-icon',
        href: 'https://i.imgur.com/Wp8Id3x.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script>{THEME_INIT_SCRIPT}</script>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(211,47,47,0.18)]">
        <Header />
        <HelpSection />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
