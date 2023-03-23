<template>
  <section class="main-container">
    <AppHeader @filter="setCategoryFilter" />
    <RouterView />
    <UserMsg />
    <AppFooter />
  </section>
</template>

<script>
import { userService } from "./services/user.service";
import { store } from "./store/store";

import AppHeader from "./cmps/AppHeader.vue";
import AppFooter from "./cmps/AppFooter.vue";
import UserMsg from "./cmps/UserMsg.vue";

export default {
  created() {
    console.log("Vue App created");
    const user = userService.getLoggedinUser();
    if (user) store.commit({ type: "setLoggedinUser", user });
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