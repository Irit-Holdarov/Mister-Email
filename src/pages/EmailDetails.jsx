import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { CgMailReply } from "react-icons/cg";

import { emailService } from "../services/email.service"


export function EmailDetails() {
  const [email, setEmail] = useState(null)
  const params = useParams()
  console.log(params)

  const navigate = useNavigate()

  useEffect(() => {
    loadEmail()
  }, [])


  async function loadEmail() {
    try {
      const email = await emailService.getById(params.mailId)
      setEmail(email)
    } catch (err) {
      navigate('/email/:folder')
      console.log('Error in loadEmail', err)
    }
  }

  console.log(email)

  function timeForDate(timeStamp) {
    const date = new Date(timeStamp)
    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    return formattedDate
  }

  if (!email) return <div>Loading...</div>
  return (
    <section className="email-details">
      <Link to='/email/:folder' title="Go Back" className="go-back">
        <CgMailReply />
      </Link>

      <header className="head-email">
        <div className="email-details-subject">{email.subject}</div>
        <div className="email-details-sent-at">{timeForDate(email.sentAt)}</div>
      </header>

      <div className="email-details-from"><span>From: </span>{email.from}</div>
      <div className="email-details-to"><span>To: </span>{email.to}</div>
      <div className="email-details-body">{email.body}</div>
    </section>
  )
}