
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
export const cardListAcs = computed(() =>
  cardList.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

const addCard = () => {
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

//keeps track and brings back the inpuitted name when the app refreshes
onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  cardList.value = JSON.parse(localStorage.getItem('cardList')) || []
});