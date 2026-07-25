import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { registerUser, googleSignIn, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser(data.email, data.password);
      await updateUserProfile(data.name, null); // Save the user's name
      toast.success('Account created successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Successfully logged in with Google!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Google Sign-In failed!');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm md:max-w-4xl"
      >
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden border border-gray-100">
            <div className="grid p-0 md:grid-cols-2">
              
              {/* Form Section */}
              <form className="p-8 md:p-12 flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-2 text-center mb-6">
                  <h1 className="text-3xl font-extrabold text-zap-dark">Create Account</h1>
                  <p className="text-gray-500">
                    Join ParCelGo for seamless delivery
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label px-1 py-1">
                      <span className="label-text font-semibold text-gray-700">Full Name</span>
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Doe"
                      className="input input-bordered w-full px-4 rounded-xl focus:outline-none focus:border-zap-green focus:ring-1 focus:ring-zap-green"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                    )}
                  </div>

                  <div className="form-control w-full">
                    <label className="label px-1 py-1">
                      <span className="label-text font-semibold text-gray-700">Email</span>
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder="m@example.com"
                      className="input input-bordered w-full px-4 rounded-xl focus:outline-none focus:border-zap-green focus:ring-1 focus:ring-zap-green"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                    )}
                  </div>
                  
                  <div className="form-control w-full">
                    <label className="label px-1 py-1">
                      <span className="label-text font-semibold text-gray-700">Password</span>
                    </label>
                    <input
                      type="password"
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Minimum 6 characters' }
                      })}
                      className="input input-bordered w-full px-4 rounded-xl focus:outline-none focus:border-zap-green focus:ring-1 focus:ring-zap-green"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                    )}
                  </div>

                  <div className="form-control w-full">
                    <label className="label px-1 py-1">
                      <span className="label-text font-semibold text-gray-700">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      {...register('confirmPassword', { 
                        required: 'Please confirm password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                      className="input input-bordered w-full px-4 rounded-xl focus:outline-none focus:border-zap-green focus:ring-1 focus:ring-zap-green"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn w-full bg-zap-dark hover:bg-black text-white rounded-xl h-12 text-lg font-semibold border-none mt-2"
                  >
                    {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                  </button>
                </div>
                
                <div className="divider text-gray-400 text-sm my-6">Or continue with</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-zap-dark font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Apple
                  </button>
                  <button 
                    type="button" 
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl text-zap-dark font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                </div>
                
                <p className="mt-8 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-zap-dark hover:text-zap-green transition-colors underline underline-offset-4">
                    Log in
                  </Link>
                </p>
              </form>
              
              {/* Image Section */}
              <div className="relative hidden md:block bg-zinc-100 p-8 flex items-center justify-center order-first md:order-last">
                <div className="absolute inset-0 bg-zap-dark/5 z-0"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zap-green/30 to-zap-dark/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-8 text-center">
                     <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 transform rotate-6">
                        <div className="relative flex items-center justify-center w-12 h-12">
                          <div className="absolute inset-0 bg-[#c4f05b] rounded-tl-lg rounded-br-lg transform -skew-x-12"></div>
                          <div className="absolute inset-0 bg-[#c4f05b] opacity-50 rounded-tl-lg rounded-br-lg transform skew-x-12"></div>
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-zap-dark mb-2">Join ParCelGo</h3>
                     <p className="text-gray-600">Start delivering and receiving parcels with unprecedented speed and reliability.</p>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1987&auto=format&fit=crop"
                  alt="Logistics"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30 grayscale"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center px-6 text-sm text-gray-500">
            By clicking continue, you agree to our <a href="#" className="underline underline-offset-4 hover:text-zap-dark">Terms of Service</a>{" "}
            and <a href="#" className="underline underline-offset-4 hover:text-zap-dark">Privacy Policy</a>.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
