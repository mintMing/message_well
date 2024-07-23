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

    function setUser(val) {
        state.value.user = val;
    }

    function getUser() {
        return state.value.user;
    }
    return { increment, setUser, getUser };
});

export default useNewCard;
