import { Fragment } from "react/jsx-runtime";
import { dataMiniNav } from "../Interfaces/dataMiniNav";
import { Link } from "react-router-dom";

export default function MiniNav(){
    return(
        <Fragment>
            <div className="container-fluid">
            <div className="row bg-secondary py-2 px-lg-5">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                <div className="d-inline-flex align-items-center">
                   
                </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
                <div className="d-inline-flex align-items-center">
                    {
                        dataMiniNav.map((item:any) => (
                        <Link key={item.id} className="text-white px-3" to={item.url} target="_blank">
                        <i className={"fab "+item.icon}></i>
                        </Link>
                        ))
                    }
                    
                </div>
            </div>
            </div>
            </div>
        </Fragment>
    )
}