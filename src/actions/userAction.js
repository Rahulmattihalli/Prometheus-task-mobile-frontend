const userAction = (data) => (dispatch)=>{
    dispatch({
        type:'USER',
        payload:{name:data.name,email:data.email,date:data.date}
    })   
} 
export default userAction;