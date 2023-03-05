import { useSelector } from "react-redux";

function Home(){
    const user = useSelector(state=>state.user.user)
    return(
        <h3>
            Welcome - {user.email}
        </h3>
    )
}
export default Home;