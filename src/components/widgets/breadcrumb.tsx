import Link from 'next/link';

interface propsInterface {
  breadcrumbs: { url: string; text: string }[];
  admin: boolean;
}

export default function BreadcrumbComponent({ breadcrumbs, admin }: propsInterface) {
  function renderBreadCrumb() {
    const lastItem = breadcrumbs.length - 1;

    const color = admin ? 'text-skin-linkNormal' : 'text-skin-linkActive';

    return breadcrumbs.map((breadcrumb, index) => (
      <div key={`${breadcrumb.text}`} className="p-1 pb-0 pt-0 flex items-center ">
        {lastItem === index ? (
          <p className="text-skin-textColor p-0">{breadcrumb.text}</p>
        ) : (
          <>
            <Link href={breadcrumb.url} passHref>
              <a href="#/" className={color}>
                {breadcrumb.text}
              </a>
            </Link>
            <span className={`pl-1 ${color}`}>&gt;</span>
          </>
        )}
      </div>
    ));
  }

  return (
    <div className="w-full bg-skin-backgroundSecondary flex justify-center items-center shadow-md h-8">
      <div className="p-0 flex max-w-maxWidthDefault w-full">{renderBreadCrumb()}</div>
    </div>
  );
}

//   max-width: var(--max-width);
