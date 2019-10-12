import { combineReducers } from "redux";
import queryValues from  "./queryValues"
import eventResults from "./eventResults"

export default combineReducers({ queryValues, eventResults });
