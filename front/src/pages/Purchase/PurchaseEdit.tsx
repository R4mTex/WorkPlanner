import { useParams } from "react-router-dom";
import FormPurchase from "../../components/form/FormPurchase";

const AchatEdit = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Modification d'un achat {id}</h1>
            <FormPurchase />
        </>
    );
};

export default AchatEdit;
