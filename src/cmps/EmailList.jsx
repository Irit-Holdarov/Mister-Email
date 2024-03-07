import { EmailPreview } from "./EmailPreview";



export function EmailList({ emails, onRemoveEmail, onApdateEmail }) {



  function onUpdateStar(email) {
    const newEmail = { ...email, isStarred: !email.isStarred }
    onApdateEmail(newEmail)
  }


  return (
    <ul className="email-list">
      <div>Here read/unread</div>
      {
        emails.map(email =>
          <li key={email.id}>
            <EmailPreview
              email={email}
              onUpdateStar={onUpdateStar}
              onRemoveEmail={onRemoveEmail}
              onApdateEmail={onApdateEmail}
            />
          </li>)
      }
    </ul>
  )
}