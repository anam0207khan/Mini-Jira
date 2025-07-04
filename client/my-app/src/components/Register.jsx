import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';
import { useSelector, useDispatch } from "react-redux"
import { setLoading, setUserError ,loginUser  } from '../slices/userSlice';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { isLoading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const data = await registerUser(formData);            
            dispatch(loginUser({ user: { _id: data.userId }, token: null }));
            dispatch(setLoading(false));
            navigate('/login');
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setUserError(err.response?.data?.message || 'Registration failed'));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Register
                </button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </form>
            <p className="text-sm mt-4 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
}
