import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoSearch } from "react-icons/io5";

export function EmailFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
}, [filterByToEdit])

  function handleChange(ev) {
    let { value, name: field } = ev.target // ev.target.value  ev.target.name
    const parsingnames = ['isStarred', 'isRead']
    if (parsingnames.includes(field)) {
      value = JSON.parse(value)
    }
    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  return (
    <form className="email-filter">

      <label htmlFor="search"></label>
      <IoSearch className="search-icon" />
      <input
        id="search"
        name="txt"
        placeholder="Search mail"
        type="text"
        value={filterByToEdit.txt}
        onChange={handleChange} />

      <label >
        <select className="isRead-select"
          name="isRead"
          value={'' + filterByToEdit.isRead}
          onChange={handleChange}>

          <option value={'null'}>All</option>
          <option value={'true'}>Read</option>
          <option value={'false'}>Not Read</option>
        </select>
      </label>

      <label >
        <select className="isStarred-select"
          name="isStarred"
          value={'' + filterByToEdit.isStarred}
          onChange={handleChange}>

          <option value={'null'}>All</option>
          <option value={'true'}>Starred</option>
          <option value={'false'}>Not starred</option>
        </select>
      </label>
      
    </form>
  )
}