import React, { useState } from "react";
import axios from "axios";
import Repo from "./components/Repo";
import Repos from "./components/Repos";
import Header from "./components/Header";

function App() {
	const [username, setUsername] = useState("");
	const [userData, setUserData] = useState(null);
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [repos, setRepos] = useState([]);
	const [selectedTab, setSelectedTab] = useState("followers");

	const fetchUserData = async (username) => {
		const response = await axios.get(
			`https://api.github.com/search/users?q=${username}`
		);
		if (response.data.items.length > 0) {
			console.log("User Data: ");
			console.log(response.data);

			setUserData(response.data.items[0]);
			fetchFollowers(response.data.items[0].followers_url);
			fetchFollowing(
				response.data.items[0].following_url.replace("{/other_user}", "")
			);
			fetchRepos(response.data.items[0].repos_url);
		}
	};

	const fetchFollowers = async (url) => {
		const response = await axios.get(url);
		console.log(response.data);
		setFollowers(response.data);
		// setFollowers(response.data.map((follower) => follower.login));
	};

	const fetchFollowing = async (url) => {
		const response = await axios.get(url);
		setFollowing(response.data);
		// setFollowing(response.data.map((followee) => followee.login));
	};

	const fetchRepos = async (url) => {
		const response = await axios.get(url);
		setRepos(response.data);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchUserData(username);
	};

	const options = [
		{ label: "Followers", value: "followers" },
		{ label: "Following", value: "following" },
		{ label: "Repos", value: "repos" },
	];

	const [selectedValue, setSelectedValue] = useState("followers");

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-light mb-8 mt-[10vh]">
				Search Github Users
			</h1>
			<div className="flex items-center gap-4 w-3/4 mb-4">
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Github Username"
					minLength={1}
					className="input w-full py-2 px-3 border border-gray-200 rounded-md"
				/>
				<button
					onClick={handleSubmit}
					className="bg-indigo-400 text-white py-2 px-12 rounded-full text-lg"
				>
					Search
				</button>
			</div>

			{userData && (
				<div className="w-full">
					{/* User basic display */}
					<br />
					<Header userData={userData} repos={repos} />
					<br />

					{/* Tabs */}
					<div className="flex gap-4 justify-center w-4/5 mx-auto mb-4">
						{options.map(({ label, value }) => (
							<button
								key={label}
								className={`py-2 px-4 rounded-md text-lg font-light ${
									selectedValue === value
										? "bg-indigo-400 text-white"
										: "bg-gray-100"
								}`}
								onClick={() => {
									setSelectedValue(value);
									setSelectedTab(value);
								}}
							>
								{label}
							</button>
						))}
					</div>

					{/* Content */}
					{selectedTab === "followers" && (
						<div className="grid grid-cols-3 gap-6 ml-8">
							{followers.map((follower, index) => (
								<div
									key={index}
									className="text-lg p-4 border-neutral-200 border-2 rounded-xl flex gap-4 items-center justify-start"
								>
									<img
										src={follower.avatar_url}
										className="w-[3rem] h-[3rem] object-cover rounded-full border-[1px] border-neutral-200"
									/>
									<h2>{follower.login}</h2>
								</div>
							))}
						</div>
					)}
					{selectedTab === "following" && (
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
					)}
					{selectedTab === "repos" && <Repos repos={repos} />}
				</div>
			)}
		</div>
	);
}

export default App;
