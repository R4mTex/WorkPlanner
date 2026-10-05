interface InputForm {
    label: string;
    type: "text" | "number" | "email" | "password" | "date" | "datetime-local";
    name?: string;
    errors?: any;
}

const InputForm = ({ label, type, name, errors, ...rest }: InputForm) => {
    return (
        <div className="mb-2 mt-2">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={label}
                className="border rounded p-2 w-full"
                {...rest}
                role={name}
            />
            {errors && (
                <span
                    data-cy-error={name}
                    className="text-personal-red text-sm"
                >
                    Le champ <strong>{label}</strong> est obligatoire
                </span>
            )}
        </div>
    );
};

export default InputForm;
