const loadState = (key, defaultValue) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};


const initialState = {
  users: loadState("users", [
    { id: 1, email: 'root@gmail.com', password: 'root' },
    { id: 2, email: 'test@gmail.com', password: 'test' },
    {id:3, email:'root@root.com', password:'root', type:'root'}
  ]),
  reservations: loadState("reservations", []),
  annonces: loadState("annonces", []),
  switchLogin : false
};


const reducerFunction = (state = initialState, action) => {
  let newState;
  
  switch(action.type) {
    case 'ADD_USER':
      newState = { ...state, users: [...state.users, action.payload] };
      saveState("users", newState.users);
      return newState;

    case 'ADD_ANNONCE':
      newState = { ...state, annonces: [...state.annonces, action.payload] };
      saveState("annonces", newState.annonces);
      return newState;

    case 'SIGN_UP_USER':
      newState = { ...state, users: [...state.users, action.payload] };
      saveState("users", newState.users);
      return newState;

    case 'SET_USERS':
      saveState("users", action.payload);
      return { ...state, users: action.payload };

    case 'SET_ANNONCES':
      saveState("annonces", action.payload);
      return { ...state, annonces: action.payload };

    case 'RESERVE_ANNONCE':
      newState = {
        ...state,
        annonces: state.annonces.map(annonce =>
          annonce.id === action.payload.annonceId
            ? { ...annonce, availability: 'Pending' }
            : annonce
        ),
        reservations: [...state.reservations, action.payload],
      };
      saveState("annonces", newState.annonces);
      saveState("reservations", newState.reservations);
      return newState;

    case 'APPROVE_RESERVATION':
      newState = {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload
            ? { ...reservation, status: 'Approved' }
            : reservation
        ),
        annonces: state.annonces.map(annonce =>
          state.reservations.some(reservation => reservation.annonceId === annonce.id && reservation.id === action.payload)
            ? { ...annonce, availability: 'Reserved' }
            : annonce
        ),
      };
      saveState("reservations", newState.reservations);
      saveState("annonces", newState.annonces);
      return newState;

      case 'DENY_RESERVATION':
      newState = {
        ...state,
        reservations: state.reservations.map(reservation =>
          reservation.id === action.payload
            ? { ...reservation, status: 'Denied' }
            : reservation
        ),
        annonces: state.annonces.map(annonce =>
          state.reservations.some(reservation => reservation.annonceId === annonce.id && reservation.id === action.payload)
            ? { ...annonce, availability: 'Available' }
            : annonce
        ),
      };
      saveState("reservations", newState.reservations);
      saveState("annonces", newState.annonces);
      return newState;

    case 'CANCEL_RESERVATION':
      newState = {
        ...state,
        reservations: state.reservations.filter(reservation => reservation.id !== action.payload.reservationId),  annonces: state.annonces.map(annonce =>
          annonce.id === action.payload.annonceId
            ? { ...annonce, availability: 'Available' }
            : annonce
        ),
      };
      saveState("reservations", newState.reservations);
      saveState("annonces", newState.annonces);

      return newState;
    case 'DELETE_ANNONCE':
      newState = {
        ...state,
           annonces: state.annonces.filter(annonce =>
          annonce.id !== action.payload
        ),
      };
      saveState("annonces", newState.annonces);
      return newState;

    case 'switchLogin': 
      return {...state, switchLogin : action.payload}  
    default:
      return state;
  }
};

export default reducerFunction;

