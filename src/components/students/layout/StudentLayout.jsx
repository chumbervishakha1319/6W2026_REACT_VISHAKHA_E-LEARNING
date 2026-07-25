import Studentfooter from "./Studentfooter";
import Studentheader from "./studentheader";
import { Outlet } from "react-router-dom";

import About from "../../about/About";

export default function StudentLayout(){
    return(

        <>
       <Studentheader></Studentheader>
       <Outlet></Outlet>

       <Studentfooter></Studentfooter>
        
        </>
    )
}