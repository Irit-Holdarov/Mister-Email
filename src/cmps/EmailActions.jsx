import { IoTrashOutline } from "react-icons/io5";
import { IoMailOpen } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";


export function EmailActions({ onRemoveEmail, onApdateEmail, email }) {

  function renderReadUnreadIcon(email) {
    return email.isRead ? (
      <IoMdMailUnread className="email-actions-read-mail"
        onClick={() => onApdateEmail({ ...email, isRead: false })} />
    ) : (
      <IoMailOpen className="email-actions-unread-mail"
        onClick={() => onApdateEmail({ ...email, isRead: true })} />
    )
  }


  return (
  
      <div className="email-actions">
        {/* remove */}
        <IoTrashOutline className="email-actions-delete-email"
          onClick={() => onRemoveEmail(email.id)} />

        {/* read-unread */}
        {renderReadUnreadIcon(email)}
      </div>

  )
}