'use client';
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link"
import Flash from "@/components/flash";
import { X, Eye, EyeOff } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { register } from '@/app/actions/auth';
import { minLength } from 'zod/v4';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showRegisterFields, setShowRegisterFields] = useState(false);
  const [accept, setAccept] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
    confirmPass: '',
    accept: '',
  });
  const [colours, setColours] = useState({
    minLength: '',
    upperCase: '',
    numberSpecial: '',
  });

  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getColorClass = (color: string | undefined) => {
    switch (color) {
      case 'green':
        return 'text-green-500';
      case 'red':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const validatePasswordHelper = (value: string) => {
    const minLengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const numberOrSymbolRegex = /[^a-zA-Z]/;

    if(showRegisterFields){
      return {
        minLength: minLengthRegex.test(value) ? "green": "red",
        upperCase: uppercaseRegex.test(value) ? "green" : "red",
        numberSpecial: numberOrSymbolRegex.test(value) ? "green" : "red",
      } 
    }
    return {};
  };

  const validateEmail = (value: string) => {
    if(showRegisterFields){
    if (!value) return 'Email is required';
    if (!value.endsWith('@ul.ie') && !value.endsWith('@studentmail.ul.ie')) return 'Email must be an @studentmail.ul.ie or @ul.ie email address';
    return '';
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if(showRegisterFields){
    if (!value) return 'Password is required';
    const combinedRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z])(.{8,})$/;
    if (!combinedRegex.test(value)) return "Password is not valid";
    return '';
  }
  return '';
  };

  const validateUsername = (value: string) => {
    if (!value) return 'Name is required';
    return '';
  };

  const validateConfirmPass = (value: string) => {
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  const validateTerms = (value: boolean) => {
    if(!value) return 'You must accept these policies to access the site';
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    setColours(validatePasswordHelper(value));
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
  };

  const handleConfirmPassChange = (value: string) => {
    setConfirmPass(value);
    setErrors((prev) => ({ ...prev, confirmPass: validateConfirmPass(value) }));
  };

  const handleAcceptChange = (value: boolean) => {
    setAccept(value);
    setErrors((prev) => ({...prev, accept: validateTerms(value)}));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/');
    } else {
      router.push('/login?error=CredentialsSignin');
    }
  };

  const handleRegister = async () => {
    if (!showRegisterFields) {
      setShowRegisterFields(true);
      return;
    }

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const usernameErr = validateUsername(username);
    const confirmErr = validateConfirmPass(confirmPass);
    const acceptErr = validateTerms(accept);

    setErrors({
      email: emailErr,
      password: passwordErr,
      username: usernameErr,
      confirmPass: confirmErr,
      accept: acceptErr,
    });

    setColours(validatePasswordHelper(password));

    if (emailErr || passwordErr || usernameErr || confirmErr || acceptErr) return;

    try {
      await register({ email, password, full_name: username });
      alert('Registration successful! You can now log in.');
      setShowRegisterFields(false);
    } catch (e: any) {
      alert(e?.message || 'Registration failed.');
    }
  };

  const closeRegister = async () => {
    setShowRegisterFields(false);
    return;
  };

  function getErrorMessage(error: string | null) {
    switch (error) {
      case 'NoUser':
        return 'The email address you entered was incorrect';
      case 'InvalidPassword':
        return 'The password you entered was incorrect';
      case 'MissingCredentials':
        return 'Please ensure you enter both your email and password';
      case 'CredentialsSignin':
        return 'Your email address or password was incorrect';
      default:
        return 'Unexpected error. Please try again';
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 my-auto max-w-lg h-full mx-auto bg-gray-300 dark:bg-gray-900 rounded-4xl text-gray-800 dark:text-gray-100" autoComplete='false'>
        <Image src="/logos/new_poolLogo_oval.png" width={150}height={150} alt="UL Pool Club Logo" className='mx-auto' />
        <h1 className='text-2xl md:text-4xl font-bold mb-2 text-center'>University of Limerick</h1>
        <h2 className='text-xl font-bold md:text-3xl mb-2 text-center'>Pool Club</h2>
        <div className="border-t border-gray-800 dark:border-gray-300 border-2 flex-grow"></div>
        <div
  className={`transition-all duration-500 ease-in-out transform
    ${showRegisterFields ? 'max-h-[200px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-95'}
  `}
>
  <Flash type="info" close={false} >
    Make sure you enter your name as it&apos;s shown on&nbsp;
    <Link
      href="https://ulwolves.ie"
      className="text-blue-600 hover:underline dark:text-blue-400"
      target="_blank"
    >
      UL Wolves
    </Link>
    .
  </Flash>
</div>
    {error && (
  <Flash type="error">
   {getErrorMessage(error)}
  </Flash>
  )}


      <h1 className={`text-lg md:text-2xl font-bold mt-6 mb-4 text-center ${!showRegisterFields ? 'opacity-100 scale-100 display-block' : 'opacity-0 scale-y-90 display-none'}`}>Login</h1>
      <h1 className={`text-lg md:text-2xl font-bold mt-2 mb-4 text-center ${showRegisterFields ? 'opacity-100 scale-100 display-block' : 'opacity-0 scale-y-90 display-none'}`}>Register</h1>
      <button type="button" className={`relative float-right ${showRegisterFields ? 'opacity-100 scale-100 display-block' : 'opacity-0 scale-y-90 display-none'}`} onClick={closeRegister}>
        <X className="w-4 h-4 cursor-pointer" />
      </button>

      <label htmlFor="email" className="block text-sm font-medium mt-2">Email</label>
      <input type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} placeholder="@studentmail.ul.ie / @ul.ie" 
        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300"
        />
      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

        {/* Name field for registration */}
        <div
  className={`grid transition-all duration-500 ease-in-out overflow-hidden transform 
    ${showRegisterFields ? 'max-h-32 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-90'}
  `}
>
  <label htmlFor="username" className="block text-sm font-medium mt-2">Name</label>
  <input
    type="text"
    value={username}
    onChange={(e) => handleUsernameChange(e.target.value)}
    placeholder="Enter Your Name as Shown on ulwolves.ie"
        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
  />
  {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
</div>

<div className='relative'>
      {showRegisterFields && (
          <div className={`mt-2 space-y-1 text-sm transition-all duration-500 ease-in-out transform overflow-hidden ${errors.password ? 'max-h-32 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-90'}`}>
              <p className={`${getColorClass(colours.minLength)} transition-colors duration-500`}>• At least 8 characters</p>
              <p className={`${getColorClass(colours.upperCase)} transition-colors duration-500`}>• At least one uppercase letter</p>
              <p className={`${getColorClass(colours.numberSpecial)} transition-colors duration-500`}>• At least one number or symbol</p>
          </div>      
        )}

      <label htmlFor="password" className="block text-sm font-medium mt-2">Password</label>
      <input type={showPassword ? "text" : "password"}
       value={password} 
       onChange={(e) => handlePasswordChange(e.target.value)} 
       placeholder="••••••••"
       className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
      />
       <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={`cursor-pointer absolute right-3 text-gray-500 hover:text-gray-700 ${showRegisterFields ? "top-10.5" : "top-8.5"}`}>
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password}</p>
      )}
    </div>

      <div
  className={`grid transition-all duration-500 ease-in-out overflow-hidden transform 
    ${showRegisterFields ? 'max-h-32 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-90'}
  `}>
  <label htmlFor="confPass" className="block text-sm font-medium mt-2">Confirm Password</label>
  <input
    type={showPassword ? "text" : "password"}
    value={confirmPass}
    onChange={(e) => handleConfirmPassChange(e.target.value)}
    placeholder="••••••••"
        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="cursor-pointer absolute right-3 top-10.5 text-gray-500 hover:text-gray-700">
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
  {errors.confirmPass && (
            <p className="text-sm text-red-500">{errors.confirmPass}</p>
          )}
