import CardPurchase from "../../components/Card/CardPurchase";
import ButtonAddAchat from "../../components/ui/btn/ButtonAddAchat";
//import Search from "../../components/ui/Search";

const AchatList = () => {
    return (
        <>
            <div className="header">
                <h1>Liste des achats</h1>
                {/* <Search label="Recherche un achat" /> */}
            </div>
            <div className="cardContainer">
                <CardPurchase />
                <CardPurchase />
                <CardPurchase />
                <CardPurchase />
                <CardPurchase />
            </div>
            <ButtonAddAchat data-cy-add="task" />
        </>
    );
};

export default AchatList;
