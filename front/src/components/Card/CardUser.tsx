import { User } from "../../interfaces/userInterface";

interface UserCardProps {
	user: User;
}

const CardUser = ({ user }: UserCardProps) => {
	// console.log("here CardUser user : ", user, "user.id : ", user.id);
	const data = user.userParams || user.professional;
	// console.log("here CardUser data : ", data, "data.userId : ", data.userId);

	const renderField = (label: string, value?: string) => (
		<li>
			<strong>{label} : </strong>
			{value ? value : <em className="opacity-50">À renseigner</em>}
		</li>
	);

	return (
		<>
			{data ? (
				<div className="card">
					<ul>
						{renderField("Nom", user.userParams?.lastname || user.professional?.name)}
						{renderField("Prénom", user.userParams?.firstname)}
						{renderField(
							"Numéro de téléphone",
							user.userParams?.phoneNumber || user.professional?.phoneNumber
						)}
						{user.professional && renderField("Nom du manager", user.professional.managerName)}
						{renderField("Numéro de rue", user.userParams?.streetNumber || user.professional?.streetNumber)}
						{renderField("Nom de rue", user.userParams?.streetName || user.professional?.streetName)}
						{renderField("Ville", user.userParams?.city || user.professional?.city)}
						{renderField("Code postal", user.userParams?.postalCode || user.professional?.postalCode)}
						{renderField("Pays", user.userParams?.country || user.professional?.country)}
					</ul>

					<div className="w-full my-2 border-t border-dashed border-black"></div>

					<ul>
						<li>
							<strong>Mes métiers : </strong>
							{user.userHasTrade?.length ? (
								user.userHasTrade.map((userHasTrade) => (
									<p key={userHasTrade.trade.name}>{userHasTrade.trade.name}</p>
								))
							) : (
								<em className="opacity-50">À renseigner</em>
							)}
						</li>
						<li>
							<strong>Vous êtes assigné à ces tâches : </strong>
							{user.userTasks?.length ? (
								user.userTasks.map((userTask) => (
									<p key={userTask.task.name}>
										<u>{userTask.task.name}</u>
										<br />
										{userTask.task.description}
									</p>
								))
							) : (
								<em className="opacity-50">À renseigner</em>
							)}
						</li>
					</ul>
				</div>
			) : (
				<p>Aucune information disponible.</p>
			)}
		</>
	);
};

export default CardUser;
