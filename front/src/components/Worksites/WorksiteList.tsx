/* import { NavLink } from "react-router-dom"; */
/* import { useState } from "react"; */
/* import { worksites } from "../../data/worksites"; */
/* Icons Body */
import { CgProfile } from "react-icons/cg";
import { IoMdPower } from "react-icons/io";

import { useEffect } from "react";

import Filter from "../ui/Filter";
import Search from "../ui/Search";

import { WorksiteInterface } from "../../interfaces/worksiteInterface";
import Worksite from "./Worksite";

import { worksiteStore } from "@/store/WorksiteStore";

/* Icons Footer */
/* import { GiCrane } from "react-icons/gi";
import { GrUserWorker } from "react-icons/gr";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa"; */

const WorksiteList: React.FC = () => {
    const { worksites, loadWorksites, isLoading, error } = worksiteStore();
    /* const [selectedIcon, setSelectedIcon] = useState<string>("GiCrane"); */

    useEffect(() => {
        loadWorksites();
    }, []);

    return (
        <>
            <div className="w-full flex justify-between p-4">
                <IoMdPower size={38} className="text-secondary cursor-pointer" />
                <CgProfile size={38} className="text-primary cursor-pointer" />
            </div>
            <div className="header">
                <h1>Mes chantiers</h1>
                <Search
                    label="Rechercher un chantier.."
                    onSearch={(value) => {
                        console.log("Recherche :", value);
                    }}
                />
            </div>

            <div className="worksiteContainer">
                {isLoading ? (
                    <p>Chargement des infos...</p>
                ) : !Array.isArray(worksites) || worksites.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg font-medium mt-8">
                        {error || "Vous n'avez aucun chantier pour le moment."}
                    </p>
                ) : (
                    worksites.map((worksite: WorksiteInterface) => (
                        <Worksite key={worksite.id} worksiteInfos={worksite} />
                    ))
                )}
            </div>
            <Filter />
            {/* <div className="w-full flex items-center justify-between bg-[#4E6985] fixed bottom-0 rounded-b-xl h-16 shadow-md">
						<button
							onClick={() => handleIconClick("GiCrane")}
							className={`h-full flex items-center justify-center ml-5 ${
								selectedIcon === "GiCrane" ? "bg-[#44A3AD] w-24" : "w-16"
							} transition-all duration-200`}
						>
							<GiCrane size={35} className="text-white" />
						</button>
						<button
							onClick={() => handleIconClick("GrUserWorker")}
							className={`h-full flex items-center justify-center ${
								selectedIcon === "GrUserWorker" ? "bg-[#44A3AD] w-24" : "w-16"
							} transition-all duration-200`}
						>
							<GrUserWorker size={35} className="text-white" />
						</button>
						<button
							onClick={() => handleIconClick("BsFillPlusCircleFill")}
							className={`h-full flex items-center justify-center ${
								selectedIcon === "BsFillPlusCircleFill" ? "bg-[#44A3AD] w-24" : "w-16"
							} transition-all duration-200`}
						>
							<BsFillPlusCircleFill size={35} className="text-white" />
						</button>
						<button
							onClick={() => handleIconClick("FaBell")}
							className={`h-full flex items-center justify-center mr-5 ${
								selectedIcon === "FaBell" ? "bg-[#44A3AD] w-24" : "w-16"
							} transition-all duration-200`}
						>
							<FaBell size={35} className="text-white" />
						</button>
					</div> */}
        </>
    );
};

export default WorksiteList;
