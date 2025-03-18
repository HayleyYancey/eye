const anatomy = {
	'ext-eye-muscles': [
		'Superior Rectus',
		'Inferior Rectus',
		'Medial Rectus',
		'Lateral Rectus',
		'Superior Oblique',
		'Inferior Oblique'
	],
	'eye-chambers': [
		'Anterior Chamber',
		'Posterior Chamber',
		'Aqueous Humor',
		'Vitreous Humor',
		'Vitreous Chamber'
	],
	'fibrous-tunic' : [
		'Sclera',
		'Cornea'
	],
	'vascular-tunic': [
		'Choroid',
		'Ciliary Body',
		'Iris',
		'Lens',
		'Pupil'
	],
	'nervous-tunic': [
		'Retina',
		'Ora Serrata',
		'Macula Lutea',
		'Central Fovea',
		'Optic Disk',
		'Optic Nerve'
	]
};

const ciliaryBody = ['Ciliary Muscles', 'Suspensory Ligaments']

const moreInfo = {
	'superior-rectus': "A muscle that moves the eye upward and slightly inward.",
	'inferior-rectus': "A muscle that moves the eye downward and slightly inward.",
	'medial-rectus': "A muscle that moves the eye inward, toward the nose.",
	'lateral-rectus': "A muscle that moves the eye outward, away from the nose.",
	'superior-oblique': "A muscle that rotates the eye downward and outward.",
	'inferior-oblique': "A muscle that rotates the eye upward and outward.",
	'anterior-chamber': "The fluid-filled space between the cornea and iris that helps maintain intraocular pressure.",
	'posterior-chamber': "The space between the iris and lens that contains aqueous humor, aiding in nutrient transport and eye pressure regulation.",
	'aqueous-humor': "A clear fluid that nourishes the cornea and lens while maintaining intraocular pressure.",
	'vitreous-humor': "A gel-like substance that helps maintain the eye's shape and provides support to the retina.",
	'vitreous-chamber': "The large space between the lens and retina filled with vitreous humor, giving the eye its shape.",
	'sclera': "The tough, white outer layer of the eye that provides protection and structural support.",
	'cornea': "The transparent front part of the eye that bends light to help focus vision.",
	'choroid': "A vascular layer between the sclera and retina that provides oxygen and nutrients to the eye.",
	'ciliary-body': "A structure that produces aqueous humor and contains muscles that control the shape of the lens.",
	'ciliary-muscles': "Muscles that adjust the lens shape to focus on near or distant objects.",
	'suspensory-ligaments': "Fibers that connect the ciliary body to the lens, allowing for adjustments in lens shape.",
	'iris': "The colored part of the eye that regulates the amount of light entering through the pupil.",
	'lens': "A transparent structure that changes shape to focus light onto the retina.",
	'pupil': "The adjustable opening in the center of the iris that controls the amount of light entering the eye.",
	'retina': "The light-sensitive layer at the back of the eye that converts light into neural signals.",
	'ora-serrata': "The jagged anterior edge of the retina where the light-sensitive part transitions into the ciliary body.",
	'macula-lutea': "A small area near the center of the retina responsible for detailed central vision.",
	'central-fovea': "The center of the macula containing the highest concentration of cones, providing sharpest vision.",
	'optic-disk': "The point where the optic nerve exits the eye, creating a blind spot since it lacks photoreceptors.",
	'optic-nerve': "The nerve that transmits visual information from the retina to the brain for processing.",

}

//
// HELPER FUNCTIONS
//

function nameToID(name) {
	return name.trim().replace(/\s+/g, '-').toLowerCase();
}

function toggleVisibility(eyeIcon, rowID) {
	// Toggle the eye icon
	if (eyeIcon.src.includes('crossed')) {
		eyeIcon.src = './assets/eye.svg';
	}
	else {
		eyeIcon.src = './assets/eye-crossed.svg';
		if (document.getElementById(rowID).classList.contains('selected')) {
			document.getElementById(rowID).classList.remove('selected')
		}
	}

	// Cross out eye icon of children if user crossed out the eye of the ciliary body
	if (rowID == 'ciliary-body') {
		ciliaryBody.forEach((ciliaryChild) => {
			const ciliaryEyeIcon = document.getElementById(nameToID(ciliaryChild)).querySelector('img');
			!eyeIcon.src.includes('crossed') ? ciliaryEyeIcon.src = './assets/eye.svg' : ciliaryEyeIcon.src = './assets/eye-crossed.svg';
		})
	}

	// Cross out eye of ciliary body if all children are also crossed out
	let allChildrenCrossed = true
	ciliaryBody.forEach((ciliaryChild) => {
		if (!document.getElementById(nameToID(ciliaryChild)).querySelector('img').src.includes('crossed')) {
			allChildrenCrossed = false
		}
	})
	if (allChildrenCrossed) {
		document.getElementById('ciliary-body').querySelector('img').src = './assets/eye-crossed.svg';
	}
	else {
		document.getElementById('ciliary-body').querySelector('img').src = './assets/eye.svg';
	}
}

