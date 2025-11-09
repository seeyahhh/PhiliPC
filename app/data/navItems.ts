export const navItems = [
	{ id: "keyboard", label: "Keyboards", href: "/#" },
	{ id: "mouse", label: "Mouse", href: "/#" },
	{ id: "monitor", label: "Monitors", href: "/#" },
];

export const moreItems = [
	{ id: "ram", label: "RAM", href: "/#" },
	{ id: "ssd", label: "SSD", href: "/#" },
	{ id: "hardDrive", label: "Hard Drives", href: "/#" },
];

export interface NavItem {
	id: string;
	label: string;
	href: string;
	current?: boolean;
}
