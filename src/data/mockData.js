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

export const mockTasks= [
    {
        id:1,
        title:'Create Contents for IELTS',
        description:'To cretate about 500 words for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Mg Mg',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Low',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
    {
        id:2,
        title:'Create Graphic for IELTS',
        description:'To cretate graphic for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Mg Mg',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Medium',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
    {
        id:3,
        title:'Create reminder Contents for IELTS',
        description:'To cretate reminder Contents for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Hla Hla',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Low',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
    {
        id:4,
        title:'Interview with new Graphic Designer',
        description:'To interview with new graphic designer "Mya Mya" ',
        consigner:{
            id:3,
            name:'Hla Hla',
        },
        consignee:{
            id:5,
            name:'Zaw Zaw',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'High',
        status: 'finished',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Interview Links',
        remarks:null,
    },
    {
        id:5,
        title:'Interview with new Content Writer',
        description:'To interview with new content writer',
        consigner:{
            id:3,
            name:'Hla Hla',
        },
        consignee:{
            id:5,
            name:'Zaw Zaw',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Medium',
        status: 'inprogress',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Interview Links',
        remarks:null,
    },
    {
        id:6,
        title:'Interview with new Content Writer',
        description:'To interview with new content writer',
        consigner:{
            id:3,
            name:'Davis',
        },
        consignee:{
            id:5,
            name:'Mg Mg',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Medium',
        status: 'finished',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Interview Links',
        remarks:null,
    },
    {
        id:7,
        title:'Interview with new Content Writer',
        description:'To interview with new content writer',
        consigner:{
            id:3,
            name:'Davis',
        },
        consignee:{
            id:5,
            name:'Mg Mg',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Low',
        status: 'finished',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Interview Links',
        remarks:null,
    },
    {
        id:8,
        title:'Interview with new Content Writer',
        description:'To interview with new content writer',
        consigner:{
            id:3,
            name:'Davis',
        },
        consignee:{
            id:5,
            name:'Mg Mg',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Medium',
        status: 'finished',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Interview Links',
        remarks:null,
    },
    {
        id:9,
        title:'Create Contents for IELTS',
        description:'To cretate about 500 words for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Mg Mg',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Low',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
    {
        id:10,
        title:'Create Contents for IELTS',
        description:'To cretate about 500 words for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Davis',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Medium',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
    {
        id:11,
        title:'Create Contents for IELTS',
        description:'To cretate about 500 words for upcoming IELTS course',
        consigner:{
            id:3,
            name:'Mg Mg',
        },
        consignee:{
            id:5,
            name:'Ko Ko',
        },
        createdAt: new Date("2021-03-25"),
        updatedAt: new Date("2021-03-26"),
        priority:'Low',
        status: 'notyet',
        startDate: new Date("2023-01-05"),
        dueDate:new Date("2023-02-07"),
        finishedDate:new Date("2023-02-05"),
        deliverable:'Content Links',
        remarks:null,
    },
]