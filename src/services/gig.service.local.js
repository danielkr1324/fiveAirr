import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gig'

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  // addGigMsg
}
window.cs = gigService

async function query(filterBy = { txt: '', price: 0 }) {
  var gigs = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    gigs = gigs.filter(
      gig => regex.test(gig.title) || regex.test(gig.description)
    )
  }
  if (filterBy.price) {
    gigs = gigs.filter(gig => gig.price <= filterBy.price)
  }
  return gigs
}

function getById(gigId) {
  return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  console.log('local ss', gig)

  var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
}

// async function addGigMsg(gigId, txt) {
//     // Later, this is all done by the backend
//     const gig = await getById(gigId)
//     if (!gig.msgs) gig.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     gig.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, gig)

//     return msg
// }

function getEmptyGig() {
  return {
    // _id: utilService.makeId(),
    title: utilService.makeLorem(2),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// ;(async () => {
//   await storageService.post(STORAGE_KEY, {
//     title: 'I will do hyper realistic pencil portrait by hand drawing',
//     about:
//       "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
//     price: 172,
//     owner: {
//       fullname: 'frederickkessie',
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
//       level: 'basic/premium',
//       rate: 2,
//     },
//     country: 'Ghana',
//     daysToMake: 26,
//     description:
//       "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
//     imgUrl:
//       'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//     tags: [
//       'pencil drawing',
//       'realistic drawing',
//       'hand drawing',
//       'portrait drawing',
//       'pencil sketch',
//     ],
//     likedByUsers: ['mini-user'],
//     reviews: [
//       {
//         name: 'tobiaspille300',
//         country: 'Thailand',
//         flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png',
//         review:
//           'frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !',
//         reviewedAt: 'Published 2 months ago',
//       },
//       {
//         name: 'liam31',
//         country: 'United Kingdom',
//         flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//         review:
//           'I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!',
//         reviewedAt: 'Published 3 weeks ago',
//       },
//       {
//         name: 'liam31',
//         country: 'United Kingdom',
//         flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//         review:
//           'Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!',
//         reviewedAt: 'Published 3 weeks ago',
//       },
//       {
//         name: 'larsonraz',
//         country: 'United States',
//         flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//         review: 'Very detailed',
//         reviewedAt: 'Published 1 week ago',
//       },
//       {
//         name: 'stevekaszycki',
//         country: 'United States',
//         flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//         review: 'very nice portrait, very good quality.',
//         reviewedAt: 'Published 2 weeks ago',
//       },
//     ],
//   })
//   //   await storageService.post(STORAGE_KEY, {
//   //     title: 'Subali Rahok 2',
//   //     price: 240,
//   //   })
// })()
