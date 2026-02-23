import { Fragment } from "react/jsx-runtime";
import {dataNav} from '../Interfaces/dataNav'
export default function Nav(){
    return(
        <Fragment>
             <div className="col-lg-8 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            {
                                dataNav.map((item:any) =>(
                                    <div 
                                     key={item.id}
                                        className="d-inline-flex flex-column text-center px-3 border-right">
                                        <h6>{item.name}</h6>
                                        <p className="m-0">{item.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                </div>
        </Fragment>
    )
}