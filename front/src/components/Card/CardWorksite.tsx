import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";

//import ModalDelete from '../Modals/ModalDelete';
import Button from "../ui/btn/Button";

const CardWorksite = () => {
    return (
        <div className="CardWorksite">
            <img
                src="/src/assets/workers-examining-work.jpg"
                alt=""
                className="rounded-tl rounded-tr"
            />
            <div className="p-2">
                <h2>Chantier XXX</h2>
                <ul>
                    <li>
                        <strong>Début : </strong>10/02/2025
                    </li>
                    <li>
                        <strong>Fin : </strong>10/04/2025
                    </li>
                    <li>
                        <strong>Durée : </strong>2 mois
                    </li>
                </ul>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <NavLink to="/planning/">
                        <Button>
                            <Icon icon="guidance:calendar" className="svg" />
                            Calendrier
                        </Button>
                    </NavLink>

                    <NavLink to="/achat/">
                        <Button>
                            <Icon
                                icon="material-symbols:shopping-cart-outline"
                                className="svg"
                            />
                            Achats
                        </Button>
                    </NavLink>

                    <NavLink to="/chantier/1/taches/">
                        <Button>
                            <Icon
                                icon="fluent:task-list-20-regular"
                                className="svg"
                            />
                            Tâches
                        </Button>
                    </NavLink>
                    <NavLink to="/chantier/1/facture/">
                        <Button>
                            <Icon icon="solar:euro-outline" className="svg" />
                            Factures
                        </Button>
                    </NavLink>
                    <NavLink to="/chantier/1/intervenants">
                        <Button>
                            <Icon
                                icon="healthicons:miner-worker"
                                className="svg"
                            />
                            Intervenants
                        </Button>
                    </NavLink>
                    <NavLink to="/chantier/1/parametre/">
                        <Button>
                            <Icon icon="mdi:gear-outline" className="svg" />
                            Paramètres
                        </Button>
                    </NavLink>

                    {/* <ModalDelete label={`le chantier 1`} /> */}
                </div>
            </div>
        </div>
    );
};

export default CardWorksite;
