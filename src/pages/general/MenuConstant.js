import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { PAGE } from "../pageConstants";

export const USER_MENU = {
    items:[
    {
        id:'1',
        group:null,
        title:'Home',
        link:`${PAGE.LINK.HOME}`,
        icon:<HomeOutlinedIcon/>
    },
    {
        id:'2',
        group:null,
        title:'Profile',
        link:`${PAGE.LINK.PROFILE}`,
        icon:<PersonOutlinedIcon/>
    },
    {
        id:'3',
        group:"data",
        title:'Tasks',
        link:`${PAGE.LINK.TASKS.INDEX}`,
        icon:<AssignmentOutlinedIcon/>
    },
    {
        id:'4',
        group:"data",
        title:'Projects',
        link:`${PAGE.LINK.PROJETCS}`,
        icon:<AutoAwesomeMosaicIcon/>
    },
    {
        id:'5',
        group:"data",
        title:'calendar',
        link:`${PAGE.LINK.CALENDAR}`,
        icon:<CalendarMonthOutlinedIcon/>
    },
]}

export const ADMIN_MENU = {
    items:[
    {
        id:'10',
        group:null,
        title:'User',
        link:`${PAGE.LINK.USERS}`,
        icon:<PeopleOutlinedIcon/>
    },
    {
        id:'11',
        group:null,
        title:'Department',
        link:`${PAGE.LINK.DEPARTMENTS}`,
        icon:<AccountBalanceOutlinedIcon/>
    },
    {
        id:'12',
        group:"data",
        title:'Positions',
        link:`${PAGE.LINK.POSITIONS}`,
        icon:<WorkOutlineOutlinedIcon/>
    },
]}