import React from 'react'

interface PostTagsProps {
  tags: string[],
  activeFilters: string[]
  toggleTag: (tag: string) => void
}

export const PostTags = ({tags, activeFilters, toggleTag}: PostTagsProps) => {
  function renderTags() {
    return tags.map((tag, index) =>
      <div className="btn" key={index} onClick={() => toggleTag(tag)}>
        <button className={ activeFilters.includes(tag) ? 'btnActive': ''}>{tag}</button>
      </div>
    )
  }
  return <div className="tags"> {renderTags()}  </div>
}
