export default function SubContainer({ children }: any) {
  return (
    <div className="max-w-maxWidthDefault flex items-center flex-col w-full h-full bg-skin-bgContainer shadow-md p-4 m-8">
      {children}
    </div>
  );
}
