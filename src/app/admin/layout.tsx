import type { Metadata } from 'next';
import { Footer } from '../../Organisms/Footer';
import { PrivateHeader } from '../../Organisms/PrivateHeader';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={'bg-root-bg '}>
      <div className="flex flex-col justify-between min-h-screen">
        <PrivateHeader />

        <div className="mt-5xl flex items-start justify-center animate-fadeIn300 flex-1">
          <main className="flex flex-col max-w-[890px] w-full px-3xl py-3xl gap-3xl bg-content-bg border border-border-soft shadow-md rounded-sm">
            {children}
          </main>
        </div>

        <div className="mt-5xl">
          <Footer />
        </div>
      </div>
    </body>
  );
}
