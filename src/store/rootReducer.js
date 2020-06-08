const fileStore = (state = [], action) => {
    switch(action.type){
        case 'ADD_FILE':
            return[
                ...state,{
                    id: action.id               
                }
            ]
        default:
            return state
    }
}

export default fileStore