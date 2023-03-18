import { useSelector } from "react-redux";

function Home(){
    const user = useSelector(state=>state.users.user)
    return(
        <h3>
            Welcome - {user.username || ''}
        </h3>
    )
}
export default Home;