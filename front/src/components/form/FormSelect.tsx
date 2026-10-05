import { IncidentInterface } from "@/interfaces/incidentInterface";

interface Option {
	id: number | string;
	name: string;
}

interface FormSelectProps {
	label: string;
	name: string;
	options: Option[] | IncidentInterface[];
	errors: any;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value?: string | number;
}

const FormSelect = ({ label, options, name, errors, onChange, value, ...rest }: FormSelectProps) => {
	return (
		<div className="mb-4">
			<label htmlFor={name}>{label}</label>
			<select
				id={name}
				name={name}
				className="w-full border rounded-md p-2"
				onChange={onChange}
				value={value}
				{...rest}
				role={name}
			>
				<option value="">Choisir un {label}</option>
				{options &&
					options.map((option, index) => {
						return (
							<option key={index} value={option.id}>
								{option.name}
							</option>
						);
					})}
			</select>
			{errors && (
				<span data-cy-error={name} className="text-personal-red text-sm">
					Le champ <strong>{label}</strong> est obligatoire
				</span>
			)}
		</div>
	);
};

export default FormSelect;
