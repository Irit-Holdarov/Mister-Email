import { EmailPreview } from "./EmailPreview";
// import { IoTrashOutline } from "react-icons/io5";


export function EmailList({emails, onRemoveEmail}){
  return(
    <ul className="email-list">
      {
        emails.map(email => 
        <li key={email.id}>
          <EmailPreview email={email}/>
          <div className="email-actions">
          {/* <IoTrashOutline /> */}
            <button className="delete-email"
            onClick={() => onRemoveEmail(email.id)}>X</button>
          </div>
         
        </li>)
      }
    </ul>
  )
}