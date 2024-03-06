import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    _createEmails
}

const STORAGE_KEY = 'emails'

const loggedinUser = {
    email: 'irit.holdarov@gmail.com',
    fullname: 'Irit Holdarov',
};

_createEmails()


async function query() {
    const emails = await storageService.query(STORAGE_KEY);
    return emails;
}

// async function query(filterBy) {
//     const emails = await storageService.query(STORAGE_KEY)
//     if (filterBy) {
//         var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy
//         maxBatteryStatus = maxBatteryStatus || Infinity
//         minBatteryStatus = minBatteryStatus || 0
//         emails = emails.filter(robot => robot.type.toLowerCase().includes(type.toLowerCase()) && robot.model.toLowerCase().includes(model.toLowerCase())
//             && (robot.batteryStatus < maxBatteryStatus)
//             && robot.batteryStatus > minBatteryStatus)
//     }
//     return emails
// }

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

function getDefaultFilter(){
    return {
        subject: '',
        body:'',
        isRead: false,
        isStarred: false,
        from: '',
        to: '',
    }
}

function createEmail(subject = '', body = '', to = '') {
    return {
        id: utilService.makeId(),
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

        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




