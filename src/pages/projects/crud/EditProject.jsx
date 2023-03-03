import { useParams } from "react-router-dom";

function EditProject(){
    const {id} = useParams();
    return (<h3>
        Project Edit {id}
    </h3>)
}
export default EditProject;