const numberReducer = (state = 0, action) => {

    switch (action.type) {
        case 'CREATE_NUMBER':
            console.log("reducer received dispatch")
            return action.number

        default:
            return state;
    }
}

export default numberReducer;