interface loaderProps {
  active: boolean;
}

export default function LoaderComponent({ active }: loaderProps) {
  function renderActive() {
    return active ? (
      <div data-testid="loader" className="w-full flex justify-center py-4">
        <div className="w-20 h-20 border-2 border-emerald-200 rounded-full" />
      </div>
    ) : null;
  }

  return <>{renderActive()}</>;
}
