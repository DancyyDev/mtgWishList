<script setup>
import { ref, onMounted, computed, watch } from "vue";

// const searchCard = ref("");
const cardGallery = ref([]);
const inputCardName = ref("");

//add clicked card to wish list//
const addToList = () => {
    return
}

const findCard = () => {
  if (inputCardName.value.trim() === "") {
    return;
  }

  fetch(`https://api.scryfall.com/cards/search?q=${inputCardName.value}`)
    .then((response) => response.json())
    .then((results) => {
      return results.data.map((x) =>
        cardGallery.value.push({
          cardName: x.name,
          cardImg: x.image_uris.small,
        })
      );
    });
  console.log(cardGallery);
};
</script>

<template>
  <div>
    <form @submit.prevent="findCard">
      <label for="findCard">
        <input
          type="text"
          name="mtgCard"
          id="mtgCard"
          placeholder="Type in Card name to find"
          v-model="inputCardName"
        />
      </label>
    </form>
    <div class="container row align-items-start">
      <div v-for="cards in cardGallery" class="col">
        <div >
          <p>{{ cards.cardName }}</p>
          <img :src="`${cards.cardImg}`" alt="cards.cardName" @click="addToList"/>
        </div>
      </div>
    </div>
  </div>
</template>
