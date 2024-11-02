import React, { useState, useEffect } from "react";
import Repo from "./Repo";

const Repos = ({ repos }) => {
	const [sortedRepos, setSortedRepos] = useState(repos);
	const [sortOption, setSortOption] = useState("most-stars");

	useEffect(() => {
		const sorted = [...repos]; // Clone repos array

		// Sort based on selected option
		switch (sortOption) {
			case "most-stars":
				sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
				break;
			case "least-stars":
				sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
				break;
			case "most-forks":
				sorted.sort((a, b) => b.forks_count - a.forks_count);
				break;
			case "least-forks":
				sorted.sort((a, b) => a.forks_count - b.forks_count);
				break;
			case "largest-size":
				sorted.sort((a, b) => b.size - a.size);
				break;
			default:
				break;
		}

		setSortedRepos(sorted);
	}, [sortOption, repos]);

	return (
		<div className="w-4/5 mx-auto">
			{/* Sorting Options */}
			<div className="flex justify-end mb-4">
				<label htmlFor="sort" className="mr-2 font-semibold">
					Sort by:
				</label>
				<select
					id="sort"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					className="border border-gray-300 p-2 rounded-md"
				>
					<option value="most-stars">Most Stars</option>
					<option value="least-stars">Least Stars</option>
					<option value="most-forks">Most Forks</option>
					<option value="least-forks">Least Forks</option>
					<option value="largest-size">Largest Size</option>
				</select>
			</div>

			{/* Render Sorted Repos */}
			<div className="grid grid-cols-3 gap-6">
				{sortedRepos.map((repo, index) => (
					<Repo key={index} repo={repo} />
				))}
			</div>
		</div>
	);
};

export default Repos;
