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
        PROJETCS: 'user.projects.page',
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
        PROJETCS: '/user/projects',
        CALENDAR: '/user/calendar',
        USERS: '/admin/users',
        DEPARTMENTS: '/admin/department',
        POSITIONS: '/admin/position',
    }
}