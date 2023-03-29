import { gigService } from '../services/gig.service.local'
// import { gigService } from '../services/gig.service'

export function getActionRemoveGig(gigId) {
  return {
    type: 'removeGig',
    gigId,
  }
}
export function getActionAddGig(gig) {
  return {
    type: 'addGig',
    gig,
  }
}
export function getActionUpdateGig(gig) {
  return {
    type: 'updateGig',
    gig,
  }
}
// export function getActionAddGigMsg(gigId) {
//     return {
//         type: 'addGigMsg',
//         gigId,
//         txt: 'Stam txt'
//     }
// }

export const gigStore = {
  state: {
    gigs: [],
    filterBy: {
      sortBy: '',
      title: '',
      category: '',
      subCategory: '',
      min: null,
      max: null,
      delivery: '',
    },
  },
  getters: {
    filterBy({ filterBy }) {
      const filters = { ...filterBy }
      for (const key in filters) {
        if (!filters[key]) delete filters[key]
      }
      return filters
    },
    gigsByUser({ gigs }, rootGetters) {
      const user = rootGetters.loggedinUser
      var filteredGigs = gigs.filter((gig) => gig.owner._id === user._id)

      if (!filteredGigs.length) return []
      return filteredGigs
    },
    gigs({ gigs, filterBy }) {
      if (!gigs) return null

      var filteredGigs = gigs
      const regex = new RegExp(filterBy.title, 'i')
      filteredGigs = filteredGigs.filter(gig => regex.test(gig.title))

      if (filterBy.category)
        filteredGigs = filteredGigs.filter(
          gig => gig.category === filterBy.category
        )

      if (filterBy.subCategory)
        filteredGigs = filteredGigs.filter(
          gig => gig.subCategory === filterBy.subCategory
        )

      if (filterBy.min)
        filteredGigs = filteredGigs.filter(gig => gig.price >= filterBy.min)

      if (filterBy.max)
        filteredGigs = filteredGigs.filter(gig => gig.price <= filterBy.max)

      if (filterBy.delivery)
        filteredGigs = filteredGigs.filter(
          gig => gig.daysToMake <= filterBy.delivery
        )

      if (filterBy.sortBy === 'rating') {
        filteredGigs.sort((gig1, gig2) => gig2.owner.rate - gig1.owner.rate)
      }

      if (filterBy.sortBy === 'level') {
        filteredGigs.sort((gig1, gig2) => gig2.owner.level - gig1.owner.level)
      }

      return filteredGigs
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = { ...state.filterBy, ...filterBy }
    },
    setGigs(state, { gigs }) {
      state.gigs = gigs
    },
    addGig(state, { gig }) {
      state.gigs.push(gig)
    },
    updateGig(state, { gig }) {
      const idx = state.gigs.findIndex(c => c._id === gig._id)
      state.gigs.splice(idx, 1, gig)
    },
    removeGig(state, { gigId }) {
      state.gigs = state.gigs.filter(gig => gig._id !== gigId)
    },
    setCategoryFilterBy(state, { filterBy }) {
      console.log('filterBy', filterBy)
      state.filterBy.categories = filterBy
    },
    // addGigMsg(state, { gigId , msg}) {
    //     const gig = state.gigs.find(gig => gig._id === gigId)
    //     if (!gig.msgs) gig.msgs = []
    //     gig.msgs.push(msg)
    // },
  },
  actions: {
    async setCategoryFilter({ commit }, { filterBy }) {
      try {
        commit({ type: 'setCategoryFilterBy', filterBy })
        const gigs = await gigService.query(filterBy)
        // commit({ type: 'setToys', gigs })
      } catch (err) {
        console.error('Cannot set filter', err)
        throw err
      }
    },
    async addGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        console.log(gig, 'from store')
        context.commit(getActionAddGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in addGig', err)
        throw err
      }
    },
    async updateGig(context, { gig }) {
      try {
        gig = await gigService.save(gig)
        context.commit(getActionUpdateGig(gig))
        return gig
      } catch (err) {
        console.log('gigStore: Error in updateGig', err)
        throw err
      }
    },
    async loadGigs(context, { filterBy }) {
      try {
        const gigs = await gigService.query()
        context.commit({ type: 'setGigs', gigs })
      } catch (err) {
        console.log('gigStore: Error in loadGigs', err)
        throw err
      }
    },
    async removeGig(context, { gigId }) {
      try {
        await gigService.remove(gigId)
        context.commit(getActionRemoveGig(gigId))
      } catch (err) {
        console.log('gigStore: Error in removeGig', err)
        throw err
      }
    },
    // async addGigMsg(context, { gigId, txt }) {
    //     try {
    //         const msg = await gigService.addGigMsg(gigId, txt)
    //         context.commit({type: 'addGigMsg', gigId, msg })
    //     } catch (err) {
    //         console.log('gigStore: Error in addGigMsg', err)
    //         throw err
    //     }
    // },
  },
}
