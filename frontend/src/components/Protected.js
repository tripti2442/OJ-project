import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { logged } from '../services/api';
import Admin from './Admin'; // Import the Admin component
import User from './User'; // Import the User component
import { Outlet } from 'react-router-dom';
import { getRole, isLoggedIn } from '../Auth';

export default function Protected() {
    const params =useParams();
    const {role} = params;
    console.log("role in frontend ",role);
    const data= getRole();
    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }
    if(data==="admin"){
        return <Admin/>
    }
    if(data==="user"){
        return <User/>
    }

    //return isLoggedIn() ? <Outlet/> : <Navigate to ={"/login"}/>
}









/*import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { getRole } from '../Auth'; // Adjust this to your actual API call to get user role
import Admin from './Admin';
import User from './User';
import { isLoggedIn } from '../Auth'; // Assuming you have a function to check if user is logged in

export default function Protected() {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserRole() {
            try {
                const role = await getRole(); // Adjust this to your actual API call
                setUserRole(role);
                console.log("roleey "+userRole);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user role:', error);
                setLoading(false);
            }
        }

        if (isLoggedIn()) {
            fetchUserRole();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    // Redirect to login if not logged in
    if (!isLoggedIn()) {
        return <Navigate to="/login" />;
    }

    // Redirect based on user role
    if (userRole === 'admin') {
        return <Navigate to="/protected/admin" />;
    } else if (userRole === 'user') {
        return <Navigate to="/protected/user" />;
    } else {
        // Handle other roles or unexpected cases
        console.error('Unexpected user role:', userRole);
        return <Navigate to="/login" />;
    }

    // Note: Rendering <Outlet> inside the return statement is not necessary here
}*/

















/*import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logged } from '../services/api';
import Admin from './Admin'; // Import the Admin component
import User from './User'; // Import the User component

export default function Protected() {
    console.log("protected");
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                return <Navigate to="/login" />;
            }

            try {
                const response = await logged(token);
                if (response === 'admin' || response === 'user') {
                    setRole(response);
                } else {
                    return <Navigate to="/login" />;
                }
            } catch (error) {
                console.error('Authentication error:', error);
                return <Navigate to="/login" />;
            } finally {
                setLoading(false);
            }
        };

        authenticate();
    }, [token]);

    useEffect(() => {
        const delayNavigation = setTimeout(() => {
            setLoading(false); // Ensure loading state is set to false to render appropriate component or redirect
        }, 1000); // Adjust the delay time as needed (1000 ms = 1 second)

        return () => clearTimeout(delayNavigation); // Cleanup function to clear timeout if component unmounts
    }, []); // Empty dependency array to ensure this effect runs only once

    // Handle automatic redirection based on role
    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'admin') {
        return <Admin />;
    }

    if (role === 'user') {
        return <User />;
    }

    // If role is not admin or user, redirect to login
    return <Navigate to="/login" />;
}
*/



/*import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logged } from '../services/api';
import Admin from './Admin'; // Import the Admin component
import User from './User'; // Import the User component

export default function Protected() {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                return <Navigate to="/login" />;
            }

            try {
                const response = await logged(token);
                if (response === 'admin' || response === 'user') {
                    setRole(response);
                } else {
                    return <Navigate to="/login" />;
                }
            } catch (error) {
                console.error('Authentication error:', error);
                return <Navigate to="/login" />;
            } finally {
                setLoading(false);
            }
        };

        authenticate();
    }, [token]);

    // Handle automatic redirection based on role
    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'admin') {
        return <Admin />;
    }

    if (role === 'user') {
        return <User />;
    }

    // If role is not admin or user, redirect to login
    return <Navigate to="/login" />;
}
*/







/*import React, { useEffect, useState } from 'react';
import { Navigate , Link } from 'react-router-dom';
import { logged } from '../services/api';
import Admin from './Admin'; // Ensure you import the Admin component
import User from './User'; // Ensure you import the User component

export default function Protected({ children }) {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                history.push('/login');
                return;
            }

            try {
                const response = await logged(token);
                if (response === 'admin' || response === 'user') {
                    setRole(response);
                } else {
                    history.push('/login');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                history.push('/login');
            } finally {
                setLoading(false);
            }
        };
        authenticate();
    }, [token, history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'admin') {
        return <Admin />;
    }

    if (role === 'user') {
        return <User />;
    }

    return null;
}
*/















/*import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logged } from '../services/api';

export default function Protected({ children }) {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                history.push('/login');
                return;
            }

            try {
                const response = await logged(token);
                if (response === 'admin' || response === 'user') {
                    setRole(response);
                } else {
                    history.push('/login');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                history.push('/login');
            } finally {
                setLoading(false);
            }
        };
        authenticate();
    }, [token, history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'admin') {
        history.push('/admin');
        console.log("hello"+role);
        return null;
    }

    if (role === 'user') {
        history.push('/user');
        return null;
    }

    return null;
}*/






/*import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { logged } from '../services/api';

export default function Protected({ children }) {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const history = useHistory();

    useEffect(() => {
        const authenticate = async () => {
            if (!token) {
                history.push('/login');
                return;
            }

            try {
                const response = await logged(token);
                if (response === 'admin' || response === 'user') {
                    setRole(response);
                } else {
                    history.push('/login');
                }
            } catch (error) {
                console.error('Authentication error:', error);
                history.push('/login');
            } finally {
                setLoading(false);
            }
        };
        authenticate();
    }, [token, history]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'admin') {
        return <Redirect to="/admin" />;
    }

    if (role === 'user') {
        return <Redirect to="/user" />;
    }

    return <Redirect to="/login" />;
}*/


/*import React, { useEffect } from 'react';
import { logged } from '../services/api';

export default function Protected({ Component }) {
  
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const authenticate = async () => {
            const role = await logged(token);
            console.log("authenticate"+role);
        };
        authenticate();
    }, [token]);

    return <Component />;
}

*/







/*import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { logged } from '../services/api';

export default function Protected(props) {
    const { Component } = props;
    const token=localStorage.getItem('token');

    /*useEffect(() => {
        const authentication=role.message;
        if (!logged) {
           
            window.location.href = '/login'; 
        }
    }, []);*/
    /*const dataPromise = logged(token);
            dataPromise.then((data) => {
                console.log(data);
            })

    return (
        <div>
            <Component />
        </div>
    );
}*/
