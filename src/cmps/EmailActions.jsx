import { IoTrashOutline } from "react-icons/io5";
import { IoMailOpen } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";


import readEmail from "../assets/imgs/read_email.png"
import unreadEmail from "../assets/imgs/unread_email.png"
import deleteEmil from "../assets/imgs/delete.png"

export function EmailActions({ onRemoveEmail, onApdateEmail, email }) {

  function renderReadUnreadIcon(email) {
    return email.isRead ? (
      <img src={readEmail} alt="mail read icon" className="email-actions-read-mail"
        onClick={() => onApdateEmail({ ...email, isRead: false })} />
    ) : (
      <img src={unreadEmail} alt="mail unread icon" className="email-actions-unread-mail"
        onClick={() => onApdateEmail({ ...email, isRead: true })} />
    )
  }


  return (
  
      <div className="email-actions">
        {/* remove */}
        <img src={deleteEmil} alt="mail delete icon" className="email-actions-delete-email"
          onClick={() => onRemoveEmail(email.id)} />

        {/* read-unread */}
        {renderReadUnreadIcon(email)}
      </div>

  )
}