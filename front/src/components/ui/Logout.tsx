import { Icon } from "@iconify/react";

const Logout = () => {
    return (
        <div className="cursor-pointer inline-block pos">
            <Icon
                icon="hugeicons:logout-04"
                style={{
                    fontSize: "45px",
                    color: "#de6f00f1",
                }}
            />
        </div>
    );
};

export default Logout;
