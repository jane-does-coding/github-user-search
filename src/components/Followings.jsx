import React from "react";

const Followings = ({ following }) => {
	return (
		<div className="grid grid-cols-3 gap-6 ml-8">
			{following.map((followee, index) => (
				<div
					key={index}
					className="text-lg p-4 border-neutral-200 border-2 rounded-xl flex gap-4 items-center justify-start"
				>
					<img
						src={followee.avatar_url}
						className="w-[3rem] h-[3rem] object-cover rounded-full border-[1px] border-neutral-200"
					/>
					<h2>{followee.login}</h2>
				</div>
			))}
		</div>
	);
};

export default Followings;
