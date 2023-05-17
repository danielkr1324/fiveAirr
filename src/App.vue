<template>
  <section class="main-container">
    <AppHeader :isActiveOrders="this.isActiveOrders" @filter="setCategoryFilter" />
    <RouterView class="main-content" />
    <UserMsg />
    <AppFooter />
    <notifications />
  </section>
</template>

<script>
import { userService } from "./services/user.service";
// import { userService } from "./services/user.service.local";
import { store } from "./store/store";

import AppHeader from "./cmps/AppHeader.vue";
import AppFooter from "./cmps/AppFooter.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  created() {
    this.$store.dispatch({ type: "loadGigs", ...this.$route.query });
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });

    if (user) socketService.emit('set-user-socket', user)
    
    socketService.on('user-is-watching', (msg) => {
      // this.$notify({text:"User is watching", duration:6000});
    })
    socketService.on('user-ordered-gig', (msg) => {
      this.$notify({ text:"User ordered gig", duration:6000});
      this.isActiveDashboard = true
    })
    socketService.on('order-approved', (msg) => {
      this.$notify({text:"Order approved", duration:6000});
      this.isActiveOrders = true
    })
    socketService.on('order-status-update', (msg) => {
      this.$notify({text:"Order status update", duration:6000});
      this.isActiveOrders = true
    })

  },
    data() {
    return {
      isHeaderSticky: false,
      isActiveOrders: false,
      isActiveDashboard: false,
    }
  },
  
  methods: {
    setCategoryFilter(filterBy) {
      this.$store
        .dispatch({ type: "setCategoryFilter", filterBy })
        .catch(err => {
          showErrorMsg("Cannot set filter");
        });
    }
  },
  components: {
    AppHeader,
    UserMsg,
    AppFooter
  }
};
</script>