import { BrowserRouter, Routes ,Route} from "react-router-dom";
import App from "../App";
import { routes } from "./Routes";
import { Fragment } from "react";
export  function RoutesApp(){
    return(
        <Fragment>
                 <BrowserRouter>
                    <Routes>
                        {
                            routes.map((item) => (
                                <Route 
                                    key={item.to}
                                    path={item.path} 
                                    element={<item.Component/>}
                            /> 
                            ))
                        }
                    </Routes>
            </BrowserRouter>
        </Fragment>
    )
}