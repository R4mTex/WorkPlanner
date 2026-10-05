import ButtonValide from "@/components/ui/btn/ButtonValide";
import InputForm from "@/components/form/InputForm";

const AccountEdit = () => {
    const token = "pouet"; //mettre la valeur à "" pour test

    return (
        <>
            <h1>Paramètres du compte</h1>
            {token && (
                <form className="form">
                    <InputForm label="Nom" type="text" />
                    <InputForm label="Prénom" type="text" />
                    <InputForm label="Téléphone" type="text" />
                    <InputForm label="Numéro et adresse" type="text" />
                    <InputForm label="Code postal" type="text" />
                    <InputForm label="Ville" type="text" />
                    <InputForm label="Pays" type="text" />

                    <div className="flex justify-between mt-5">
                        <ButtonValide />
                    </div>
                </form>
            )}
        </>
    );
};

export default AccountEdit;
