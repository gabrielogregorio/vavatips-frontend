import React from "react";

interface propsInterface {
  queryUrl: any
}

export const TagsFixFilters = ({ queryUrl }: propsInterface ) => {
  return (
    <div>
      <div className="btn-base">
        { queryUrl.agent ? (<button>#{queryUrl.agent}</button> ) : null }
      </div>
      <div className="btn-base">
        { queryUrl.map ? (<button>#{queryUrl.map}</button> ) : null }
      </div>
    </div>
  )
}
