import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IoMdArrowBack } from "react-icons/io";
import user from "../assets/imgs/user.png"
import { emailService } from "../services/email.service"


export function EmailDetails() {
  const [email, setEmail] = useState(null)
  const params = useParams()
  console.log('params:', params)

  const navigate = useNavigate()

  useEffect(() => {
    loadEmail()
  }, [])


  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId)
      email.isRead = true
      emailService.save(email)
      setEmail(email)
    } catch (err) {
      navigate(`/email/${params.folder}`)
      console.log('Error in loadEmail', err)
    }
  }

  function senderNameTo() {
    return email.to.split('@')[0];
  }

  function senderNameFrom() {
    return email.from.split('@')[0];
  }



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

      <div className="email-details-tool-bar">
        <Link to={`/email/${params.folder}`} title="Go Back" className="go-back">
          <IoMdArrowBack />
        </Link>
      </div>
      
      <div className="email-details-subject">{email.subject}</div>

      <div className="head-email">
        <img className="user-img" src={user} alt="user-img" />

        <div className="email-from-container">
          <span className="email-details-from-name">{senderNameFrom(email.to)} </span>
          <span className="email-details-from">&lt;{email.from}&gt;</span>

          <div className="email-details-to-name">{senderNameTo(email.to)}</div>
        </div>

        <div className="email-details-sent-at">{timeForDate(email.sentAt)}</div>
      </div>

      <div className="email-details-body">{email.body}</div>

    </section>
  )
}