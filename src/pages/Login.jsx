import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const { userLogin, setUser, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await userLogin(email, password);
      const user = result.user;
      setUser(user);
      form.reset();
      navigate("/");
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero my-24 font-inter">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="uppercase text-center font-bold text-3xl font-playfair">
            Welcome Back
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              className="btn bg-default text-white hover:bg-light hover:border-light"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                </>
              ) : (
                "Login"
              )}
            </button>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className=" btn bg-base-200 hover:bg-base-100"
              disabled={loading}
            >
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <Link
                className="text-default font-bold hover:underline"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