</div>

<div className={`transition-all duration-500 flex items-start gap-2 mt-4 text-sm ease-in-out overflow-hidden transform 
    ${showRegisterFields ? 'max-h-32 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-y-90'}
  `}>
  <input
    id="terms"
    name="terms"
    type="checkbox"
    className="mt-1 h-4 w-4 cursor-pointer shrink-0 rounded border-gray-300 bg-white text-blue-600 transition-all duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:border-gray-600 dark:bg-gray-800 dark:text-blue-400 dark:focus:ring-offset-gray-900"
    onChange={(e) => handleAcceptChange(e.target.checked)}
  />
  <label htmlFor="terms" className="my-0.5 text-gray-700 dark:text-gray-300">
    I agree to the&nbsp;
    <Link
      href="/terms"
      className="text-blue-600 hover:underline dark:text-blue-400"
      target='_blank'
    >
      Terms of Service
    </Link>
    &nbsp;and&nbsp;
    <Link
      href="/privacy"
      className="text-blue-600 hover:underline dark:text-blue-400"
      target='_blank'
    >
      Privacy Policy
    </Link>
    .
  </label>
  
</div>
{errors.accept && (
        <p className="text-sm text-red-500">{errors.accept}</p>
      )}

      <div className="flex justify-between gap-4 my-5">
      <button
        type="submit"
    className="flex-1 cursor-pointer h-10 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-105 hover:-translate-y-1"
        >
        Log In
      </button>
      <button type='button'
    className="flex-1 cursor-pointer h-10 py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-105 hover:-translate-y-1"
    onClick={handleRegister}
        >
        Register  
      </button>
      </div>
      <div className="flex justify-center">
  <div className="flex-1 max-w-[calc(50%-0.5rem)]">
    <Link
      href="https://ulwolves.ie/club/pool#send_message"
      target="_blank"
      className="block text-center h-10 py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:scale-105 hover:-translate-y-1"
    >
      Contact Us
    </Link>
  </div>
</div>
    </form>
  );
}
