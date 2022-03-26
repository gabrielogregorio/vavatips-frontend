type tagFixFiltersType = {
  agent: string;
  map: string;
};

export const TagsFixFilters = ({ agent, map }: tagFixFiltersType) => (
  <div className="flex justify-center">
    <div>
      {agent ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{agent}
        </button>
      ) : null}
    </div>
    <div>
      {map ? (
        <button type="button" className="bg-transparent p-2 m-2 text-skin-secondary-regular">
          #{map}
        </button>
      ) : null}
    </div>
  </div>
);
