
let allProjects;
let activeFilter = '';
function filterProjects(skill) {
	activeFilter = skill;
	if(!allProjects) {
		return;
	}
	if(skill === "") {
		document.getElementById('portfolio').innerHTML = '';
		document.getElementById('portfolio').appendChild(allProjects);
		return;
	}
	let projects = [];
	const projectList = allProjects.cloneNode(true);
	projectList.querySelectorAll('.workItem').forEach((workItem) => {
		if (workItem.querySelector(`img.${skill}`)) {
			projects.push(workItem);
		}
	});

	if(projects.length > 0) {
		document.getElementById('portfolio').innerHTML = '';
		projects.forEach((project) => {
			document.getElementById('portfolio').appendChild(project);
		});
	}
}

function initFilter(){
	const filterSkills = document.querySelectorAll('.filter-bar__skill');
	if(filterSkills.length > 0) {
		filterSkills.forEach((filterSkill) => {
			filterSkill.addEventListener('click', (e) => {

				if(e.target.value !== activeFilter) {
					return filterProjects(e.target.value);
				}
				e.target.checked = false;
				filterProjects("");
			});
		});
	}
	allProjects = document.getElementById('portfolio').cloneNode(true);
}

initFilter();
