import { ReactNode } from "react";

const Button = ({
    children,
    className,
    dataCy,
}: {
    children: ReactNode;
    className?: string;
    dataCy?: string;
}) => {
    return (
        <div className={`btn flex ${className}`} data-cy-btn={dataCy}>
            {children}
        </div>
    );
};

export default Button;
