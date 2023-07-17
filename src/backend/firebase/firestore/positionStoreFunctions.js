import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { addPositions } from "../../../redux/reducers/positionSlice";
import { addPositionsDataToLocal } from "../../localstorage/positions";

export const getPositionsData = (dispatch) => onSnapshot(
    collection(db, "positions"),
    (snapshots) => {
        let positions = [];
        snapshots.forEach(position => {
            positions.push(position.data());
        });
        addPositionsDataToLocal(positions);
        dispatch(addPositions(positions));
    },
    (error) => {
        console.log(error);
    }
);