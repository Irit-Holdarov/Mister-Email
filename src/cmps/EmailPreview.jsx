import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

import { GoStarFill } from "react-icons/go"

import { CheckBox } from "./CheckBox"
import { EmailActions } from "./EmailActions"

export function EmailPreview({ email, onUpdateStar, onRemoveEmail, onUpdateEmail }) {
  const params = useParams()
  const navigate = useNavigate()

  function formattedDate(sentAt) {
    const date = new Date(sentAt);
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options);
  }

  function senderNameFrom() {
    return email.from.split('@')[0]
  }

  function senderNameTo() {
    return email.to.split('@')[0]
  }

  function determineSenderName() {
    let senderName
    if (params.folder === 'sent') {
      senderName = `to: ${senderNameTo(email)}`
    } else if (params.folder === 'drafts') {
      senderName = 'Draft'
    } else if (params.folder === 'trash' && email.isDraft) {
      senderName = 'Draft'
    } else {
      senderName = senderNameFrom(email);
    }
    return senderName
  }

  const senderName = determineSenderName()

  function onPreviewLink() {
    let previewLink = `/email/${params.folder}`
    if (email.isDraft) {
      previewLink += `/?compose=${email.id}`
    } else {
      previewLink += `/${email.id}`
    }
    navigate(previewLink)
  }

  return (
    <article className={`email-preview grid ${email.isRead ? 'read' : ''}`}>
      <div className="email-actions-start grid">
        <CheckBox email={email} />
        <GoStarFill className={`star-marker ${email.isStarred ? 'star-marked' : ''}`}
          onClick={() => { onUpdateStar(email) }} />
      </div>

      <div className="email-link" onClick={onPreviewLink}>
        <div className="email-link-grid">
          <div className={`${senderName === 'Draft' ? 'draft-style' : 'email-preview-name'}`}>
            {senderName}
          </div>
          <div className="email-preview-subject">{email.subject}</div>
          <div className="email-preview-body">{email.body}</div>
        </div>
      </div>

      <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>

      <EmailActions onRemoveEmail={onRemoveEmail} onUpdateEmail={onUpdateEmail} email={email} />
    </article>
  )
}