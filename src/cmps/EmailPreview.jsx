import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { GoStarFill } from "react-icons/go";

import { CheckBox } from "./CheckBox";

import { IoTrashOutline } from "react-icons/io5";
import { IoMailOpen } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";


export function EmailPreview({ email, onUpdateStar, onUpdateReadEmail, onRemoveEmail, onApdateEmail }) {

  const params = useParams()

  function formattedDate(sentAt) {
    const date = new Date(sentAt);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  }


  function senderName() {
    return email.from.split('@')[0]
  }


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
    <article className={`email-preview grid ${email.isRead ? 'read' : ''}`}>
      <div className="email-actions-start grid">

        <CheckBox email={email} />

        <GoStarFill className={`star-marker ${email.isStarred ? 'star-marked' : ''}`}
          onClick={() => { onUpdateStar(email) }} />
      </div>

      <Link to={`/email/${params.folder}/${email.id}`} className="email-link">
        <div className="email-link-grid">
          <div className="email-preview-from-name">{senderName(email.from)}</div>
          <div className="email-preview-subject">{email.subject}</div>
          <div className="email-preview-body">{email.body}</div>
        </div>
      </Link>
      <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>
      <div className="email-actions">
        {/* remove */}
        <IoTrashOutline className="email-actions-delete-email"
          onClick={() => onRemoveEmail(email.id)} />

        {/* read-unread */}
        {renderReadUnreadIcon(email)}
      </div>


    </article>
  )
}