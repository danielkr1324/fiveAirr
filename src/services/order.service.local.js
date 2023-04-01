// import { httpService } from './http-service'
import { storageService } from './async-storage.service.js'

// import { userService } from './user-service'
import { userService } from './user.service.local.js'

import { utilService } from './util.service.js'

// import { store } from '../store/store.js'
import { socketService } from './socket.service.js'
import { orderStore } from '../store/order.store.js'

const ORDER_STORAGE_KEY = 'order'
const orderChannel = new BroadcastChannel('orderChannel')

// const ORDER_URL = 'order/'

// ;(() => {
//   setTimeout(() => {
//     socketService.on('new-order-seller', (order) => {
//       store.commit({ type: 'saveOrder', order })
//     })

//     socketService.on('new-order-buyer', (order) => {
//       store.commit({ type: 'saveOrder', order })
//     })

//     socketService.on('order-changed-status', (order) => {
//       store.commit({ type: 'saveOrder', order })
//     })
//   }, 0)
// })()

export const orderService = {
  save,
  query,
  getById,
  remove,
  getOrders
}



async function getOrders() {
  return await JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY))
}

async function query() {
  // return httpService.get(ORDER_URL)
  return await storageService.query(ORDER_STORAGE_KEY)
  // var orders = await storageService.query(ORDER_STORAGE_KEY)
}
async function getById(orderId) {
  // return httpService.get(ORDER_URL + orderId)
  var order = await storageService.get(ORDER_STORAGE_KEY, orderId)
  return order
}
async function remove(orderId) {
  // await httpService.delete(ORDER_URL + orderId)
  await storageService.delete('order', orderId)
  // orderChannel.postMessage({type: 'removeOrder', orderId})
}
async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(ORDER_STORAGE_KEY, order)
    // savedOrder = await httpService.put(ORDER_URL + order._id, order)
  } else {
    // Later, owner is set by the backend
    order.buyer = await userService.getLoggedinUser()
    savedOrder = await storageService.post(ORDER_STORAGE_KEY, order)
    // savedOrder = await httpService.post(ORDER_URL, order)
  }
  return savedOrder
}

const order =
{
  _id: "o1225",
  status: "pending",
  buyer: {
    _id: "123ab",
    username: "raji",
    fullname: "raji",
    imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
  },
  seller: {
    _id: "u101",
    username: "rashin07",
    fullname: "Rashin",
    imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
  },
  gig: {
    _id: "i101",
    name: "Design Logo",
    price: 20
  }
}



function _createOrders() {
  let orders = []
  orders = utilService.loadFromStorage(ORDER_STORAGE_KEY)
  if (!orders || !orders.length) {
    orders = order
    storageService.post(ORDER_STORAGE_KEY, orders)
  }
}
_createOrders()
