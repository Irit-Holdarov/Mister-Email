import readEmail from "../assets/imgs/read_email.png"
import unreadEmail from "../assets/imgs/unread_email.png"
import deleteEmil from "../assets/imgs/delete.png"

import { showSuccessMsg } from "../services/event-bus.service";

export function EmailActions({ onRemoveEmail, onUpdateEmail, email }) {

  function renderReadUnreadIcon(email) {
    const markAsRead = () => {
      onUpdateEmail({ ...email, isRead: true })
      showSuccessMsg("Email marked as read.")
    }

    const markAsUnread = () => {
      onUpdateEmail({ ...email, isRead: false })
      showSuccessMsg("Email marked as unread.")
    }

    return email.isRead ? (
      <img
        src={readEmail}
        alt="mail read icon"
        className="email-actions-read-mail"
        onClick={markAsUnread}
      />
    ) : (
      <img
        src={unreadEmail}
        alt="mail unread icon"
        className="email-actions-unread-mail"
        onClick={markAsRead}
      />
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