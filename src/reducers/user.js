const defaultState={
    name:"",
    email:"",
}
const UserReducer = (state=defaultState,action)=>{
    switch(action.type){
        case "USER": 
            return {...state,name:action.payload.name,email:action.payload.email}
        default:
            return state;
    }

}
export default UserReducer;