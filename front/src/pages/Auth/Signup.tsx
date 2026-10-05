import ButtonValide from "@/components/ui/btn/ButtonValide";
import LinkNavigation from "@/components/ui/LinkNavigation";
import InputForm from "@/components/form/InputForm";
import { useForm } from "react-hook-form";
import { Role } from "@/interfaces/userInterface";
import { useRef } from "react";
import { createUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export interface FormUserInterface {
    email: string;
    password: string;
    password_confirm: string;
    role: Role;
}

const Signup = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<FormUserInterface>({
        defaultValues: {
            email: "",
            password: "",
            role: "Individual",
        },
    });
    const password = useRef({});
    password.current = watch("password", "");

    const handleSubmitForm = async (data: FormUserInterface) => {
        try {
            await createUser(data);

            navigate("/signin");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire :", error);
        }
    };

    return (
        <>
            <h1>Créer un compte</h1>
            <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto card">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <InputForm
                        {...register("email", {
                            required: "Veuillez entrer une adresse email",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message:
                                    "Veuillez entrer une adresse email valide ",
                            },
                        })}
                        label="Email"
                        type="email"
                        name="email"
                    />
                    {errors.email && (
                        <span
                            data-cy-error="email"
                            className="text-personal-red text-sm"
                        >
                            {errors.email.message}
                        </span>
                    )}

                    <InputForm
                        {...register("password", {
                            required: "Veuillez mettre un mot de passe",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~])[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]{12,}$/,
                                message:
                                    "Le mot de passe doit contenir au moins 12 caractères, un chiffre et un symbole",
                            },
                        })}
                        label="Mot de passe"
                        type="password"
                        name="password"
                    />

                    {errors.password && (
                        <span
                            data-cy-error="password"
                            className="text-personal-red text-sm"
                        >
                            {errors.password.message}
                        </span>
                    )}

                    <InputForm
                        {...register("password_confirm", {
                            validate: (value) =>
                                value === password.current ||
                                "Le password ne correspond pas",
                        })}
                        label="Confirmer mot de passe"
                        type="password"
                        name="password_confirm"
                    />
                    {errors.password_confirm && (
                        <span
                            data-cy-error="password_confirm"
                            className="text-personal-red text-sm"
                        >
                            {errors.password_confirm.message}
                        </span>
                    )}

                    <div className="flex justify-end">
                        <ButtonValide />
                    </div>
                </form>
                <div className="flex flex-col text-center gap-3 mt-10 mb-5 border-t border-personal-blue pt-5">
                    <h2>Créer un compte avec google</h2>
                    <Button className="justify-center flex">
                        <Icon
                            className="svg"
                            icon="devicon:google"
                            style={{
                                fontSize: "18px",
                            }}
                        />
                        Crée mon compte
                    </Button>
                </div>
            </div>

            <div className="font-bold border-t border-personal-blue mt-15 ">
                <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto flex justify-end">
                    <LinkNavigation label="Se connecter" path="/signin" />
                </div>
            </div>
        </>
    );
};

export default Signup;
