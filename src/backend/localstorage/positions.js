export function addPositionsDataToLocal(positions){
    window.localStorage.setItem('positions',JSON.stringify(positions));
}

export function getPositionsDatafromLocal(){
    const posits = JSON.parse(window.localStorage.getItem('positions'))
    return posits;
}