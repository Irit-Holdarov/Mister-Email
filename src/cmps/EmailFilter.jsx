import { IoSearch } from "react-icons/io5";

export function EmailFilter() {


  return (
    <div className="email-filter">
      <label htmlFor="search" >
          <IoSearch className="search-icon" />
          <input
            id="search"
            name="text"
            placeholder="Search mail"
            type="text" />
      </label>
    </div>
  )
}