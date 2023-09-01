<script setup>
import AppHeader from "./components/AppHeader.vue";
import SearchCardAdd from "./components/SearchCardAdd.vue";
</script>

<template>
  <header class="container text-center">
    <!-- Something for the header. -->
    <AppHeader />
  </header>

  <main class="container text-center">
    <!-- Something for the body -->
    <section class="container row">
      <h4>What is on the list?</h4>

      <!-- <SearchBar /> -->

      <!-- Cards that hold the List -->
      <section class="container row">

        <SearchCardAdd />

      </section>
    </section>
  </main>
</template>

<style scoped>
/* * {
  border: 1px solid lightgray;
} */
.obtain {
  text-decoration: line-through;
  color: darkgray;
}

.want {
  border: 1px solid aquamarine;
}

.need {
  border: 1px solid brown;
}
</style>
