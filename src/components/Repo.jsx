import React from "react";
import { FaRegStar } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";

const Repo = ({ repo }) => {
	return (
		<div className="border border-gray-300 rounded-md p-4 my-2">
			<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
				<p className="text-xl font-semibold text-blue-500 hover:underline">
					{repo.name}
				</p>
			</a>
			<p className="text-sm text-gray-500">Language: {repo.language}</p>
			<p className="text-sm text-gray-500">
				Created on: {new Date(repo.created_at).toLocaleDateString()}
			</p>
			<div className="flex gap-4 mt-2">
				<div className="flex items-center gap-1">
					<FaRegStar className="text-gray-500" />
					<p className="text-gray-600 text-sm">{repo.stargazers_count}</p>
				</div>
				<div className="flex items-center gap-1">
					<GoRepoForked className="text-gray-500" />
					<p className="text-gray-600 text-sm">{repo.forks_count}</p>
				</div>
			</div>
		</div>
	);
};

export default Repo;
