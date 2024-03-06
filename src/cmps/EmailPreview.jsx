import { Link } from "react-router-dom";

import { GoStarFill } from "react-icons/go";

import { CheckBox } from "./CheckBox";


export function EmailPreview({ email , onUpdateStar, onUpdateReadEmail}) {

  function formattedDate(sentAt) {
    const date = new Date(sentAt);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  }


  function senderName(){
    return email.from.split('@')[0]
  }


  return (
    <article className={`email-preview ${email.isRead ? 'read' : ''}`}>
      <CheckBox email={email} />

      <GoStarFill className={`star-marker ${email.isStarred ? 'star-marked' : ''}`}
      onClick={() => {onUpdateStar(email)}} />

      <Link to={`/email/:folder/${email.id}`} className="email-link" 
      onClick={() => {onUpdateReadEmail(email)}}>
        <div className="email-link-grid">
          <div className="email-preview-from-name">{senderName(email.from)}</div>
          <div className="email-preview-subject">{email.subject}</div>
          <div className="email-preview-body">{email.body}</div>
          <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>
        </div>
      </Link>

      
    </article>
  )
}