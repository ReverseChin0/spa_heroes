import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en el PrivateRoute', () => { 
    
    test('debe de mostrar el children si está autenticado', () => { 
        
        Storage.prototype.setItem = jest.fn(); //para probar el localstorage

        const contextValue = {
            logged: true,
            user: {
                name: 'John',
                id: 'marst'
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=spiderman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada')) .toBeTruthy();

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath","/search?q=spiderman");
        // screen.debug();
    });

});