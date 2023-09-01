<script setup>
// import ListForm from "./components/ListForm.vue";
import { ref, onMounted, computed, watch } from "vue";

//the state of the list and the items that is going to be listed in the array
const cardList = ref([]);
//the state of the input of where the name is gonna be
const name = ref("");

//the state of the input in our text area
const inputContent = ref("");
//the state of the selection of the categories in where the items are gonna be highlighted
const inputCategory = ref(null);

//how the array items are going to be organized
const cardListAcs = computed(() =>
  cardList.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

const addCard = () => {
  console.log(inputContent.value)
  if(inputContent.value.trim() === '' || inputCategory.value === null){
    return 
  }

  cardList.value.push({
    content: inputContent.value,
    category: inputCategory.value,
    obtain: false,
    createdAt: new Date().getTime()
  })
}

const removeCard = (cards) => {
  cardList.value = cardList.value.filter((t) => t !==cards)
}

watch(cardList, newVal => {
  localStorage.setItem('cardList', JSON.stringify(newVal))
}, { deep: true })

//watches the input of the name and stores that input in the comps local storage
watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

//keeps track and brings back the inputted name when the app refreshes
onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  cardList.value = JSON.parse(localStorage.getItem('cardList')) || []
});
</script>

<template>
  <header class="container text-center">
    <!-- Something for the header. -->
    <AppHeader />
  </header>

  <main class="container text-center">
    <!-- Something for the body -->
    <section class="row">
      <form @submit.prevent="addCard">
        <label for="mtgCard">
          <input
            type="text"
            name="mtgCard"
            id="mtgCard"
            placeholder="e.g Sol Ring"
            v-model="inputContent"
          />
        </label>

        <section class="text-center row">
          <label class="form-check-label col">
            <input
              class="form-check-input"
              type="radio"
              name="mtgWant"
              value="want"
              v-model="inputCategory"
            />
            <div>Want</div>
          </label>

          <label class="form-check-label col">
            <input
              class="form-check-input"
              type="radio"
              name="mtgNeed"
              value="need"
              v-model="inputCategory"
            />
            <div>Need</div>
          </label>
        </section>

        <input class="btn btn-primary" type="submit" value="Add Card" />
      </form>
    </section>

    <section class="container row ">
      <h4>What is on the list?</h4>

      <!-- <SearchBar /> -->

      <!-- Cards that hold the List -->
      <section class="container row">
      
        <div v-for="cards in cardListAcs" :class="`${cards.obtain && 'obtain'} ${cards.category} row g-3`">
          <label class="col p-1">
						<input type="checkbox" v-model="cards.obtain" />
						
					</label>

          <div class="col p-1">
            <p>{{cards.content}}</p>
          </div>

          <div class="col">
            <button class="delete btn btn-secondary" @click="removeCard(cards)">remove</button>
          </div>

        </div>

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
  border:1px solid brown;
}
</style>
