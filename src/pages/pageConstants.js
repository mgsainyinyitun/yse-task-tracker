export const PAGE =
{
    NAME:
    {
        SIGNIN:'sign.page',
        SIGNUP:'signup.page',
        
        HOME: 'user.home.page',
        TASKS: 
        {
            INDEX:'user.tasks.page',
            DETAIL:'user.tasks.detail.page',
            EDIT:'user.tasks.edit.page',
            CREATE:'user.tasks.create.page',
        },
        PROFILE: 'user.profile.page',
        PROJETCS:{
            INDEX:'user.projects.page',
            DETAIL:'user.projects.detail.page',
            EDIT:'user.projects.edit.page',
            CREATE:'user.projects.create.page',
        },
        CALENDAR: 'user.calendar.page',
        USERS: 'admin.users.mgmt.page',
        DEPARTMENTS: 'admin.department.mgmt.page',
        POSITIONS: 'admin.position.mgmt.page',
    },
    LINK:
    {
        SIGNIN:'/signin',
        SIGNUP:'/signup',
        HOME: '/',
        TASKS: 
        {
            INDEX:'/user/tasks',
            DETAIL:'/user/tasks/detail/:id',
            EDIT:'/user/tasks/edit/:id',
            CREATE:'/user/tasks/create',
        },
        PROFILE: '/user/profile',
        PROJETCS: {
            INDEX:'/user/projects',
            DETAIL:'/user/projects/detail/:id',
            EDIT:'/user/projects/edit/:id',
            CREATE:'/user/projects/create',
        },
        CALENDAR: '/user/calendar',
        USERS: '/admin/users',
        DEPARTMENTS: '/admin/department',
        POSITIONS: '/admin/position',
    }
}