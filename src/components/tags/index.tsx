import React from 'react'
import { useFilters } from '../../contexts/filters'

export const PostTags = () => {
  const {tags, filters, setFilters } = useFilters()

  function toggleTag(tag: string) {
    let filterCopy: string[] = JSON.parse(JSON.stringify(filters))

    if(filterCopy.includes(tag)) {
      filterCopy.splice(filterCopy.indexOf(tag), 1)
    } else {
      filterCopy.push(tag)
    }
    setFilters(filterCopy)
  }

  function renderTags() {
    return tags.map((tag, index) =>
      <div className="btn" key={index} onClick={() => toggleTag(tag)}>
        <button className={ filters.includes(tag) ? 'btnActive': ''}>{tag} a</button>
      </div>
    )
  }
  return <div className="tags"> {renderTags()}  </div>
}
