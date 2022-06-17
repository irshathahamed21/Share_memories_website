import React from "react"
import ReactDom from "react-dom"


import App from "./App.js"

import {createStore, applyMiddleware,compose} from "redux"
import {Provider} from "react-redux"

import thunk from "redux-thunk"
import { reducers } from "./reducers/index.js"
import "./index.css"

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDom.render(
<Provider store = {store}>
<App/>
</Provider>
, document.getElementById("root"))

