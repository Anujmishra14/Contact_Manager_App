import {configureStore} from '@reduxjs/toolkit'
import contactReducer from '../store/ContactSlice'

const store =configureStore({
    reducer:{
        contacts:contactReducer,
    }
})

export default store;
