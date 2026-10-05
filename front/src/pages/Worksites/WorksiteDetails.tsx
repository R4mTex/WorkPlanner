import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { worksiteStore } from "@/store/WorksiteStore";
import ModalDelete from "@/components/Modals/ModalDelete";
import { deleteById } from "@/api/deleteById";

const WorksiteDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { worksite, setWorksiteById } = worksiteStore();

	const worksiteType = worksite?.worksiteTypes[0].worksiteType?.name;

	const handleDelete = async () => {
		await deleteById(worksite?.id, "Worksite", "worksite");
		navigate("/");
	};

	useEffect(() => {
		if (id) {
			setWorksiteById(parseInt(id));
		}
	}, [id, setWorksiteById]);

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
		if (worksite?.start && worksite?.end) {
			const startDate = new Date(worksite.start);
			const endDate = new Date(worksite.end);

			if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
				return calculateDuration(startDate, endDate);
			}
		}
		return "Non défini";
	}, [worksite?.start, worksite?.end]);

	if (!worksite) {
		return <div>Le chantier n'a pas été trouvé ou les détails sont en cours de chargement...</div>;
	}

	return (
		<>
			<div className="container mx-auto max-w-5xl mb-15">
				<h1 className="text-4xl font-semibold text-primary">{worksite.name}</h1>
				{worksite?.picture && (
					<img
						src={worksite.picture}
						alt={worksite.name}
						className="w-full h-48 object-cover rounded-xl shadow-md my-2"
					/>
				)}
				<div className="bg-card p-5 rounded-xl shadow-md space-y-5">
					<p className="text-lg text-primary leading-relaxed">{worksite.description}</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<div>
							<h3 className="font-medium text-secondary mb-1">Type de chantier</h3>
							<p className="text-primary">{worksiteType}</p>
						</div>
						<div>
							<h3 className="font-medium text-secondary mb-1">Dates du chantier</h3>
							<p className="text-primary">Début : {new Date(worksite.start).toLocaleDateString()}</p>
							<p className="text-primary">Fin : {new Date(worksite.end).toLocaleDateString()}</p>
							<p className="text-primary">Durée : {formattedDuration}</p>
						</div>
						<div>
							<h3 className="font-medium text-secondary mb-1">Adresse</h3>
							<p className="text-primary">
								{`${worksite.streetNumber} ${worksite.streetName}, ${worksite.city}, ${
									worksite.postalCode
								}, ${worksite.country?.toUpperCase()}`}
							</p>
						</div>
						<div>
							<h3 className="font-medium text-secondary mb-1">Création et mise à jour</h3>
							<p className="text-primary">
								Créé le : {new Date(worksite.createdAt).toLocaleDateString()}
							</p>
							{worksite.updatedAt && (
								<p className="text-primary">
									Mis à jour le : {new Date(worksite.updatedAt).toLocaleDateString()}
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-between mt-4">
					<div>
						<ModalDelete
							data-cy-button="delete"
							label={`Le chantier ${worksite.name} ${worksite.id}`}
							onDelete={handleDelete}
						/>
					</div>
					<Link to={`/worksite/${worksite.id}/modification/`}>
						<button className="bg-secondary text-personal-white py-2 px-4 rounded-md shadow-sm hover:bg-orange-700 transition">
							Modifier
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default WorksiteDetails;
