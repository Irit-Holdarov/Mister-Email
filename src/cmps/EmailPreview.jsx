import { Link } from "react-router-dom";

import { StarMarker } from "./StarMarker";

import { CheckBox } from "./CheckBox";


export function EmailPreview({ email }) {

  function formattedDate(sentAt) {
    return new Date(sentAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <article className={`email-preview ${email.isRead ? 'read' : ''}`}>
      <CheckBox email={email} />
      <StarMarker />
      <Link to={`/email/:folder/${email.id}`} className="email-link">
        <div className="email-link-grid">
          <div className="email-preview-from">{email.from}</div>
          <div className="email-preview-subject">{email.subject}</div>
          <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>
        </div>
      </Link>
    </article>
  )
}