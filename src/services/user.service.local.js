// import { storageService } from './async-storage.service'
// // import { httpService } from './http.service'
// import { utilService } from './util.service.js'
// import { store } from '../store/store'
// import {
//   socketService,
//   SOCKET_EVENT_USER_UPDATED,
//   SOCKET_EMIT_USER_WATCH,
// } from './socket.service'
// import { showSuccessMsg } from './event-bus.service'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const USER_STORAGE_KEY = 'user'

// export const userService = {
//   login,
//   logout,
//   signup,
//   getLoggedinUser,
//   saveLocalUser,
//   getUsers,
//   getById,
//   remove,
//   update,
//   changeScore,
// }

// window.userService = userService

// function getUsers() {
//   return storageService.query(USER_STORAGE_KEY)
//   // return httpService.get(`user`)
// }

// function onUserUpdate(user) {
//   showSuccessMsg(
//     `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
//   )
//   store.dispatch({ type: 'setWatchedUser', user })
// }

// async function getById(userId) {
//   const user = await storageService.get(USER_STORAGE_KEY, userId)
//   // const user = await httpService.get(`user/${userId}`)

//   socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
//   socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
//   socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

//   return user
// }
// function remove(userId) {
//   return storageService.remove(USER_STORAGE_KEY, userId)
//   // return httpService.delete(`user/${userId}`)
// }

// async function update({ _id, score }) {
//   const user = await storageService.get(USER_STORAGE_KEY, _id)
//   // let user = getById(_id)
//   user.score = score
//   await storageService.put(USER_STORAGE_KEY, user)

//   // user = await httpService.put(`user/${user._id}`, user)
//   // Handle case in which admin updates other user's details
//   if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//   return user
// }

// async function login(userCred) {
//   const users = await storageService.query(USER_STORAGE_KEY)
//   const user = users.find(user => user.username === userCred.username)
//   if (userCred.password !== user.password || userCred.username !== user.username) return
//   // const user = await httpService.post('auth/login', userCred)
//   if (user) {
//     socketService.login(user._id)
//     return saveLocalUser(user)
//   }
// }
// async function signup(userCred) {
//   if (!userCred.imgUrl)
//     userCred.imgUrl =
//       'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
//   const user = await storageService.post(USER_STORAGE_KEY, userCred)
//   console.log(user._id);
//   // const user = await httpService.post('auth/signup', userCred)
//   socketService.login(user._id)
//   console.log(user._id);
//   return saveLocalUser(user)
// }
// async function logout() {
//   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//   socketService.logout()
//   // return await httpService.post('auth/logout')
// }

// async function changeScore(by) {
//   const user = getLoggedinUser()
//   if (!user) throw new Error('Not loggedin')
//   user.score = user.score + by || by
//   await update(user)
//   return user.score
// }

// function saveLocalUser(user) {
//   user = {
//     _id: user._id,
//     fullname: user.fullname,
//     imgUrl: user.imgUrl,
//     score: user.score,
//   }
//   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//   return user
// }

// function getLoggedinUser() {
//   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
// }

// // ;(async ()=>{
// //     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
// //     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
// //     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// // })()

// // {
// //   username: 'rashin07',

// //   imgUrl:
// //     'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg',

// //   location: 'India',
// //   memberSince: 'March 2019',
// //   description:
// //     'I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get the global exposure and would like to contribute more towards our creative community. Thanks.',
// //   level: 3,
// //   rate: 5,
// //   avgResponseTime: 2,
// //   lastDelivery: 'about 22 minutes',
// // },

// var seller = {
//   _id: 'u101',
//   fullname: 'Rashin',
//   imgUrl:
//     'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg',
//   country: 'India',
//   joinedAt: 'March 2019',
//   description:
//     'Hello, My name is Rashin, I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get global exposure and would like to contribute more towards our creative community. Thanks.',
//   username: 'rashin07',
//   password: '1234',
//   level: 3,
//   rate: 5,
//   avgResponseTime: 2,
//   lastDelivery: 'about 22 minutes',
//   reviews: [
//     {
//       id: 'madeId',
//       gig: '{optional-mini-gig}',
//       txt: 'Very kind and works fast',
//       rate: 4,
//       by: {
//         _id: 'u102',
//         fullname: 'user2',
//         imgUrl: '/img/img2.jpg',
//       },
//     },
//   ],
// }

// _createUsers()

// function _createUsers() {
//   console.log('hi');
//   let users = []
//   users = utilService.loadFromStorage(USER_STORAGE_KEY)
//   if (!users || !users.length) signup(seller)
// }
