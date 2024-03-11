

import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";

import deleteIcon from "../assets/imgs/delete_composs.png"
import { useState, useEffect } from "react";
import { emailService } from "../services/email.service";


export function EmailCompose() {

  const [email, setEmail] = useState(emailService.getDefualtEmail)
  const navigate = useNavigate()

  const context = useOutletContext()

  const { folder, emailId } = useParams()

  //After I update the changes of the url
  // useEffect(() => {
  //   if (emailId) loadEmail()
  // }, [])


  // async function loadEmail() {
  //   try {
  //     const email = await emailService.getById(emailId)
  //     setEmail(email)
  //   } catch (err) {
  //     console.log("Had issues loading email", err)
  //   }
  // }





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
      if(email.id) await context.onApdateEmail(email)
      else await context.onAddEmail(email)
      //QQQQQQQQQQQQQQQ In the url above, change to #/email/undefined
      navigate(`/email/${params.folder}`)
    } catch (err) {
      console.log("Had issues saving email", err)
    }
  }


  return (
    <section className="email-compose">

      <div className="email-compose-tool-bar">
        <div>New Message</div>
        {/* <Link  to={`/email${folder}`}> */}
        <button className="close-btn">X</button>
        {/* </Link> */}
      </div>

      <form onSubmit={onSaveEmail}>
        <div className="email-compose-to">
          <label htmlFor="to">To  </label>
          <textarea id="to" name="to" value={email.to} onChange={handelChange}></textarea>
        </div>

        <div className="email-compose-subject">
          <label htmlFor="subject">Subject  </label>
          <textarea id="subject" name="subject" value={email.subject} onChange={handelChange}></textarea>
        </div>

        <div className="email-compose-body-email">
          <label htmlFor="body"></label>
          <textarea id="body" name="body" value={email.body} onChange={handelChange}></textarea>
        </div>


        <div className="email-compose-actions">
          <button className="email-compose-send-btn">Send</button>
          <img className="email-compose-delete-btn" src={deleteIcon} alt="delete-img" />
        </div>
      </form>



    </section>
  )
}