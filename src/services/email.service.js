import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefualtEmail,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'

var loggedinUser = {
    email: 'irit.holdarov@gmail.com',
    fullname: 'Irit Holdarov',
};

_createEmails()


async function query() {
    const emails = await storageService.query(STORAGE_KEY);
    return emails
}


// async function query(filterBy) {
//     const emails = await storageService.query(STORAGE_KEY);
//      if (filterBy) {
//          const { status , txt, isRead} = filterBy;

//          switch (status) {
//             case 'inbox':
//               return filterEmails(emails, 'inbox', isRead);
//             case 'sent':
//               return filterEmails(emails, 'sent', isRead);
//             case 'star':
//               // Implement star filtering logic if needed
//               break;
//             case 'trash':
//               // Implement trash filtering logic if needed
//               break;
//             default:
//               // Handle other cases or return all emails
//               return emails;
//           }

//          //Filter for isRead
//          if (isRead !== null) {
//             return emails.filter((email) => email.folder === folder && email.isRead === (isRead === "Read"));
//           } else {
//             return emails.filter((email) => email.folder === folder);
//           }
//         }


//     return emails;
// }


// async function query(filterBy) {
//     const emails = await storageService.query(STORAGE_KEY);
//     if (filterBy) {
//         const { status, txt, isRead } = filterBy;

//         // Filter for isRead
//         if (isRead !== null) {
//             return emails.filter((email) => {
//                 const isReadFilter = isRead === "true" ? true : (isRead === "false" ? false : null);
//                 return email.status === status && (isReadFilter === null || email.isRead === isReadFilter);
//             });
//         } else {
//             return emails.filter((email) => email.status === status);
//         }
//     }

//     return emails;
// }


function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null
    }
}




function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}


function getDefualtEmail(subject = '', body = '', to = '') {
    return {

        subject,
        body,
        isRead: false,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to,
    };
}


function _makeId() {
    const emails = utilService.loadFromStorage(STORAGE_KEY) || [];
    const lastId = emails.reduce((maxId, email) => {
        const num = parseInt(email.id.slice(1));
        return num > maxId ? num : maxId;
    }, 0);
    const nextId = lastId + 1;

    return 'e' + nextId;
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
            }

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




