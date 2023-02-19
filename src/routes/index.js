import { Route, Routes } from "react-router-dom"
import Main from "../pages/main/Main";
import { PAGE } from "../pages/pageConstants";
import Signin from "../pages/signin/Signin"
import Signup from "../pages/signup/Signup"

function MainRoutes() {
    return (
        <Routes>
            {/** Basic  Routes               */}
            <Route path={PAGE.LINK.SIGNIN}       element={<Signin/>} />
            <Route path={PAGE.LINK.SIGNUP}       element={<Signup/>} />
            {/** After Login Contents Routes */}
            <Route path={PAGE.LINK.HOME}         element={<Main page={PAGE.NAME.HOME}/>} />
            {/** Tasks  Routes               */}
            <Route path={PAGE.LINK.TASKS.INDEX}  element={<Main page={PAGE.NAME.TASKS.INDEX}/>} />
            <Route path={PAGE.LINK.TASKS.DETAIL} element={<Main page={PAGE.NAME.TASKS.DETAIL} /> }/>
            <Route path={PAGE.LINK.TASKS.CREATE} element={<Main page={PAGE.NAME.TASKS.CREATE} /> }/>
            <Route path={PAGE.LINK.TASKS.EDIT}   element={<Main page={PAGE.NAME.TASKS.EDIT} /> }/>
            
            <Route path={PAGE.LINK.PROFILE}      element={<Main page={PAGE.NAME.PROFILE}/>}/>
            <Route path={PAGE.LINK.PROJETCS}     element={<Main page={PAGE.NAME.PROJETCS}/>}/>
            <Route path={PAGE.LINK.CALENDAR}     element={<Main page={PAGE.NAME.CALENDAR}/>}/>
            {/** Admin Only Routes           */}
            <Route path={PAGE.LINK.USERS}        element={<Main page={PAGE.NAME.USERS}/>}/>
            <Route path={PAGE.LINK.DEPARTMENTS}  element={<Main page={PAGE.NAME.DEPARTMENTS}/>}/>
            <Route path={PAGE.LINK.POSITIONS}    element={<Main page={PAGE.NAME.POSITIONS}/>}/>
        </Routes>
    )
}

export default MainRoutes;