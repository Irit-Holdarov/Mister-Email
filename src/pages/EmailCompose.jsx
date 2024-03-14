import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import deleteIcon from "../assets/imgs/delete_composs.png"

import { emailService } from "../services/email.service";
import { showErrorMsg } from "../services/event-bus.service";

export function EmailCompose({ onAddEmail, onApdateEmail }) {
  const [email, setEmail] = useState(emailService.getDefualtEmail)
  const navigate = useNavigate()
  const { folder, emailId } = useParams()

  //התנאי לא טוב כי בכל מקרה יש איידי למייל. 
  useEffect(() => {
    if (emailId) loadEmail()
  }, [])

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId)
      setEmail(email)
    } catch (err) {
      console.log("Had issues loading email", err)
    }
  }

  function handelChange({ target }) {
    const { value, name: field } = target
    setEmail(prevEmail => ({ ...prevEmail, [field]: value }))
  }

  async function onSaveEmail(ev) {
    ev.preventDefault()
    try {
      const updateEmail = { ...email, sentAt: Date.now(), isDraft: false }
      if (email.id) await onApdateEmail(updateEmail)
      else await onAddEmail(updateEmail)
      showSuccessMsg('Email sent.')
      navigate(`/email/${folder}`)
    } catch (err) {
      console.log("Had issues saving email", err)
      showErrorMsg('Email not send.')
    }
  }
  
  async function onSaveEmailToDrafts() {
    try {
      if (email.to.trim() !== "" || email.subject.trim() !== "" || email.body.trim() !== "") {
        await onAddEmail({ ...email, isDraft: true });
        showSuccessMsg('Email moved to drafts.')
      }
    } catch (error) {
      console.error("Error saving email to drafts:", error);
      showErrorMsg('Email could not moved to drafts.')
    }
  }

  return (
    <section className="email-compose">
      <div className="email-compose-tool-bar">
        <div>New Message</div>
        <Link to={`/email/${folder}`}>
          <button className="close-btn" onClick={onSaveEmailToDrafts}>X</button>
        </Link>
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