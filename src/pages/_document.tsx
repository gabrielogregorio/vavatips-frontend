import { Html, Head, Main, NextScript } from 'next/document';
import { ReactElement } from 'react';

const Document = (): ReactElement => (
  <Html lang="pt-br">
    <Head>
      <meta name="language" content="pt-BR" />
      <link rel="manifest" href="/manifest.json" />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#D85F5F" />

      <meta
        name="keywords"
        content="valorant,dicas,tips,pixels,fps,granadas,flechas rastreadoras,flechas de choque,Ascent,Bind,Haven,Split,Breeze,Fracture,Icebox,Cypher,Killjoy,Sova,Viper,Sage,Astra,Skye,Reyna,Yoru,Jett,Raze,Phoenix,Kay0,Breach,Omen,Brimstone,chamber,Neon,veneninho,granadas"
      />

      <meta name="application-name" content="Valorant tips" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Valorant tips" />
      <meta name="description" content="As melhores dicas e pixels do Valorant" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#D85F5F" />
      <meta name="msapplication-tap-highlight" content="no" />

      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />

      {/* <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#D85F5F" /> */}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://twitter.com/ogregdev" />
      <meta name="twitter:title" content="Developer valorant tips" />
      <meta name="twitter:description" content="profile developer valorant tips" />
      <meta name="twitter:image" content="https://valorant-tips.vercel.app/icons/android-chrome-192x192.png" />
      <meta name="twitter:creator" content="@ogregdev" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="profile developer" />
      <meta property="og:description" content="profile developer valorant tips" />
      <meta property="og:site_name" content="profile developer" />
      <meta property="og:url" content="https://valorant-tips.vercel.app" />
      <meta property="og:image" content="https://valorant-tips.vercel.app/icons/apple-touch-icon.png" />

      {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
