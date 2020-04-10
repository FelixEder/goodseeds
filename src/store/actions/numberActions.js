import firestore from '../../config/FirebaseConfig'
export const createNumber = (number) => {
    return (dispatch, getState/*, { getFirebase, getFirestore }*/) => {
        console.log("dispatching... " + number)

        // make async call to db
        // const firestore = getFirestore();
        firestore.collection('test').add({
            number: number
        }).then(
            () => {
                // dispatch to store
                dispatch({ type: 'CREATE_NUMBER', number })
            }
        ).catch(err => console.error(err))


        
    }
};
