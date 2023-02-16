export const mockProject = [
    {
        id: 1,
        title: 'Socialmedia Department General Content',
        description: 'This is a general project for social media & design department contents',
        creator: {
            id: '1',
            name: 'Mg Mg',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        members: 
        [
           {id:1,name:'Mg Mg'},
           {id:2,name:'Ko Ko'},
           {id:3,name:'Hla Hla'},
        ], 
        tasks: [1, 2, 3], // ID of related tasks
        startDate: null,
        endDate: null,
        progress: 50,
        scope: 1,  // Department id or 'all' 
    },
    {
        id: 1,
        title: 'IELTS Basic Training',
        description: 'This is a IELTS project by YSE, in cooperation with good IELTS teachers',
        creator: {
            id: '1',
            name: 'Mg Mg',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-04-01"),
        members: 
        [
           {id:1,name:'Mg Mg'},
           {id:2,name:'Ko Ko'},
           {id:3,name:'Hla Hla'},
        ],
        tasks: [1, 2, 3], // ID of related tasks
        startDate: new Date("2021-03-25"),
        endDate: new Date("2021-04-25"),
        progress: 20,
        scope: 'all',
    }
];

export const mockUser = [
    {
        id: 1,
        name: 'Sai Nyi Nyi Tun',
        role: 'user',
        email: 'stun@ysenpo.org',
        address: 'yangon',
        phone: '09980004010',
        position: 4,
        department: 1,
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
    },
    {
        id: 2,
        name: 'Davis',
        role: 'admin',
        email: 'davis@ysenpo.org',
        address: 'yangon',
        phone: '09980004010',
        position: 3,
        department: 3,
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
    }
];


export const mockDepartment = [
    {
        id: 1,
        name: 'Social Media and Design Department',
    },
    {
        id: 2,
        name: 'PR Department',
    },
    {
        id: 3,
        name: 'HR Department',
    },
];


export const mockPosition = [
    {
        id: 1,
        name: 'HR',
    },
    {
        id: 2,
        name: 'Content Creator',
    },
    {
        id: 3,
        name: 'Designer',
    },
    {
        id: 4,
        name: 'Web Designer',
    },
];

