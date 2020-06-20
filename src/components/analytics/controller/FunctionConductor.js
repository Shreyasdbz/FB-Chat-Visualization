import React from 'react';
//Functions
import * as Functions from './FunctionList'
import MessagesByUser from '../MessagesByUser'
import MostWordUses from '../MostWordUses'

const FunctionConductor = props => {
    switch(props.currentFunction){
        case Functions.MESSAGES_BY_USER:
            return <MessagesByUser {...props}></MessagesByUser>
    
        case Functions.MOST_WORD_USES:
            return <MostWordUses {...props}></MostWordUses>

        default:
            return null
    }
};

export default FunctionConductor
