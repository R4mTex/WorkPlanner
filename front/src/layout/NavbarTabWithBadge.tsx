import React, { JSX } from "react";
import NavbarTab from "./NavbarTab";

interface NavbarTabWithBadgeProps {
	endpoint: string;
	iconify: JSX.Element;
	// notificationCount: number;
}

const NavbarTabWithBadge: React.FC<NavbarTabWithBadgeProps> = ({ endpoint, iconify }) => {
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<NavbarTab endpoint={endpoint} iconify={iconify} />
			{/* {notificationCount > 0 && (
				<span
					style={{
						position: "absolute",
						top: -4,
						right: -4,
						background: "red",
						color: "white",
						borderRadius: "50%",
						padding: "2px 6px",
						fontSize: "12px",
						fontWeight: "bold",
						minWidth: "20px",
						textAlign: "center",
						lineHeight: 1,
						pointerEvents: "none",
						userSelect: "none",
					}}
				>
					{notificationCount}
				</span>
			)} */}
		</div>
	);
};

export default NavbarTabWithBadge;
