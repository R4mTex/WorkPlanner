/* import CardUser from "@/components/user/CardUser"; */
/* import ModalDelete from "@/components/Modals/ModalDelete"; */

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import { getUserById } from "@/api/user";
import CardUser from "@/components/Card/CardUser";
import Button from "@/components/ui/btn/Button";

const AccountParams = () => {
	const { id } = useParams<{ id: string }>();
	// console.log("here AccountParams id : ", id);
	const [user, setUser] = useState<any>();
	useEffect(() => {
		const loadUserById = async () => {
			const response = await getUserById(id);
			// console.log("here AccountParams response : ", response, response.id);
			setUser(response);
		};
		loadUserById();
	}, []);
	return (
		<div>
			<h1>Mon compte</h1>
			{user ? <CardUser user={user} /> : <p>Chargement des infos...</p>}
			<div className="grid grid-cols-2 gap-4 mt-4">
				<NavLink to="/account/edit">
					<Button>
						<Icon icon="iconamoon:edit-thin" className="svg" />
						Modifier le profil
					</Button>
				</NavLink>
				{/* <ModalDelete label={`Votre profil`} /> */}
			</div>
		</div>
	);
};

export default AccountParams;
