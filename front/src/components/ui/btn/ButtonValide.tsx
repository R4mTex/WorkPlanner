import { Icon } from "@iconify/react";

const ButtonValide = () => {
    return (
        <button className="btn flex" data-cy-button="valide">
            <Icon className="svg" icon="mingcute:check-fill" />
            Valider
        </button>
    );
};

export default ButtonValide;
