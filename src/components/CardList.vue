<script>
// import { ref, onMounted, computed, watch } from "vue";
import cardListAcs from "../scriptSetup";
</script>

<template>
  <section class="container row">
    <div
      v-for="cards in cardListAcs"
      :class="`${cards.obtain && 'obtain'} ${cards.category} row g-3`"
    >
      <label class="col p-1">
        <input type="checkbox" v-model="cards.obtain" />
        <!-- <span :class="`bubble ${
                    cards.category == 'want' 
                        ? 'want' 
                        : 'need'
                }`"></span> -->
      </label>

      <div class="col p-1">
        <p>{{ cards.content }}</p>
      </div>

      <div class="col">
        <button class="delete btn btn-secondary" @click="removeCard(cards)">
          remove
        </button>
      </div>
    </div>
  </section>
</template>
