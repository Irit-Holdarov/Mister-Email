import { Link } from "react-router-dom";

import { GoStarFill } from "react-icons/go";

import { CheckBox } from "./CheckBox";


export function EmailPreview({ email , onUpdateStar}) {

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

      <GoStarFill className={`star-marker ${email.isStarred ? 'star-marked' : ''}`}
      onClick={() => {onUpdateStar(email)}} />

      <Link to={`/email/:folder/${email.id}`} className="email-link" >
        <div className="email-link-grid">
          <div className="email-preview-from">{email.from}</div>
          <div className="email-preview-subject">{email.subject}</div>
          <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>
        </div>
      </Link>

      
    </article>
  )
}