import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';


describe('Pruebas en <AppRouter/>', () => { 
    
    test('debe de mostrar el login si no está autenticado', () => { 

        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

    });

    test('debe de mostrar el comp de Marvel si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'John',
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }> {/* Asegurate de cómo se pasa el contextvalue y si necesita llaves {} extra */}
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThan(0);

    });

});