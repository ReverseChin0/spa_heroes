import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('pruebas en authReducer', () => { 

    const initialState = {
    logged: false,
    }

    const loginAction = {
        type: types.login,
        payload:{
            id:'ABC',
            name:'Francisco'
        }
    }

    const logoutAction = {
        type:types.logout,
    }

    
    test('debe de retornar el estado por defecto', () => { 
        const state = authReducer( initialState, {} );
        expect( state ).toEqual( initialState );
    });

    test('debe de llamar login, autenticar establecer el user', () => { 
        const logedInState = authReducer( initialState, loginAction );
        expect(logedInState.user).toBe(loginAction.payload);
    });

    test('debe de llamar logout, borrar name y logged en false', () => { 
        const logedInState = authReducer( initialState, loginAction );
        expect(logedInState.logged).toBeTruthy();
        const outState = authReducer( logedInState, logoutAction );
        expect(outState.logged).toBeFalsy();
    });

});