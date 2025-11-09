import React from "react";

const Button = ({label}: {label:string}) => {
	return (
		<button
			type="button"
			className="text-white bg-dark-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-nowrap px-8 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
			{label}
		</button>
	);
};

export default Button;
