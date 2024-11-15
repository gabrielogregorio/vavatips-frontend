import { Layout } from '@/layout/layout';
import { SubContainer } from '@/base/subContainer';
import { Title } from '@/base/title';
import { Navbar } from '@/layout/navbar';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { modelNavbarPublic } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import Image from 'next/image';
import { Footer } from '@/layout/footer';
import { ReactElement } from 'react';

const breadcrumbs = [];

const Error404 = (): ReactElement => (
  <Layout>
    <Navbar selected={navbarEnum.Inicio} modelNavbar={modelNavbarPublic} />
    <Breadcrumb breadcrumbs={breadcrumbs} />

    <SubContainer>
      <Title>Oooops, acho que essa página não existe!</Title>

      <div className="relative w-full flex justify-center py-8">
        <Image
          width={500}
          height={500}
          src="/images/assets/404.svg"
          className="w-full max-w-[300px]"
          alt=""
          aria-hidden
        />
      </div>
    </SubContainer>

    <Footer />
  </Layout>
);
export default Error404;
