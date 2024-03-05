import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { AppEmailHeader } from "../cmps/AppEmailHeader"
import { Outlet } from "react-router-dom"
import { SideBar } from "../cmps/SideBar"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)

  useEffect(() => {
    loadEmails()
  }, [])



  async function loadEmails() {
    try {
      const emails = await emailService.query()
      setEmails(emails)
    } catch (err) {
      console.log('Error in loadEmails', err)
    }
  }


  async function onRemoveEmail(emailId) {
    try {

      await emailService.remove(emailId)

      setEmails((prevEmails) => {
        return prevEmails.filter(email => email.id != emailId)
      })

    } catch (err) {
      console.log("Error in onRemoveEmail", err)
    }
  }

  console.log('emails:', emails)
  if (!emails) return <div>Loading...</div>
  return (
    <div className="email-index">
      <AppEmailHeader />
      <SideBar />
      {/* צריך לעשות תנאי שאם לוחצים על איידי מסוים כלומר יש איידי בנתיב אז שיעבור לאיידי ואם לא אז שיציג את הרשימה */}
      {/* <EmailList emails={emails} /> <Outlet /> */}

      <EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
    </div>
  )
}