import { defineStore } from "pinia";
import { ref } from "vue";

const useNewCard = defineStore("newCard", () => {
    const state = ref({
        count: 0,
        user: "",
    });

    function increment() {
        state.value.count++;
    }

    function getUser(val) {
        state.value.user = val;
    }
    return { increment, getUser, state };
});

export default useNewCard;