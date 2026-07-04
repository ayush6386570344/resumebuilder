import {configureStore} from '@reduxjs/toolkit'
import  authreducer from './features/authslice.js'
export const store = configureStore({
    reducer:{
        auth:authreducer
    }
})