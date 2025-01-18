import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../providers/AuthContext";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, setUser, updateUserProfile, handleGoogleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const regex = /^(?=.*[A-Z])(?=.*[\W]).+$/;
    const password = form.password.value;
    if (!regex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter and one special character."
      );
      return;
    }
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`,
      formData
    );
    const imageUrl = data.data.display_url;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({
          displayName: name,
          photoURL: imageUrl,
        })
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
              role: "user",
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                form.reset();
                toast.success("Welcome to Elite Estate");
                navigate("/");
              }
            });
          })
          .catch((error) => {
            toast.error(`Unable to update profile. ${error}`);
          });
      })
      .catch((error) => toast.error(`${error.code}`));
  };

  return (
    <div className="hero my-24 font-inter">
      <div className="card bg-base-100 w-full max-w-sm md:max-w-4xl shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="uppercase text-center font-bold text-3xl font-playfair">
            Create account
          </h2>
          <div className="md:flex md:gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Upload Profile Picture</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              />
            </div>
          </div>
          <div className="md:flex md:gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-default text-white hover:bg-light hover:border-light">
              Register
            </button>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn bg-base-200 hover:bg-base-100"
            >
              <FcGoogle className="text-2xl" /> Signup with Google
            </button>
            <p className="text-sm text-center mt-4">
              Already Have An Account?{" "}
              <Link
                className="text-default font-bold hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
