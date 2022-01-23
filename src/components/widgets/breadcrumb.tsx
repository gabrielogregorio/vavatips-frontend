import Link from 'next/link';
import styles from '../../styles/components/breadcrumb.style.module.css';

interface propsInterface {
  breadcrumbs: { url: string; text: string }[];
  admin?: boolean;
}

export default function BreadcrumbComponent({ breadcrumbs, admin }: propsInterface) {
  function renderBreadCrumb() {
    const lastItem = breadcrumbs.length - 1;

    return breadcrumbs.map((breadcrumb, index) => (
      <div key={`${breadcrumb.text}`}>
        {lastItem === index ? (
          <p>{breadcrumb.text}</p>
        ) : (
          <>
            <Link href={breadcrumb.url}>
              <a
                style={{
                  color: admin ? 'var(--secundary)' : 'var(--primary)',
                }}>
                {breadcrumb.text}
              </a>
            </Link>
            <span
              style={{
                color: admin ? 'var(--secundary)' : 'var(--primary)',
              }}>
              &gt;
            </span>
          </>
        )}
      </div>
    ));
  }

  return (
    <div className={styles.breadcrumb}>
      <div className={styles.breadcrumbItem}>{renderBreadCrumb()}</div>
    </div>
  );
}
