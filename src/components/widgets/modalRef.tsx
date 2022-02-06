import ButtonCloseModal from '@/base/modalCloseButton';

export default function ModalRef({ children, title, closeModal }: any) {
  return (
    <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black z-modal bg-opacity-40">
      <div className="bg-skin-bgContainer p-5 rounded-2xl max-w-maxWidthModal w-full">
        <div className="flex items-center justify-center pb-3">
          <h1 className="flex-1 text-skin-textColor">{title}</h1>
          <ButtonCloseModal onClick={() => closeModal()} />
        </div>
        <hr className="p-3 pl-0 pr-0" />
        {children}
      </div>
    </div>
  );
}
