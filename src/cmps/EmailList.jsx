import { EmailPreview } from "./EmailPreview";
import { IoTrashOutline } from "react-icons/io5";
import { IoMailOpen } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";


export function EmailList({ emails, onRemoveEmail, onApdateEmail}) {

  function onUpdateReadEmail(email){
    const newEmail = {...email, isRead: true}
    onApdateEmail(newEmail)
  }

  // function onUpdateUnreadEmail(email){
  //   const newEmail = {...email, isRead: false}
  //   onApdateEmail(newEmail)
  // }

  


  function onUpdateStar(email){
    const newEmail = {...email, isStarred: !email.isStarred}
    onApdateEmail(newEmail)
  }


  function renderReadUnreadIcon(email) {
    return email.isRead ? (
      <IoMailOpen className="read-mail" 
      onClick={() => onApdateEmail({ ...email, isRead: false })} />
    ) : (
      <IoMdMailUnread className="unread-mail" 
      onClick={() => onApdateEmail({ ...email, isRead: true })} />
    )
  }


  return (
    <ul className="email-list">
      {
        emails.map(email =>
          <li key={email.id}>
            <EmailPreview email={email} onUpdateStar={onUpdateStar} onUpdateReadEmail={onUpdateReadEmail}/>
            <div className="email-actions">
              {/* remove */}
              <IoTrashOutline className="delete-email" 
              onClick={() => onRemoveEmail(email.id)}/>

              {/* read-unread */}
              {/* <IoMailOpen className="read-mail" 
              onClick={()=> onUpdateReadEmail(email)}/>
              <IoMdMailUnread className="unread-mail"
              onClick={()=> onUpdateUnreadEmail(email)}/> */}
              {renderReadUnreadIcon(email)}
            </div>
            
          </li>)
      }
    </ul>
  )
}