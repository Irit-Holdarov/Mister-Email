import { EmailPreview } from "./EmailPreview";



export function EmailList({ emails, onRemoveEmail, onApdateEmail}) {

  // function onUpdateReadEmail(email){
  //   const newEmail = {...email, isRead: true}
  //   onApdateEmail(newEmail)
  // }


  function onUpdateStar(email){
    const newEmail = {...email, isStarred: !email.isStarred}
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
            // onUpdateReadEmail={onUpdateReadEmail}
            onRemoveEmail={onRemoveEmail}
            onApdateEmail={onApdateEmail}
            />
          </li>)
      }
    </ul>
  )
}