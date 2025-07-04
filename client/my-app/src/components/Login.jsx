import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser as setLoginUser, setLoading, setUserError } from '../slices/userSlice';
import { loginUserAPI } from '../api/user';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error , user} = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    console.log(user,"user")
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const data = await loginUserAPI(formData);
            dispatch(setLoginUser({ user: { email: formData.email }, token: data.token }));
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch(setLoading(false));
            navigate("/dashboard");
        } catch (err) {
            dispatch(setLoading(false));
            dispatch(setUserError(err.response?.data?.message || "Login failed"));
        }
    };
    return (
        <div className="min-h-screen flex  flex-col items-center justify-center bg-gray-400 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
                    Login
                </button>
            </form>

            <p className="text-sm mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link>
            </p>
        </div>
    );
}
