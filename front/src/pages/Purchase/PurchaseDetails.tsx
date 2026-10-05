import { useParams } from "react-router-dom";
import CardPurchase from "../../components/Card/CardPurchase";

const AchatDetails = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Achat {id}</h1>
            <CardPurchase />
        </>
    );
};

export default AchatDetails;
