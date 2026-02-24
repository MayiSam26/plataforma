import { Fragment } from "react/jsx-runtime";
//import { dataPlan } from "../Interfaces/dataPlan";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { dataCellphone } from "../Interfaces/datsend";
import urlBase from "../../../config/index";
//https://wa.me/5211234567890?text=Me%20gustaría%20saber%20el%20precio%20del%20coche
interface props {
  plan: any;
}
export default function Plan({ plan }: props) {
  const sendPlan = (value: any) => {
    const { nombre: plan, cantidad: price } = value;
    const cell = dataCellphone;
    window.open(
      `https://wa.me/${cell}?text=Me%20gustaría%20adquirir%20el%20${plan}%20que%20cuesta%20${
        "s/." + price
      }%20`
    );
  };
  return (
    <Fragment>
      {plan.map((item: any, index: any) => {
        const { content } = item;

        const contentParse =
          urlBase.pathBase == "https://bakendultimo-production.up.railway.app"
            ? JSON.parse(content)
            : content;
        return (
          <div className="col-lg-4 mb-4" key={item.idplanmensual}>
            <div className="card border-0">
              <div className="card-header position-relative border-0 p-0 mb-4">
                <img className="card-img-top" src={"/img/" + item.img} alt="" />
                <div
                  className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                  style={{
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    background: "rgba(0, 0, 0, .6)",
                  }}
                >
                  <h3 className="text-secondary mb-3">{item.nombre}</h3>
                  <img
                    src={item.cantidad}
                    alt={item.nombre}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "10px",
                      border: "2px solid white",
                    }}
                  />
                </div>
              </div>
              <div className="card-body text-center p-0">
                <ul className="list-group list-group-flush mb-4">
                  {contentParse.map((item: any) => (
                    <li className="list-group-item p-2" key={item.id}>
                      <i className="fa fa-check text-secondary mr-2"></i>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
