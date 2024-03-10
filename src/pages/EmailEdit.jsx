

import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

import deleteIcon from "../assets/imgs/delete_composs.png"
import { useState } from "react";
import { emailService } from "../services/email.service";


export function EmailEdit() {

  const [email, setEmail] = useState(emailService.getDefualtEmail)
  const navigate = useNavigate()
  const params = useParams()


  const context = useOutletContext()

  console.log("email", email)

  function handelChange({ target }) {
    const { type, value, name: field } = target
    console.log('field:', field)
    console.log('value:', value)

    setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
  }


  async function onSaveEmail(ev) {
    ev.preventDefault()
    try {
      await context.onAddEmail(email)
      //QQQQQQQQQQQQQQQ In the url above, change to #/email/undefined
      navigate(`/email/${params.folder}`)
    } catch (err) {
      console.log("Had issues saving email", err)
    }
  }


  return (
    <section className="email-edit">

      <div className="email-edit-tool-bar">
        <div>New Message</div>
        {/* <Link  to={`/email${params.folder}`}> */}
          <button className="close-btn">X</button>
        {/* </Link> */}
      </div>

      <form onSubmit={onSaveEmail}>
        <div className="email-edit-to">
          <label htmlFor="to">To  </label>
          <textarea id="to" name="to" value={email.to} onChange={handelChange}></textarea>
        </div>

        <div className="email-edit-subject">
          <label htmlFor="subject">Subject  </label>
          <textarea id="subject" name="subject" value={email.subject} onChange={handelChange}></textarea>
        </div>

        <div className="email-edit-body-email">
          <label htmlFor="body"></label>
          <textarea id="body" name="body" value={email.body} onChange={handelChange}></textarea>
        </div>


        <div className="email-edit-actions">
          <button className="email-edit-send-btn">Send</button>
          <img className="email-edit-delete-btn" src={deleteIcon} alt="delete-img" />
        </div>
      </form>



    </section>
  )
}