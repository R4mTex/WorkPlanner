interface FormTextArea {
    label: string;
    name: string;
    errors: any;
}

const FormTextArea = ({ label, name, errors, ...rest }: FormTextArea) => {
    return (
        <div className="mb-2 ">
            <label htmlFor={label}>{label}</label>
            <textarea
                name={name}
                placeholder={label}
                {...rest}
                className="h-52"
                role={name}
            />

            {errors && errors.type === "required" && (
                <span
                    data-cy-error={name}
                    className="text-personal-red text-sm"
                >
                    Le champ <strong>{label}</strong> est obligatoire
                </span>
            )}
            {errors && errors.type === "maxLength" && (
                <span
                    data-cy-error={name}
                    className="text-personal-red text-sm"
                >
                    La description doit contenir moins de 500 caractères
                </span>
            )}
        </div>
    );
};

export default FormTextArea;
