import React from "react";

const Header = ({ userData, repos, followers, following }) => {
	return (
		<div className="flex items-center gap-8 w-4/5 mx-auto mb-4">
			<img
				src={userData.avatar_url}
				alt={userData.login}
				className="w-[6rem] h-[6rem] rounded-full"
			/>
			<div>
				<p className="text-xl font-semibold">{userData.login}</p>
				<p className="text-sm text-gray-600">
					Repos: {repos.length == 30 ? "30+" : repos.length}
				</p>
				<p className="text-sm text-gray-600">
					Followers: {followers.length == 30 ? "30+" : followers.length}
				</p>
				<p className="text-sm text-gray-600">
					Followings: {following.length == 30 ? "30+" : following.length}
				</p>
			</div>
		</div>
	);
};

export default Header;
