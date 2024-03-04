import { CheckBox } from "./CheckBox";
import { StarMarker } from "./StarMarker";


export function EmailPreview({email}){

  function formattedDate(sentAt){
    return new Date(sentAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  }

  return(
    <article className="email-preview">
      <CheckBox email={email}/>
      <StarMarker />
      <div className="email-preview-from">{email.from}</div>
      <div className="email-preview-subject">{email.subject}</div>
      <div className="email-preview-sent-at">{formattedDate(email.sentAt)}</div>
    </article>
  )
}