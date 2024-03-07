import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"

import { emailService } from "../services/email.service"

import { EmailList } from "../cmps/EmailList"
import { AppEmailHeader } from "../cmps/AppEmailHeader"
import { SideBar } from "../cmps/SideBar"
import { EmailFilter } from "../cmps/EmailFilter"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter)

  console.log(filterBy)


  const params = useParams()

  useEffect(() => {
    console.log('load mails');
    loadEmails()
  }, [])
  useEffect(() => {
    console.log('load mails for params');
    loadEmails()
  }, [params])


  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy)
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

  async function onApdateEmail(email) {
    try {
      const updateEmail = await emailService.save(email)
      setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === email.id ? updateEmail : currEmail))
    } catch (err) {
      console.log("Error in onApdateEmail", err)
    }
  }

  console.log('emails:', emails)
  if (!emails) return <div>Loading...</div>
  return (
    <div className="email-index">
      <AppEmailHeader />
      <EmailFilter />
      <SideBar />

      {params.emailId && <Outlet />}
      {!params.emailId &&
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onApdateEmail={onApdateEmail} />}
    </div>
  )
}