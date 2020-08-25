import React, { useState, useEffect } from 'react';
import './PortLinks.css';
import axios from 'axios';

function PortLinks() {
	const [ projects, setProjects ] = useState([]);

	useEffect(async () => {
		let data = await getProjects();
		console.log('data', data);
		let cards = makeProjects(data);
		console.log('cards', cards);
		setProjects(cards);
	}, []);

	//sheetUrl is shared url...anyone with that url canopen the sheet in google sheets
	const sheetUrl =
		'https://docs.google.com/spreadsheets/d/1FlYxWf-DCBFPt55fm0Hyu5pLr2dgCr2RqA1LKfahF-A/edit?usp=sharing';

	//sheetAsJSON is how we will pull the data as JSON (javascript object notation)
	const sheetAsJSON =
		'https://spreadsheets.google.com/feeds/list/1FlYxWf-DCBFPt55fm0Hyu5pLr2dgCr2RqA1LKfahF-A/od6/public/values?alt=json';

	const getProjects = async () => {
		try {
			let res = await axios.get(sheetAsJSON);

			console.log('res in PortLinks', res);
			const projects = res.data.feed.entry.map((project) => {
				return {
					title: project.gsx$title.$t,
					description: project.gsx$description.$t,
					image: project.gsx$image.$t,
					url: project.gsx$url.$t
				};
			});

			return projects;
		} catch (err) {
			console.error(err);
		}
	};

	const makeProjects = (projectsData) => {
		return projectsData.map((project) => (
			<div className="projectCard">
				<div className="projectAnchorDiv">
					<a className="projectAnchor" href={project.url} target="_blank">
						{project.title}
					</a>
					<a className="projectLinkIcon" href={project.url} target="_blank">
						<i className="fas fa-external-link-square-alt" />
					</a>
				</div>
				<h3 className="projectDescription">{project.description}</h3>
				<img className="projectImg" src={project.image} alt="projectimg" />
			</div>
		));
	};

	return <div className="PortLinks">{projects}</div>;
}

export default PortLinks;
