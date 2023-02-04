import { ReactElement } from 'react';

type tagFixFiltersType = {
  agent: string;
  map: string;
};

export const TagsFixFilters = ({ agent, map }: tagFixFiltersType): ReactElement => (
  <div className="flex justify-center">
    <div>
      {agent ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular font-bold">
          #{agent}
        </button>
      ) : null}
    </div>
    <div>
      {map ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular  font-bold">
          #{map}
        </button>
      ) : null}
    </div>
  </div>
);
