import NavbarTab from "./NavbarTab";
import { Icon } from "@iconify/react";
import NavbarTabWithBadge from "./NavbarTabWithBadge";

const Navbar = () => {
	return (
		<div className="bg-black fixed left-0 right-0 bottom-0 text-white p-1 h-16 flex justify-around">
			<NavbarTab endpoint="/" iconify={<Icon icon={"mdi-crane"} />} />
			<NavbarTab endpoint="/notebook" iconify={<Icon icon={"healthicons:factory-worker"} />} />
			<NavbarTab dataCy="create-worksite" endpoint="/worksite/create" iconify={<Icon icon={"gridicons:add"} />} />
			<NavbarTabWithBadge
				endpoint="/notifications"
				iconify={<Icon icon={"bxs:bell"} />}
				// notificationCount={notificationCount}
			/>
		</div>
	);
};

export default Navbar;
