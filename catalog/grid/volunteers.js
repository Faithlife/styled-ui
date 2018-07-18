let uniqueId = 0;
let nameIndex = 0;

const names = [
	{
		id: String(uniqueId++),
		name: 'Willis Cote',
	},
	{
		id: String(uniqueId++),
		name: 'Winnie Gross',
	},
	{
		id: String(uniqueId++),
		name: 'Gibson Harris',
	},
	{
		id: String(uniqueId++),
		name: 'Stuart Estes',
	},
	{
		id: String(uniqueId++),
		name: 'Lesa Neal',
	},
	{
		id: String(uniqueId++),
		name: 'Stephenson Blair',
	},
	{
		id: String(uniqueId++),
		name: 'Crawford Kelly',
	},
	{
		id: String(uniqueId++),
		name: 'Hope Olson',
	},
	{
		id: String(uniqueId++),
		name: 'Deborah Rosario',
	},
	{
		id: String(uniqueId++),
		name: 'Avila Austin',
	},
	{
		id: String(uniqueId++),
		name: 'Moon Chambers',
	},
	{
		id: String(uniqueId++),
		name: 'Bolton Mckenzie',
	},
	{
		id: String(uniqueId++),
		name: 'Darla Booth',
	},
	{
		id: String(uniqueId++),
		name: 'Rosalyn Farmer',
	},
	{
		id: String(uniqueId++),
		name: 'Andrea Workman',
	},
	{
		id: String(uniqueId++),
		name: 'Jaclyn Gomez',
	},
	{
		id: String(uniqueId++),
		name: 'Celina Carrillo',
	},
	{
		id: String(uniqueId++),
		name: 'Elma Christian',
	},
	{
		id: String(uniqueId++),
		name: 'Angeline Gibson',
	},
	{
		id: String(uniqueId++),
		name: 'King Clemons',
	},
	{
		id: String(uniqueId++),
		name: 'Clarissa Holden',
	},
	{
		id: String(uniqueId++),
		name: 'Erika Patterson',
	},
	{
		id: String(uniqueId++),
		name: 'Benson Montoya',
	},
	{
		id: String(uniqueId++),
		name: 'Young Schultz',
	},
	{
		id: String(uniqueId++),
		name: 'Kari Holcomb',
	},
	{
		id: String(uniqueId++),
		name: 'Rene Mcclure',
	},
	{
		id: String(uniqueId++),
		name: 'Cornelia Summers',
	},
	{
		id: String(uniqueId++),
		name: 'Burgess Noble',
	},
	{
		id: String(uniqueId++),
		name: 'Gallegos Christensen',
	},
	{
		id: String(uniqueId++),
		name: 'Cox Green',
	},
];

export const getNextVolunteer = () => {
	if (names[nameIndex] == null) {
		nameIndex = 0;
	}

	return names[nameIndex++];
};

export const schedule = {
	people: [
		{
			name: 'User A',
			id: String(uniqueId++),
		},
		{
			name: 'User B',
			id: String(uniqueId++),
		},
		{
			name: 'User C',
			id: String(uniqueId++),
		},
	],
	roles: [
		{
			name: 'Greeter',
			team: 'Hospitality',
			id: String(uniqueId++),
		},
		{
			name: 'Parking',
			team: 'Hospitality',
			id: String(uniqueId++),
		},
		{
			name: 'Choir Lead',
			team: 'Choir',
			id: String(uniqueId++),
		},
		{
			name: 'Choir Tenor',
			team: 'Choir',
			id: String(uniqueId++),
		},
		{
			name: 'School Age Helper',
			team: 'Children',
			id: String(uniqueId++),
		},
	],
	events: [
		{
			name: 'Morning Service',
			description: 'Jun 1 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 8 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 15 10:00 AM',
			id: String(uniqueId++),
		},
		{
			name: 'Morning Service',
			description: 'Jun 15 10:00 AM',
			id: String(uniqueId++),
		},
	],
};
