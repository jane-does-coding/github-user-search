import React, { useState } from "react";
import axios from "axios";
import Repo from "./components/Repo";
import Repos from "./components/Repos";
import Header from "./components/Header";
import Followings from "./components/Followings";
import Followers from "./components/Followers";

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
	};

	const fetchFollowing = async (url) => {
		const response = await axios.get(url);
		setFollowing(response.data);
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
					{/* Person's Basic Info */}
					<br />
					<Header
						userData={userData}
						repos={repos}
						followers={followers}
						following={following}
					/>
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

					{/* Followers */}
					{selectedTab === "followers" && <Followers followers={followers} />}

					{/* Following */}
					{selectedTab === "following" && <Followings following={following} />}

					{/* Repos */}
					{selectedTab === "repos" && <Repos repos={repos} />}
				</div>
			)}
		</div>
	);
}

export default App;
