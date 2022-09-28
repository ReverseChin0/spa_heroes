import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate

}));

describe('prueba de <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'John',
        },
        // login: jest.fn(),
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );
    
    test('debe de mostrar el nombre del usuario', () => { 

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }> {/* Asegurate de cómo se pasa el context y si necesita llaves {} extra */}
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText(contextValue.user.name) ).toBeTruthy();
        // screen.debug();
        
    });

    test('debe de hacer logout y llamar el navigate', () => { 
    
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }> {/* Asegurate de cómo se pasa el context y si necesita llaves {} extra */}
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const btnLogout = screen.getByRole('button');
        fireEvent.click( btnLogout );

        expect(contextValue.logout).toHaveBeenCalled();

        expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", {"replace": true} );

    });

});