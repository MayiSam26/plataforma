import { Fragment } from "react/jsx-runtime";

export default function Info(){
    return(
        <Fragment>
            <div className="row py-2 m-auto">
                                <div className="col-sm-6">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                            <h1 className="flaticon-house font-weight-normal text-secondary m-0 mr-3"></h1>
                                            <h5 className="text-truncate m-0">Adopciones</h5>
                                        </div>
                                        <p>
                                            Dar un hogar a quienes nos necesitan.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                            <h1 className="flaticon-food font-weight-normal text-secondary m-0 mr-3"></h1>
                                            <h5 className="text-truncate m-0">Donaciones</h5>
                                        </div>
                                        <p>
                                            Tus generosidad salva vidas, ayudanos a seguir con nuestra metas!!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                            <h1 className="flaticon-grooming font-weight-normal text-secondary m-0 mr-3"></h1>
                                            <h5 className="text-truncate m-0">Apadrinamiento</h5>
                                        </div>
                                        <p className="m-0">
                                            Brinda amor distancia,transforma un dia comun en una historia extraordinaria
                                        </p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2">
                                            <h1 className="flaticon-toy font-weight-normal text-secondary m-0 mr-3"></h1>
                                            <h5 className="text-truncate m-0">Busqueda</h5>
                                        </div>
                                        <p className="m-0"></p>
                                    </div>
                                </div>
                            </div>
        </Fragment>
    )
}