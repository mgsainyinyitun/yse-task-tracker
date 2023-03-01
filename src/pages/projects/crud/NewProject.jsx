import { useParams } from "react-router-dom";

function NewProject(){
    const {id} =useParams();

    return <h3>new project {id} </h3>
}

export default NewProject;