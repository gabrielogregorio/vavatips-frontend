import Link from 'next/link';
import { ReactElement } from 'react';

type propsType = {
  breadcrumbs: { url: string; text: string }[];
};

const LAST_ITEM = -1;

export const Breadcrumb = ({ breadcrumbs }: propsType): ReactElement => {
  const renderBreadCrumb = (): ReactElement[] => {
    const lastItem = breadcrumbs.length - LAST_ITEM;

    return breadcrumbs.map((breadcrumb, index) => (
      <div key={`${breadcrumb.text}`} className="p-1 pb-0 pt-0 flex items-center ">
        {lastItem === index ? (
          <p className="text-skin-white p-0">{breadcrumb.text}</p>
        ) : (
          <>
            <Link href={breadcrumb.url} className="text-skin-white" style={{ opacity: 0.9 }}>
              {breadcrumb.text}
            </Link>
            <span className={`pl-1 ${'text-skin-white'}`} style={{ opacity: 0.9 }}>
              &gt;
            </span>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full dark:bg-skin-gray-900 bg-skin-secondary-light flex justify-center items-center shadow-md h-8">
      <div className="p-0 flex max-w-maxWidthDefault w-full">{renderBreadCrumb()}</div>
    </div>
  );
};
