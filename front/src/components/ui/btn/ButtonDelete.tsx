import { Icon } from "@iconify/react";
import { MouseEventHandler } from "react";

const ButtonDelete = ({
    deletePlanning,
}: {
    deletePlanning?: MouseEventHandler;
}) => {
    return (
        <div className="btn" onClick={deletePlanning} data-cy-btn="delete">
            <Icon
                className="svg"
                icon="tabler:trash"
                style={{
                    color: "red",
                    margin: 0,
                }}
            />
        </div>
    );
};

export default ButtonDelete;
