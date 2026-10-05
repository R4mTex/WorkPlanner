import { useParams } from "react-router-dom";

import ButtonCancel from "../ui/btn/ButtonCancel";
import ButtonValide from "../ui/btn/ButtonValide";

//import FormTextArea from "./FormTextArea";
import InputForm from "./InputForm";

const FormPurchase = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="w-full md:w-3xl lg:w-2xl xl:w-xl m-auto">
            {id ? (
                <form className="form">
                    <InputForm label="Nom" type="text" />
                    <InputForm label="Date d'achat" type="date" />
                    <InputForm label="Prix" type="text" />
                    <InputForm label="Delais" type="text" />
                    <InputForm label="Intervenant" type="text" />
                    {/* <FormTextArea label="Description" /> */}
                    <div className="flex justify-between mt-4">
                        <ButtonCancel />
                        <ButtonValide />
                    </div>
                </form>
            ) : (
                <form className="form">
                    <InputForm label="Nom" type="text" />
                    <InputForm label="Date d'achat" type="date" />
                    <InputForm label="Prix" type="text" />
                    <InputForm label="Delais" type="text" />
                    <InputForm label="Intervenant" type="text" />
                    {/* <FormTextArea label="Description" /> */}
                    <div className="flex justify-between mt-4">
                        <ButtonCancel />
                        <ButtonValide />
                    </div>
                </form>
            )}
        </div>
    );
};

export default FormPurchase;
