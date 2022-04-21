type loaderProps = {
  active: boolean;
};

export const Loader = ({ active }: loaderProps) => {
  const renderActive = () =>
    active ? (
      <div className="flex items-center justify-center w-full">
        <div
          data-testid="loader"
          className="spinner-border animate-spin w-10 h-10 inline-block border-4 rounded-full m-2 border-skin-secondary-regular border-b-transparent"
          role="status">
          <span className="visually-hidden hidden">Loading...</span>
        </div>
      </div>
    ) : null;

  return <>{renderActive()}</>;
};
