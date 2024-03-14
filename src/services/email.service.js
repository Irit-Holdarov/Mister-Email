import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefualtEmail,
    getDefaultFilter,
    getFilterFromParams,
}

const STORAGE_KEY = 'emails'

var loggedinUser = {
    email: 'irit.holdarov@gmail.com',
    fullname: 'Irit Holdarov',
};

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const lowerTxt = filterBy.txt.toLowerCase()
        emails = emails.filter(email => {
            return (
                email.subject.toLowerCase().includes(lowerTxt) ||
                email.from.toLowerCase().includes(lowerTxt) ||
                email.body.toLowerCase().includes(lowerTxt)
            )
        })
    }

    if (filterBy.isRead !== null) {
        emails = emails.filter(email => email.isRead === filterBy.isRead)
    }

    if (filterBy.isStarred !== null) {
        emails = emails.filter(email => email.isStarred === filterBy.isStarred)
    }

    if (filterBy.status) {
        switch (filterBy.status) {
            case 'inbox':
                emails = emails.filter(email => email.to === loggedinUser.email && !email.removedAt);
                break
            case 'sent':
                emails = emails.filter(email => email.from === loggedinUser.email && email.sentAt !== null && !email.removedAt);
                break
            case 'starred':
                emails = emails.filter(email => email.isStarred && !email.removedAt);
                break
            case 'drafts':
                emails = emails.filter(email => email.sentAt === null && !email.removedAt);
                break
            case 'trash':
                emails = emails.filter(email => email.removedAt);
                break
            default:
                break
        }
    }
    return emails
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStarred: null,
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

async function remove(id) {
    const email = await storageService.get(STORAGE_KEY, id);
    if (email.removedAt) {
        await storageService.remove(STORAGE_KEY, id);
        showSuccessMsg('Email deleted.')
    } else {
        email.removedAt = Date.now();
        await storageService.put(STORAGE_KEY, email);
        showSuccessMsg('Email moved to trash.')
    }
    return email;
}

//לעדכן את התנאים 
function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefualtEmail(subject = '', body = '', to = '') {
    return {
        subject,
        body,
        isRead: true,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to,
    };
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                isStarred: false,
                sentAt: 1680642000000,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e102',
                subject: 'Top Brands',
                body: 'Top items and promotions up to 15% off',
                isRead: false,
                isStarred: true,
                sentAt: 1709244000000,
                removedAt: null,
                from: 'aliexpres@aliexpres.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e103',
                subject: 'I Love You!',
                body: 'I would love to meet sometime',
                isRead: false,
                isStarred: false,
                sentAt: 1704146400000,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e104',
                subject: 'Hi',
                body: 'Would you like to talk?',
                isRead: true,
                isStarred: true,
                sentAt: 1679436000000,
                removedAt: null,
                from: 'angel@angel.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e105',
                subject: 'BayYour account is being used from a new device',
                body: `Hi Irit,
                Signed in to your Netflix account from a new device,
                If it is you or one of your household members:
                pleasant viewing!
                If it is someone else:
                It is important to remember that the use of your account is allowed only to members of your household`,
                isRead: false,
                isStarred: true,
                sentAt: 1684230420000,
                removedAt: null,
                from: 'Netflix@Netflix.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e106',
                subject: 'Accepting a purchase on Wolt',
                body: `Irit, how nice that you ordered. Here is your receipt:

                Nate Cookie 🍪 | Tel Aviv`,
                isRead: true,
                isStarred: false,
                sentAt: 1708608120000,
                removedAt: null,
                from: 'wolt@wolt.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e107',
                subject: 'Security alert',
                body: `New Windows login. 
                We've detected a new sign-in to your Google Account on your Windows device.
                 If you are logged in, there is no need to do anything.
                  If not, we'll help you secure your account.`,
                isRead: true,
                isStarred: true,
                sentAt: 1718608120000,
                removedAt: null,
                from: 'google@accounts.google.com',
                to: 'irit.holdarov@gmail.com',
            },
            {
                id: 'e108',
                subject: 'Hi',
                body: 'Would you like to talk?',
                isRead: true,
                isStarred: true,
                sentAt: 1679436000000,
                removedAt: null,
                from: 'irit.holdarov@gmail.com',
                to: 'angel@angel.com',
            },
            {
                id: 'e109',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                isStarred: false,
                sentAt: 1680642000000,
                removedAt: 1679436000000,
                from: 'irit.holdarov@gmail.com',
                to: 'momo@momo.com',
            },
            {
                id: 'e110',
                subject: 'draft',
                body: 'draft',
                isRead: true,
                isStarred: false,
                sentAt: null,
                removedAt: null,
                isDraft: true,
                from: 'irit.holdarov@gmail.com',
                to: 'shosh@gmail.com',
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}