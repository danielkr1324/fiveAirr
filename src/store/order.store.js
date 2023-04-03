import { orderService } from '../services/order.service.local.js'
import { userStore } from './user.store.js'

export const orderStore = {
  state: {
    orders: [],
  },

  getters: {
    sellerOrders({ orders }) {
      // console.log(orders);
      const filteredOrders = orders.filter(
        order => order.seller._id === userStore.state.loggedinUser._id
      )
      return filteredOrders
    },

    buyerOrders({ orders }) {
      const filteredOrders = orders.filter(
        order => order.buyer._id === userStore.state.loggedinUser._id
      )
      return filteredOrders
    },
  },

  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders
    },

    saveOrder(state, { order }) {
      const idx = state.orders.findIndex(o => o._id === order._id)
      if (idx !== -1) {
        state.orders.splice(idx, 1, order)
        return
      }
      state.orders.unshift(order)
    },

    removeOrder(state, { orderId }) {
      state.orders = state.orders.filter(order => order._id !== orderId)
    },
  },

  actions: {
    async saveOrder(context, { order }) {
      try {
        console.log('order : ', order)
        order = await orderService.save(order)
        context.commit({ type: 'saveOrder', order })
        return order
      } catch (err) {
        console.log('orderStore: Error in addOrder', err)
        throw err
      }
    },

    async loadOrders(context) {
      try {
        const orders = await orderService.query()
        // console.log(orders);
        context.commit({ type: 'setOrders', orders })
      } catch (err) {
        console.log('orderStore: Error in loadOrders', err)
        throw err
      }
    },

    async removeOrder(context, { orderId }) {
      try {
        await orderService.remove(orderId)
        context.commit({ type: 'removeOrder', orderId })
      } catch (err) {
        console.log('orderStore: Error in removeOrder', err)
        throw err
      }
    },
  },
}
