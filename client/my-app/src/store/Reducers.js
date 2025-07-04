import { combineReducers } from "redux";
import { userSlice } from "../slices/userSlice";
import { ticketSlice } from "../slices/ticketSlice";
import { projectSlice } from "../slices/projectSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    ticket: ticketSlice.reducer,
    project: projectSlice.reducer
})
