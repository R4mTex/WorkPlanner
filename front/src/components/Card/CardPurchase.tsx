import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink, useParams } from "react-router-dom";

//import ModalDelete from '../Modals/ModalDelete';
import Button from "../ui/btn/Button";

const CardPurchase = () => {
    const { id } = useParams();
    return (
        <div className="card ">
            <div>
                <h2 className="text-bold">Achat XX</h2>
                <p>
                    <strong>Date : </strong>
                    20/02/2024
                </p>
                <p>
                    <strong>Prix : </strong>
                    152€
                </p>
                <p>
                    <strong>Délais : </strong>1 mois
                </p>
                <p>
                    <strong>Intervenant : </strong>
                    XXXX
                </p>
                <p>
                    <strong>Description : </strong>
                    {id
                        ? `Achat  1  est un projet crucial qui doit être réalisé dans le délai imparti. Ce projet nécessite une planification détaillée et une coordination efficace entre les différentes équipes pour assurer que chaque étape soit réalisée dans les meilleures conditions. L’achèvement de cette tâche est un facteur clé pour la réussite des objectifs de l’entreprise, et il est essentiel de respecter toutes les échéances fixées pour éviter toute perturbation dans le flux de travail global.`
                        : `Achat  1 est un projet crucial qui doit être réalisé dans le délai imparti. Ce...`}
                </p>
            </div>

            <div className="flex justify-between mt-2">
                {/* <ModalDelete label={`l'achat 1`} /> */}

                <NavLink to={`/achat/1/edit`}>
                    <Button>
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

                {!id && (
                    <NavLink to={`/achat/1`}>
                        <Button>
                            <Icon
                                className="svg"
                                icon="material-symbols:search-rounded"
                            />
                            Voir +
                        </Button>
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default CardPurchase;
