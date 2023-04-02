<template>
  <section class="main-container">
    <AppHeader @filter="setCategoryFilter" />
    <RouterView class="main-content" />
    <UserMsg />
    <AppFooter />
    <notifications position="bottom right"/>
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
    console.log("Vue App created");
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });

    if (user) socketService.emit('set-user-socket', user)
    
    socketService.on('user-is-watching', (msg) => {
      showSuccessMsg(msg)
    })
    socketService.on('user-ordered-gig', (msg) => {
      showSuccessMsg(msg)
      this.isActiveDashboard = true
    })
    socketService.on('order-approved', (msg) => {
      showSuccessMsg(msg)
      this.isActiveOrders = true
    })
    socketService.on('order-status-update', (msg) => {
      showSuccessMsg(msg)
      this.isActiveOrders = trues
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