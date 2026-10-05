import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getIncidentType } from "@/api/incident";
import { IncidentInterface } from "@/interfaces/incidentInterface";
import { TaskIncident } from "@/interfaces/taskInterface";
import { useTasksStore } from "@/store/tasksStore";

import ButtonCancel from "../ui/btn/ButtonCancel";
import ButtonValide from "../ui/btn/ButtonValide";

import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import InputForm from "./InputForm";

const FormIncident = ({ incident }: { incident?: TaskIncident }): JSX.Element => {
	const navigate = useNavigate();
	const [incidentType, setIncidentType] = useState<IncidentInterface[]>([]);
	const { manageIncident, currentTask } = useTasksStore();
	const taskId = Number(currentTask?.id);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		watch,
	} = useForm<IncidentInterface>({
		defaultValues: {
			name: "",
			description: "",
			incidentTypeId: 0,
			status: "InProgress",
			start: new Date(),
			end: new Date(),
		},
	});
	const loadIncidenType = async () => {
		const response = await getIncidentType();
		setIncidentType(response);
	};

	useEffect(() => {
		loadIncidenType();
	}, []);

	useEffect(() => {
		if (location.pathname.includes("edition") && incident) {
			setValue("id", incident.incident.id || 0);
			setValue("name", incident.incident.name || "");
			setValue("description", incident.incident.description || "");
			setValue("incidentTypeId", incident.incident.incidentTypeId || 0);
			setValue("status", incident.incident.status);
			setValue("start", incident.incident.start);
			setValue("end", incident.incident.end);
		}
	}, [incident, location.pathname, setValue]);

	const handleSubmitForm = async (data: IncidentInterface) => {
		try {
			const incidentData = {
				...data,
				incidentTypeId: parseInt(data.incidentTypeId.toString(), 10),
				start: new Date(data.start),
				end: new Date(data.end),
			};

			if (incident?.incident.id) {
				const incidentIdNumber = Number(incident.incident.id);
				await manageIncident(taskId, incidentData, incidentIdNumber);
			} else {
				await manageIncident(taskId, incidentData);
			}
			navigate(-1);
		} catch (error) {
			console.error("Erreur lors de l'envoi du formulaire :", error);
		}
	};

	return (
		<div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto">
			<form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
				<InputForm
					{...register("name", { required: true })}
					errors={errors.name}
					name="name"
					label="Nom de l'incident"
					type="text"
				/>
				<FormSelect
					{...register("incidentTypeId", { required: true })}
					errors={errors.incidentTypeId}
					label="Type d'incident"
					name="incidentTypeId"
					options={incidentType}
					value={watch("incidentTypeId")}
				/>

				<FormSelect
					{...register("status", { required: true })}
					errors={errors.status}
					label="Status"
					name="status"
					options={[
						{ name: "En progression", id: "InProgress" },
						{ name: "Fini", id: "Finished" },
					]}
					value={watch("status")}
				/>

				<InputForm
					{...register("start", {
						required: true,
					})}
					errors={errors.start}
					name="start"
					label="Date de début"
					type="datetime-local"
				/>

				<InputForm
					{...register("end", {
						required: true,
					})}
					errors={errors.end}
					name="end"
					label="Date de fin"
					type="datetime-local"
				/>

				<FormTextArea
					{...register("description", {
						required: true,
						maxLength: 500,
					})}
					errors={errors.description}
					name="description"
					label="Description"
				/>

				<div className="flex justify-between mt-4">
					<ButtonCancel />
					<ButtonValide />
				</div>
			</form>
		</div>
	);
};

export default FormIncident;
