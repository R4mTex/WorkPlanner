import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

import { IntervenantInterface } from "@/interfaces/IntervenantInterface";

import ModalDelete from "../Modals/ModalDelete";
import Button from "../ui/btn/Button";

const CardIntervenant = (intervenant: IntervenantInterface) => {
    return (
        <div className="card ">
            <div>
                <strong>Nom </strong>
                <h2>{intervenant.lastname}</h2>
                <p>
                    <strong>Prénom </strong>
                    {intervenant.firstname}
                </p>
                <p>
                    <strong>Téléphone </strong>
                    {intervenant.phoneNumber}
                </p>
                <p>
                    <strong>Email </strong>
                    {intervenant.email}
                </p>
                <p>
                    <strong>Statut </strong>
                    {intervenant.status}
                </p>
                {/* <p>
          <strong>Tâches en cours </strong>
          {intervenant.tasks.map((task: any, index: any) => (
            <li key={index}> {task}</li>
          ))}
        </p> */}
            </div>

            <div className="flex justify-between mt-2">
                <ModalDelete
                    label={`l/'intervenant ${intervenant.lastname} ${intervenant.id}`}
                    onDelete=""
                />

                <NavLink to={`/intervenant/edition/${intervenant.id}`}>
                    <Button data-cy={`edit-btn-${intervenant.id}`}>
                        <Icon
                            className="svg"
                            icon="solar:pen-linear"
                            style={{
                                fontSize: "18px",
                            }}
                        />
                        Modifier
                    </Button>
                </NavLink>
            </div>
        </div>
    );
};

export default CardIntervenant;
