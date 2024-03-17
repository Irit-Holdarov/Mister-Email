import { Link, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import compose from "../assets/imgs/compose.png"
import inbox from "../assets/imgs/inbox.png"
import starred from "../assets/imgs/starred.png"
import sent from "../assets/imgs/sent.png"
import drafts from "../assets/imgs/drafts.png"
import trash from "../assets/imgs/delete.png"

export function SideBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  const [focusedItem, setFocusedItem] = useState('inbox')

  useEffect(() => {
    setFocusedItem(params.folder)
  }, [params.folder])

  const sidebarItems = [
    { to: "/email/inbox", imgSrc: inbox, altText: "inbox-img", name: "Inbox" },
    { to: "/email/starred", imgSrc: starred, altText: "star-img", name: "Starred" },
    { to: "/email/sent", imgSrc: sent, altText: "sent-img", name: "Sent" },
    { to: "/email/drafts", imgSrc: drafts, altText: "drafts-img", name: "Drafts" },
    { to: "/email/trash", imgSrc: trash, altText: "trash-img", name: "Trash" },
  ];

  function setQSparams() {
    setSearchParams({ compose: 'new' })
  }

  return (
    <section className="side-bar">
      <div>
        <button onClick={setQSparams} className="side-bar-compose">
          <span>
            <img src={compose} alt="compose-img" />
          </span>
          Compose
        </button>
      </div>

      <div className="side-bar-items">
        {sidebarItems.map((item, index) => (
          <SideBarItem key={index} {...item} isActive={focusedItem === item.name.toLocaleLowerCase()} />
        ))}
      </div>
    </section>
  )
}

export function SideBarItem({ to, imgSrc, altText, name, isActive }) {
  return (
    <Link className={`item-content item-content-${name.toLowerCase()} ${isActive ? 'active' : ''}`}
      to={to}>

      <div className="item-folder">
        <span className="icon-item">
          <img src={imgSrc} alt={altText} />
        </span>

        <span className="name-item">
          {name}
        </span>
      </div>
      {/* <span className="count-folder">
        8
      </span> */}
    </Link>
  );
}