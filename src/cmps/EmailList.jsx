import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {

  function onUpdateStar(email) {
    const newEmail = { ...email, isStarred: !email.isStarred }
    onUpdateEmail(newEmail, false)

    if (newEmail.isStarred) {
      showSuccessMsg("Email starred.");
    } else {
      showSuccessMsg("Email unstarred.");
    }
  }

  return (
    <ul className="email-list">
      {
        emails.map(email =>
          <li key={email.id}>
            <EmailPreview
              email={email}
              onUpdateStar={onUpdateStar}
              onRemoveEmail={onRemoveEmail}
              onUpdateEmail={onUpdateEmail}
            />
          </li>)
      }
    </ul>
  )
}