function toggleSelection(row, rowID) {
	// Toggle the class on the row
	if (row.classList.contains('selected')) {
		row.classList.remove('selected');
		document.getElementById("infoText").textContent = "Select a structure for more info."
	}
	else {
		document.querySelectorAll('.anatomy-part.selected')?.forEach(selected => selected.classList.remove('selected'));
		row.classList.add('selected');
		const eyeIcon = row.querySelector('img');
		if (eyeIcon.src.includes('crossed')) {
			eyeIcon.src = './assets/eye.svg';
		}
		document.getElementById("infoText").textContent = moreInfo[rowID] 
	}

	// Select children if user selects the ciliary body
	if (rowID == 'ciliary-body') {
		ciliaryBody.forEach((ciliaryChild) => {
			const ciliaryChildRow = document.getElementById(nameToID(ciliaryChild));
			row.classList.contains('selected') ? ciliaryChildRow.classList.add('selected') : ciliaryChildRow.classList.remove('selected');
			const childEyeIcon = ciliaryChildRow.querySelector('img');
			if (childEyeIcon.src.includes('crossed')) {
				childEyeIcon.src = './assets/eye.svg';
			}
		})
	}
}

//
// ADD CONTENT TO NAVIGATION BAR
//

// Add each piece of the anatomy to the navigation bar
Object.keys(anatomy).forEach((sectionID) => {
	const section = document.getElementById(sectionID);
	anatomy[sectionID].forEach((anatomyPart) => {
		// Create text
		const p = document.createElement('p');
		p.textContent = anatomyPart;

		// Create image
		const img = document.createElement('img');
		img.src = "./assets/eye.svg";

		// Create parent div
		const div = document.createElement('div');
		div.classList.add('anatomy-part');
		div.id = nameToID(anatomyPart);
		div.appendChild(p);
		div.appendChild(img);

		section.appendChild(div);
	});
});

// Don't forget about the seb sections of the ciliary body
const ciliaryDiv = document.getElementById('ciliary-body')
ciliaryBody.forEach((ciliaryChild) => {
	// Create text
	const p = document.createElement('p');
	p.textContent = ciliaryChild;

	// Create image
	const img = document.createElement('img');
	img.src = "./assets/eye.svg";

	// Create parent div
	const div = document.createElement('div');
	div.classList.add('anatomy-part');
	div.classList.add('ciliary-child');
	div.id = nameToID(ciliaryChild)
	div.appendChild(p);
	div.appendChild(img);

	ciliaryDiv.after(div);
})

//
// ADD EVENT LISTENERS (HANDLE USER INPUT)
//

// Make navigation sections collabsible
document.querySelectorAll('section.anatomy-section').forEach((anatomySection) => {
	const sectionTitle = anatomySection.querySelector('div.section-title');
	sectionTitle.addEventListener('click', () => {
		const arrow = anatomySection.querySelector('.section-title > img');
		arrow.src.includes('down') ? 
			arrow.src = './assets/up-arrow.svg' :
			arrow.src = './assets/down-arrow.svg';
		anatomySection.querySelectorAll('div.anatomy-part').forEach((anatomyPart) => {
			anatomyPart.classList.contains('hidden') ? 
				anatomyPart.classList.remove('hidden') : 
				anatomyPart.classList.add('hidden');
		})
	})
})


// Handle visibility toggle
document.querySelectorAll('div.anatomy-part').forEach((anatomyPart) => {
		const eyeIcon = anatomyPart.querySelector('img');
		eyeIcon.addEventListener('click', () => toggleVisibility(eyeIcon, anatomyPart.id))
	}
);

// Handle anatomy selection
document.querySelectorAll('div.anatomy-part').forEach((anatomyPart) => {
	anatomyPart.querySelector('p').addEventListener('click', (event) => {
		toggleSelection(anatomyPart, anatomyPart.id);
	});
})

// Handle search
const searchInput = document.querySelector('.search-bar > input')
searchInput.addEventListener('input', (event) => {
	const searchTerm = searchInput.value.trim().replace(/\s+/g, '').toLowerCase();
	Object.values(anatomy).flat().concat(ciliaryBody).forEach((anatomyPart) => {
		const partID = nameToID(anatomyPart);
		let searchMatch = anatomyPart.trim().replace(/\s+/g, '').toLowerCase();
		if (anatomyPart == "Ciliary Body") {
			ciliaryBody.forEach(child => {
				searchMatch += '-' + (child.trim().replace(/\s+/g, '').toLowerCase());
			})
		}
		if (ciliaryBody.includes(anatomyPart)) {
			searchMatch += '-' + 'ciliarybody'
		}
		if (searchMatch.includes(searchTerm)) {
			document.getElementById(partID).classList.remove('search-hidden');
		}
		else {
			document.getElementById(partID).classList.add('search-hidden');
		}
	});
})