import ButtonValide from "@/components/ui/btn/ButtonValide";
import LinkNavigation from "@/components/ui/LinkNavigation";

const ForgotPassword = () => {
    return (
        <>
            <h1>Mot de passe oublié</h1>
            <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto card">
                <form>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" />
                    </div>
                    <div className="flex justify-end">
                        <ButtonValide />
                    </div>
                </form>
            </div>
            <div className=" font-bold border-t border-personal-blue mt-15">
                <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto flex justify-between">
                    <LinkNavigation label="Créer un compte" path="/signup" />
                    <LinkNavigation label="Se connecter" path="/signin" />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
