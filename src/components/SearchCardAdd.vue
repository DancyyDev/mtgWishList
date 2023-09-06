<script setup>
import { ref, onMounted, computed, watch } from "vue";

// const searchCard = ref("");
let cardGallery;
const cardWishList = ref([]);
const inputCardName = ref("");

//add clicked card to wish list
const addToList = (e) => {
  console.log(e.target.currentSrc);
  cardWishList.value.push({
    name: e.target.alt,
    content: e.target.src,
    obtain: false,
  });
  console.log(cardWishList);
};

const removeCard = (cards) => {
  cardWishList.value = cardWishList.value.filter((t) => t !== cards);
};

async function loadGallery() {
  if (inputCardName.value.trim() === "") {
    return;
  }
  await fetch(`https://api.scryfall.com/cards/search?q=${inputCardName.value}`)
    .then((response) => response.json())
    .then((results) => {
      cardGallery = Array.from(results.data);
      cardGallery.forEach(x => console.log(x.name))
    });
    inputCardName.value = ""
}

</script>

<template>

  <div class="container row align-items-start">
    <div v-for="wish in cardWishList" class="col-3">
      <p class="col">{{ wish.name }}</p>
      <button class="col" @click="removeCard(wish)">DEL</button>
    </div>
  </div>

  <div>
    <form @submit.prevent="loadGallery">
      <label for="loadGallery">
        <input
          type="text"
          name="mtgCard"
          id="mtgCard"
          placeholder="Search Card"
          v-model="inputCardName"
        />
      </label>
      <input class="btn btn-primary" type="submit" value="Search Card" />
    </form>

  </div>

  <div class="container row align-items-start">
    <div v-for="cards in cardGallery" class="col-3">
      <div @click="addToList">
        <p>{{ cards.name }}</p>
        <img :src="`${cards.image_uris.small}`" :alt="`${cards.name}`" />
      </div>
    </div>
  </div>

</template>
