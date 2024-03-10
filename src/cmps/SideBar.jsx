import compose from "../assets/imgs/compose.png"

import inbox from "../assets/imgs/inbox.png"
import starred from "../assets/imgs/starred.png"
import sent from "../assets/imgs/sent.png"
import draff from "../assets/imgs/draff.png"
import trash from "../assets/imgs/delete.png"
import { Link } from "react-router-dom"


const sidebarItems = [
  { to: "/email/inbox", imgSrc: inbox, altText: "inbox-img", name: "Inbox" },
  { to: "/email/starred", imgSrc: starred, altText: "star-img", name: "Starred" },
  { to: "/email/sent", imgSrc: sent, altText: "sent-img", name: "Sent" },
  { to: "/email/draff", imgSrc: draff, altText: "draff-img", name: "Draff" },
  { to: "/email/trash", imgSrc: trash, altText: "trash-img", name: "Trash" },
];



export function SideBar() {
  return (
    <section className="side-bar">
      <Link to="/email/edit">
        <button className="side-bar-compose">
          <span>
            <img src={compose} alt="compose-img" />
          </span>
          Compose
        </button>
      </Link>
      <div className="side-bar-items">
        {sidebarItems.map((item, index) => (
          <SideBarItem key={index} {...item} />
        ))}
      </div>

    </section>
  )
}


export function SideBarItem({ to, imgSrc, altText, name }) {
  return (
    <Link className={`item-content item-content-${name.toLowerCase()}`}
      to={to}>
      <span className="icon-item">
        <img src={imgSrc} alt={altText} />
      </span>
      <span className="name-item">
        {name}
      </span>

    </Link>
  );
}