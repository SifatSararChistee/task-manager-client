import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';

const Login = () => {
    const { setUser,logInWithGoogle, setLoading} =useContext(AuthContext)
    const navigate = useNavigate()
    const handleGoogleLogin=()=>{
        logInWithGoogle()
        .then((userCredential) => {
        const user = userCredential.user;
            setUser(user)
            setLoading(false)
            toast.success("Login Successful")
            navigate( "/app")
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.message)
        });
      }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to Task Manager</h1>
                <h2 className="text-gray-600 mt-2">Please Sign In to Proceed</h2>

                <button onClick={handleGoogleLogin} className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md 
                        flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                    <FcGoogle />Login With Google
                </button>
            </div>
        </div>
    );
};

export default Login;
