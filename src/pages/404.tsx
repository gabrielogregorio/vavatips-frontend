import { Layout } from '@/layout/layout';
import { SubContainer } from '@/base/subContainer';
import { Title } from '@/base/title';
import { Footer } from '@/layout/footer';
import { Navbar } from '@/layout/navbar';
import { Breadcrumb } from '@/widgets/breadcrumb';
import { modelNavbarPublic } from '@/schemas/navbar';
import { navbarEnum } from '@/enums/navbar';
import Image from 'next/image';

const breadcrumbs = [];

const Error404 = () => (
  <Layout>
    <Navbar selected={navbarEnum.Inicio} modelNavbar={modelNavbarPublic} />
    <Breadcrumb breadcrumbs={breadcrumbs} />

    <SubContainer>
      <Title>Oooops, acho que essa página não existe!</Title>

      <div className="relative w-full h-72">
        <Image layout="fill" src="/images/assets/404.svg" />
      </div>
    </SubContainer>

    <Footer />
  </Layout>
);
export default Error404;
