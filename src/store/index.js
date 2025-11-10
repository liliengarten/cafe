import {reactive} from "vue";

export const store = reactive({
    userToken: '',

    setUserToken(token){
        this.userToken = token
        localStorage.setItem('userToken', token)
    }
})

