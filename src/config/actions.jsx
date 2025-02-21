  export const addUser = (user) => {
      return {
        type: 'ADD_USER',
        payload: user
      }
    }
    
    export const addAnnonce = (annonce) => ({
      type: 'ADD_ANNONCE',
      payload: annonce,
    });
    export const setCurrentUser = (user) => ({
      type: 'SET_CURRENT_USER',
      payload: user,
    });
    export const setUsers = (users) => {
      return {
        type: 'SET_USERS',
        payload: users
      }
    }

    export const signUpUser = (userData) => {
      return {
        type: 'SIGN_UP_USER',
        payload: userData,
      };
    };

  export const setAnnonces = (annonces) => ({
      type: 'SET_ANNONCES',
      payload: annonces
    });
    

  export const reserveAnnonce = (annonceId,price, userEmail) => ({
    type: 'RESERVE_ANNONCE',
    payload: {
      id: Date.now(), 
      annonceId,
      userEmail,
      status: 'Pending',
      price
    },
  });
      
  export const approveReservation = (reservationId) => ({
    type: 'APPROVE_RESERVATION',
    payload: reservationId,
  });

  export const updateAnnonceStatus = (annonceId, status) => ({
    type: 'UPDATE_ANNONCE_STATUS',
    payload: { annonceId, status },
  });
  
  
  