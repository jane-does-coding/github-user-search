import React from "react";

const Header = ({ userData, repos }) => {
	return (
		<div className="flex items-center gap-4 w-4/5 mx-auto mb-4">
			<img
				src={userData.avatar_url}
				alt={userData.login}
				className="w-16 h-16 rounded-full"
			/>
			<div>
				<p className="text-xl font-semibold">{userData.login}</p>
				<p className="text-sm text-gray-600">{userData.bio}</p>
				<p className="text-sm text-gray-600">{userData.location}</p>
				<p className="text-sm text-gray-600">Company: {userData.company}</p>
				<p className="text-sm text-gray-600">Repos: {repos.length}</p>
			</div>
		</div>
	);
};

export default Header;
