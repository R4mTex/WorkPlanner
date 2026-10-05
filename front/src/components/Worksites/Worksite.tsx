import { FaRegCalendarAlt } from "react-icons/fa";
/* import { FaFilter } from "react-icons/fa"; */
import { LiaFileInvoiceDollarSolid, LiaShoppingCartSolid } from "react-icons/lia";
import { MdOutlineSettings } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";

import { deleteById } from "@/api/deleteById";
import { WorksiteInterface } from "../../interfaces/worksiteInterface";
import { worksiteStore } from "@/store/WorksiteStore";

import ModalDelete from "../Modals/ModalDelete";

import { useMemo } from "react";

interface WorksiteComponentInterface {
    worksiteInfos: WorksiteInterface;
}

const Worksite = ({ worksiteInfos }: WorksiteComponentInterface) => {
    const worksiteId = Number(worksiteInfos.id);
    const { removeWorksite } = worksiteStore();

    /* const worksiteType = worksiteInfos?.worksiteTypes?.[0]?.worksiteType?.name; */

    const handleDelete = async () => {
        try {
            await deleteById(worksiteId, "Worksite", "worksite");
            removeWorksite(worksiteId);
        } catch (error) {
            console.error("Erreur lors de la suppression du chantier :", error);
        }
    };

    const calculateDuration = (start: Date, end: Date): string => {
        const milliseconds = Math.abs(end.getTime() - start.getTime());
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;

        if (weeks > 0 && remainingDays > 0) {
            return `${weeks} semaine(s) et ${remainingDays} jour(s)`;
        } else if (weeks > 0) {
            return `${weeks} semaine(s)`;
        } else {
            return `${days} jour(s)`;
        }
    };

    const formattedDuration = useMemo(() => {
        if (worksiteInfos.start && worksiteInfos.end) {
            const start = new Date(worksiteInfos.start);
            const end = new Date(worksiteInfos.end);

            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                return calculateDuration(start, end);
            }
        }
        return "Non défini";
    }, [worksiteInfos.start, worksiteInfos.end]);

    return (
        <>
            <div className="shadow-primary shadow-[10px_8px_15px_-7px] border-gray-200 rounded-xl bg-card">
                {/* 				<button
					className="absolute top-2 right-2 bg-primary text-white px-3 py-1 text-sm rounded-md"
					onClick={() => setShowFilters(!showFilters)}
				>
					{showFilters ? "Fermer les filtres" : "Filtres"}
				</button>

				{showFilters && (
					<div className="absolute top-10 right-2 bg-white border border-gray-200 rounded-lg p-4 shadow-md z-10 w-64 space-y-3">
						<h4 className="text-primary font-semibold text-sm">Filtrer les chantiers</h4>
						<input className="w-full p-1 border rounded text-sm" type="text" placeholder="Nom..." />
						<input className="w-full p-1 border rounded text-sm" type="text" placeholder="Ville..." />
						<input className="w-full p-1 border rounded text-sm" type="number" placeholder="Durée..." />
						<input className="w-full p-1 border rounded text-sm" type="date" placeholder="Début..." />
						<input className="w-full p-1 border rounded text-sm" type="date" placeholder="Fin..." />
						<select className="w-full p-1 border rounded text-sm">
							<option value="asc">Trier par date (asc)</option>
							<option value="desc">Trier par date (desc)</option>
						</select>
						<button className="bg-primary text-white px-3 py-1 text-sm rounded w-full">Appliquer</button>
					</div>
				)} */}
                <Link to={`/worksite/${worksiteInfos.id}/details/`}>
                    {worksiteInfos.picture && (
                        <img
                            className="w-full h-40 object-cover cursor-pointer rounded-t-xl p-1"
                            src={worksiteInfos.picture}
                            alt="Card Image"
                        />
                    )}
                </Link>
                <div className="p-3 grid gap-y-3">
                    <div className="grid grid-cols-2">
                        <Link to={`/worksite/${worksiteInfos.id}/details/`}>
                            <h3 className="text-lg font-bold text-primary underline cursor-pointer">
                                {worksiteInfos.name}
                            </h3>
                        </Link>
                        <p className="text-sm text-primary text-end">
                            {/* Type de chantier : {worksiteInfos.worksiteType} */}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-primary">
                            Début : {new Date(worksiteInfos.start).toLocaleDateString()}
                        </h3>
                        <p className="text-sm text-primary">Fin : {new Date(worksiteInfos.end).toLocaleDateString()}</p>
                        <p className="text-sm text-primary">Durée : {formattedDuration}</p>
                    </div>
                    <div className="grid grid-cols-2  gap-x-3 gap-y-3">
                        <NavLink
                            className="text-sm font-bold text-primary bg-personal-white flex p-2 rounded-lg w-full min-w-[120px] btn-shadow "
                            to={`/planning/${worksiteId}`}>
                            <span className="text-secondary text-lg">
                                <FaRegCalendarAlt />
                            </span>
                            <span className="flex-1 text-center">Calendrier</span>
                        </NavLink>

                        <NavLink
                            data-cy-facture="facture"
                            className="text-sm font-bold  bg-personal-white flex p-2 rounded-lg w-full min-w-[120px] btn-shadow "
                            to={`/`}>
                            <span className="text-secondary text-lg">
                                <LiaFileInvoiceDollarSolid />
                            </span>
                            <span className="flex-1 text-center">Factures</span>
                        </NavLink>
                        <NavLink
                            data-cy-parametre="parametre"
                            className="text-sm font-bold  bg-personal-white flex p-2 rounded-lg w-full min-w-[120px] btn-shadow "
                            to={`/worksite/${worksiteId}/modification/`}>
                            <span className="text-secondary text-lg">
                                <MdOutlineSettings />
                            </span>
                            <span className="flex-1 text-center">Paramètres</span>
                        </NavLink>
                        <NavLink
                            data-cy-achats="achats"
                            className="text-sm font-bold  bg-personal-white flex p-2 rounded-lg w-full min-w-[120px] btn-shadow "
                            to={`/`}>
                            <span className="text-secondary text-lg">
                                <LiaShoppingCartSolid size={22} />
                            </span>
                            <span className="flex-1 text-center">Achats</span>
                        </NavLink>
                    </div>
                    <div>
                        <ModalDelete
                            data-cy-button="delete"
                            label={`Le chantier ${worksiteInfos.name} ${worksiteId}`}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Worksite;
