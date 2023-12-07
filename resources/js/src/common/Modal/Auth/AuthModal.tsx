import React, { useState, useEffect } from 'react';
import icon from '../../../../assets/images/user-icn.png';
import PreferancesModal from '../PreferancesModal/PreferancesModal';
import { toast } from 'react-toastify';
import { postHttpRequest } from '../../../axios';




/**
* Auth Modal Component.
*
* All rights Reseverd | Arhamsoft Pvt @2023
*
* @returns {JSX.Element} - JSX representation of the component.
*/

const AuthModal: React.FC = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in based on the presence of the access token
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
    }, []);

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    // Initialize state for login and signup data
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    // Handle changes for login form inputs
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle changes for signup form inputs
    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle login form submission
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await postHttpRequest('/api/login', {
                email: loginData.email,
                password: loginData.password,
            });
            if (response.data?.success) {
                const accessToken = response.data.data.token;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));

                window.location.reload();
                toast.success(response.data?.message)
            }

        } catch (error: any) {
            toast.error(error.response.data.message)

        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await postHttpRequest('/api/register', {
                name: signupData.name,
                email: signupData.email,
                password: signupData.password,
                password_confirmation: signupData.passwordConfirmation,
            });
            if (response.data.success) {
                const accessToken = response.data.data.token;
                localStorage.setItem('accessToken', JSON.stringify(accessToken));

                window.location.reload();
                toast.success(response.data?.message)
            }

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                toast.error('No access token found');
                return;
            }

            const cleanedAccessToken = accessToken.replace(/^"|"$/g, '');

            await postHttpRequest('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${cleanedAccessToken}`,
                },
            });

            localStorage.removeItem('accessToken');
            setIsLoggedIn(false);
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <React.Fragment>
            {isLoggedIn ? (
                <>
                    <PreferancesModal />
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <div className="shopping-cart">
                    <div className="user-wrapper">
                        <button className="user cart-spacing" type="button" data-bs-toggle="modal"
                            data-bs-target="#exampleModal2"><img src={icon} alt="" />
                        </button>
                        <div className="modal fade" id="exampleModal2" tabIndex={-1}
                            aria-labelledby="exampleModal2Label" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModal2Label">Sign Up & Login Here
                                        </h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="custom-modal">
                                            <div className="main">
                                                <input type="checkbox" id='chk2' aria-hidden="true" />

                                                <div className="signup">
                                                    <form onSubmit={handleSignupSubmit}>
                                                        <label htmlFor="chk2" aria-hidden="true">Sign up</label>
                                                        <input type="text" name="name" value={signupData.name} onChange={handleSignupChange} placeholder="User name"
                                                            required />
                                                        <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Email"
                                                            required />
                                                        <input type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Password" required />
                                                        <input type="password" name="passwordConfirmation" value={signupData.passwordConfirmation} onChange={handleSignupChange} placeholder="Password" required />
                                                        <button type="submit">Sign up</button>
                                                    </form>
                                                </div>

                                                <div className="login">
                                                    <form onSubmit={handleLoginSubmit}>
                                                        <label htmlFor="chk2" aria-hidden="true">
                                                            Login
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={loginData.email}
                                                            onChange={handleLoginChange}
                                                            required
                                                        />
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={loginData.password}
                                                            onChange={handleLoginChange}
                                                            required
                                                        />
                                                        <button type="submit">Login</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            )}
        </React.Fragment>
    )
}

export default AuthModal
