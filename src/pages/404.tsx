import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  return <div>F, não tem nada aqui.</div>;
  // useEffect(() => {
  //   router.replace('/');
  // });
}
