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

const findCard = () => {
 
  fetch(`https://api.scryfall.com/cards/search?q=${inputCardName.value}`)
    .then((response) => response.json())
    .then((results) => {
        return results.data
        // return results.data.map((x) =>
        //   cardGallery.value.push({
        //     cardName: x.name,
        //     cardImg: x.image_uris,
        //   })
        // );
    });
};
 
async function loadGallery() {
    if (inputCardName.value.trim() === "") {
    return;
  }
    await fetch(`https://api.scryfall.com/cards/search?q=${inputCardName.value}`)
    .then((response) => response.json())
    .then((results) => {
        cardGallery = Array.from(results.data)
        cardGallery.forEach(x => console.log(x.name))
    });
    
}

</script>

<template>
  <div class="container row align-items-start">
    <div v-for="wish in cardWishList" class="col-3">
      <p>{{ wish.name }}</p>
      <button @click="removeCard(wish)">X</button>
    </div>
  </div>

  <div>
    <form @submit.prevent="loadGallery">
      <label for="findCard">
        <input
          type="text"
          name="mtgCard"
          id="mtgCard"
          placeholder="Type in Card name to find"
          v-model="inputCardName"
        />
      </label>
      <input class="btn btn-primary" type="submit" value="Search Card" />
    </form>
    <div class="container row align-items-start">
      <div v-for="cards in cardGallery" class="col-3">
        <div @click="addToList">
          <p>{{ cards.name }}</p>
          <img :src="`${cards.image_uris.small}`" :alt="`${cards.name}`" />
        </div>
      </div>
    </div>
  </div>
</template>
