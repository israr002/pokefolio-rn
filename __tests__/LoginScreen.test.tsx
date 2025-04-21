import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { signInWithEmail, signInWithGoogle } from 'services/authService';
import { NavigationContainer } from '@react-navigation/native';


jest.mock('services/authService', () => ({
  signInWithEmail: jest.fn(),
  signInWithGoogle: jest.fn(),
  resendVerificationEmail: jest.fn()
}));

jest.mock('react-native-linear-gradient', () => {
  const { View } = require('react-native');
  return ({ children }: any) => <View>{children}</View>;
});

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn()
    })
  };
});

const renderWithNavigation = (ui: React.ReactElement) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signs in with email and navigates to Home on success', async () => {
    const mockNavigate = jest.fn();
    (signInWithEmail as jest.Mock).mockResolvedValue({
      success: true,
      emailVerified: true
    });

    const screen = renderWithNavigation(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const signInButton = screen.getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'ash@pokemon.com');
    fireEvent.changeText(passwordInput, 'pikachu123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(signInWithEmail).toHaveBeenCalledWith('ash@pokemon.com', 'pikachu123');
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  it('shows error message on invalid credentials', async () => {
    const errorMessage = 'Invalid email or password';
    (signInWithEmail as jest.Mock).mockResolvedValue({
      success: false,
      error: errorMessage
    });

    const screen = renderWithNavigation(<LoginScreen />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const signInButton = screen.getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'wrong@email.com');
    fireEvent.changeText(passwordInput, 'wrongpass');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('toast-message')).toHaveTextContent(errorMessage);
    });
  });

  it('shows validation errors for empty fields', async () => {
    const screen = renderWithNavigation(<LoginScreen />);
    const signInButton = screen.getByTestId('sign-in-button');

    fireEvent.press(signInButton);

    await waitFor(() => {
      const emailError = screen.getByText('Email is required');
      const passwordError = screen.getByText('Password is required');
      
      expect(emailError).toBeTruthy();
      expect(passwordError).toBeTruthy();
    });
  });

  it('shows validation error for invalid email format', async () => {
    const screen = renderWithNavigation(<LoginScreen />);
    
    const emailInput = screen.getByTestId('email-input');
    const signInButton = screen.getByTestId('sign-in-button');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeTruthy();
    });
  });

  it('shows validation error for short password', async () => {
    const screen = renderWithNavigation(<LoginScreen />);
    
    const passwordInput = screen.getByTestId('password-input');
    const signInButton = screen.getByTestId('sign-in-button');

    fireEvent.changeText(passwordInput, '123');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeTruthy();
    });
  });



  it('successfully signs in with Google', async () => {
    const mockNavigate = jest.fn();
    (signInWithGoogle as jest.Mock).mockResolvedValue({
      success: true,
      user: { email: 'ash@pokemon.com' }
    });

    const screen = renderWithNavigation(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    const googleButton = screen.getByTestId('google-sign-in-button');

    fireEvent.press(googleButton);

    await waitFor(() => {
      expect(signInWithGoogle).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  it('shows error on Google sign-in failure', async () => {
    const errorMessage = 'Unable to sign in. Please check your credentials and try again';
    (signInWithGoogle as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const screen = renderWithNavigation(<LoginScreen />);
    const googleButton = screen.getByTestId('google-sign-in-button');

    fireEvent.press(googleButton);

    await waitFor(() => {
      expect(screen.getByTestId('toast-message')).toHaveTextContent(errorMessage);
    });
  });

  it('navigates to signup screen when signup link is pressed', () => {
    const mockNavigate = jest.fn();
    const screen = renderWithNavigation(<LoginScreen navigation={{ navigate: mockNavigate }} />);
    const signupLink = screen.getByTestId('signup-link');

    fireEvent.press(signupLink);

    expect(mockNavigate).toHaveBeenCalledWith('Signup');
  });
});
