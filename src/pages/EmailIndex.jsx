import { useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom"

import { emailService } from "../services/email.service"
import { showErrorMsg } from "../services/event-bus.service"

import { EmailList } from "../cmps/EmailList"
import { AppEmailHeader } from "../cmps/AppEmailHeader"
import { SideBar } from "../cmps/SideBar"
import { EmailFilter } from "../cmps/EmailFilter"

import { EmailCompose } from "./EmailCompose"


export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [draftsCount, setDraftsCount] = useState(0)
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter)
  // const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
  const params = useParams()

  useEffect(() => {
    // setSearchParams(filterBy)
    loadEmails()

    return () => {
      setEmails([])
    }
  }, [params.folder, filterBy])

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query({ ...filterBy, status: params.folder })
      setEmails(emails)
      if (params.folder === 'inbox') {
        const unread = emails.filter(email => !email.isRead).length
        setUnreadCount(unread)
      }
      if (params.folder === 'drafts') {
        const draftsCount = emails.filter(email => email.isDraft).length
        setDraftsCount(draftsCount)
      }
    } catch (err) {
      console.log('Error in loadEmails', err)
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      const removedEmail = await emailService.remove(emailId)
      setEmails((prevEmails) => {
        return prevEmails.filter(email => email.id != emailId)
      })
      if (removedEmail.isDraft) {
        setDraftsCount(prevDraftsCount => prevDraftsCount - 1);
      }
      if (removedEmail.removedAt && !removedEmail.isRead) {
        setUnreadCount(prevUnreadCount => prevUnreadCount - 1);
      }
    } catch (err) {
      console.log("Error in onRemoveEmail", err)
      showErrorMsg('Could not delete email.')
    }
  }

  async function onUpdateEmail(email, isReadToggle = true) {
    try {
      const updateEmail = await emailService.save(email)
      setEmails((prevEmails) => prevEmails.map(currEmail => currEmail.id === email.id ? updateEmail : currEmail))
      if (params.folder === 'starred' && !email.isStarred) {
        setEmails((prevEmails) => {
          return prevEmails.filter(email => email.isStarred)
        })
      }
      if (isReadToggle) {
        const updatedUnreadCount = updateEmail.isRead ? unreadCount - 1 : unreadCount + 1
        setUnreadCount(updatedUnreadCount)
      }

    } catch (err) {
      console.log("Error in onUpdateEmail", err)
    }
  }

  async function onAddEmail(email) {
    try {
      const saveEmail = await emailService.save(email)
      setEmails((prevEmails) => [...prevEmails, saveEmail])

      if (saveEmail.isDraft) {
        setDraftsCount(prevDraftsCount => prevDraftsCount + 1);
      }
    } catch (err) {
      console.log("Error in onAddEmail", err)
    }
  }

  const isCompose = searchParams.get('compose') || null

  if (!emails) return <div>Loading...</div>
  return (
    <div className="email-index">
      <AppEmailHeader />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <SideBar unreadCount={unreadCount} draftsCount={draftsCount} />
      {params.emailId && <Outlet />}
      {!params.emailId &&
        <EmailList
          emails={emails}
          onRemoveEmail={onRemoveEmail}
          onUpdateEmail={onUpdateEmail}
        />}
      {isCompose && <EmailCompose onAddEmail={onAddEmail} onUpdateEmail={onUpdateEmail} />}
    </div>
  )
}