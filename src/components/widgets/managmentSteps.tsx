import { Button } from '@/base/button';
import { HrComponent } from '@/base/hr';
import { formatImage } from '@/services/formatEnvironment';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

type actionType = 'top' | 'bottom';

type imgType = {
  description: string;
  image: string;
  id: string;
};

const SECOND_POSITION = 1;
const FIRST_POSITION = 0;
const putPosition = (
  idPost: string,
  action: actionType,
  imgAdded: imgType[],
  setImgAdded: Dispatch<SetStateAction<imgType[]>>,
) => {
  const positionPut = imgAdded.findIndex((item) => item.id === idPost);
  const copyListDelete = imgAdded[positionPut];
  const copyImgAdded = JSON.parse(JSON.stringify(imgAdded));

  let increment = 0;
  const DECREASE_BY = 1;

  if (action === 'bottom' && positionPut > FIRST_POSITION) {
    increment = -DECREASE_BY;
  } else if (action === 'top' && positionPut < imgAdded.length) {
    increment = 1;
  }

  copyImgAdded.splice(positionPut, SECOND_POSITION);
  copyImgAdded.splice(positionPut + increment, FIRST_POSITION, copyListDelete);
  setImgAdded(copyImgAdded);
};

type ManagementStepsProps = {
  imgAdded: imgType[];
  showModalWithItem: (idPost: string) => void;
  deleteStep: (idPost: string) => void;
  setImgAdded: Dispatch<SetStateAction<imgType[]>>;
};

export const ManagementSteps = ({ imgAdded, showModalWithItem, deleteStep, setImgAdded }: ManagementStepsProps) => {
  const renderSteps = () =>
    imgAdded.map((instruction, key) => (
      <div key={`${instruction.id} ${instruction.image}`} className="w-full">
        <div className="flex">
          <p
            className="flex-1 text-sm text-gray-600 dark:text-gray-200"
            onClick={() => showModalWithItem(instruction.id)}
            role="presentation">
            {key + 1} - {instruction.description}
          </p>
          <Button
            className="text-base ml-2 text-red-400"
            onClick={() => deleteStep(instruction.id)}
            dataTestid={`deleteStepButton-${key + 1}`}>
            <FaTimes />
          </Button>
        </div>

        <div className="relative flex-1 ">
          <div className="relative h-72 w-full ">
            {formatImage(instruction.image) !== '' ? (
              <Image
                layout="fill"
                className="object-cover"
                data-src={formatImage(instruction.image)}
                src={formatImage(instruction.image)}
                alt={instruction.description}
              />
            ) : null}
          </div>

          <br />
          <Button
            className="top-0 left-2/4 absolute z-btnPost"
            onClick={() => putPosition(instruction.id, 'bottom', imgAdded, setImgAdded)}
            dataTestid={`btn-top-${key + 1}`}>
            <BsChevronUp className="text-3xl font-extrabold text-skin-white " />
          </Button>
          <Button
            className="bottom-5 left-2/4 absolute z-btnPost"
            onClick={() => putPosition(instruction.id, 'top', imgAdded, setImgAdded)}
            dataTestid={`btn-bottom-${key + 1}`}>
            <BsChevronDown className="text-3xl font-extrabold text-skin-white" />
          </Button>
        </div>
        <HrComponent />
      </div>
    ));

  return <>{renderSteps()}</>;
};
