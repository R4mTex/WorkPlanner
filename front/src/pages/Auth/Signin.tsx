import ButtonValide from "@/components/ui/btn/ButtonValide";
import LinkNavigation from "@/components/ui/LinkNavigation";
import InputForm from "@/components/form/InputForm";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { FormUserInterface } from "./Signup";
import { login } from "@/api/user";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormUserInterface>();

    const handleSubmitForm = async (data: FormUserInterface) => {
        try {
            await login(data);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire :", error);
        }
    };

    return (
        <>
            <h1>Se connecter</h1>
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

                    <div className="flex justify-end">
                        <ButtonValide />
                    </div>
                </form>
                <div className="flex flex-col text-center gap-3 mt-10 mb-5 border-t border-personal-blue pt-5">
                    <h2>Se connecter avec google</h2>
                    <Button className="justify-center flex">
                        <Icon
                            className="svg"
                            icon="devicon:google"
                            style={{
                                fontSize: "18px",
                            }}
                        />
                        Connexion
                    </Button>
                </div>
            </div>

            <div className="font-bold  border-t border-personal-blue mt-15 ">
                <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto flex justify-between">
                    <LinkNavigation
                        label="Mot de passe oublié"
                        path="/forgotpassword"
                    />
                    <LinkNavigation label="Créer un compte" path="/signup" />
                </div>
            </div>
        </>
    );
};

export default Signin;
