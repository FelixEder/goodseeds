export const signIn = credentials => {
    
    return (dispatch, getState, { getFirebase }) => {
        
        const firebase = getFirebase()
        
        // Sign in with email and password
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch( {type: 'LOGIN_ERROR', err})
        })
    }

}

export const signOut =  () => {
    // Sign out,
    // no user info is needed
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then( () => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) => {
    // Sign up
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        // Create user in firebase authentication
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        )

        // Add user to firestore collection
        .then((response) => {
            return firestore.collection('Users').doc(response.user.uid).set({
                name: newUser.name,
                email: newUser.email,
                plants: [],
                reviews: []
            })
        })
        // Dispatch to reducer
        .then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        })

        .catch(err => {
            dispatch( {type: 'SIGNUP_ERROR', err})
        })


    }
}