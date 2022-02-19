import Link from 'next/link';

interface propsInterface {
  breadcrumbs: { url: string; text: string }[];
  admin: boolean;
}

const BreadcrumbComponent = ({ breadcrumbs, admin }: propsInterface) => {
  function renderBreadCrumb() {
    const lastItem = breadcrumbs.length - 1;

    const color = admin ? 'text-skin-gray-400' : 'text-skin-gray-400';

    return breadcrumbs.map((breadcrumb, index) => (
      <div key={`${breadcrumb.text}`} className="p-1 pb-0 pt-0 flex items-center ">
        {lastItem === index ? (
          <p className="text-skin-gray-400 p-0">{breadcrumb.text}</p>
        ) : (
          <>
            <Link href={breadcrumb.url} passHref>
              <a href="#/" className={color} style={{ opacity: 0.7 }}>
                {breadcrumb.text}
              </a>
            </Link>
            <span className={`pl-1 ${color}`} style={{ opacity: 0.7 }}>
              &gt;
            </span>
          </>
        )}
      </div>
    ));
  }

  return (
    <div className="w-full dark:bg-skin-gray-900 bg-skin-secondary-light flex justify-center items-center shadow-md h-8">
      <div className="p-0 flex max-w-maxWidthDefault w-full">{renderBreadCrumb()}</div>
    </div>
  );
};
export default BreadcrumbComponent;
