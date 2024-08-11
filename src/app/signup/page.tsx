'use client';


import { useRouter } from 'next/navigation';
import { useState, CSSProperties } from 'react';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import DotPattern from '../components/DotPattern';
import { cn } from "../lib/utils";
import TypingAnimation from "../components/TypingAnimation";


const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
   
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      router.push('/'); // Redirect after successful login
    } catch (error) {
      const errorCode = (error as { code: string }).code;
      const errorMessage = (error as { message: string }).message;
      setError(errorMessage);
      setIsModalOpen(true);
      console.log(errorCode, errorMessage);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);


  }




  return (
    <div style={containerStyle}>
      
      <div style={{ marginTop:"-605px" , position:"absolute"}}>
        <TypingAnimation 
            className="text-4xl font-bold text-black dark:text-white"
            text="Welcome to Travell AI"
          />
      </div>

            <DotPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />
      <h1 style={titleStyle}>SignUp </h1>
      <form onSubmit={handleSignUp} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>


      <button type="submit" style={buttonStyle} onClick={() => {router.push("/login")}}>Log In</button>


      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2>Error</h2>
            <p>{error}</p>
            <button style={buttonStyle} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      
    </div>

    
  );
};

const modalOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const modalStyle: CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  width: '400px',
  textAlign: 'center',
  color: 'black',
};


const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};


const titleStyle: CSSProperties = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: 'white',
};


const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};


const inputGroupStyle: CSSProperties = {
  marginBottom: '1rem',
};


const labelStyle: CSSProperties = {
  marginBottom: '0.5rem',
  fontSize: '1rem',
};


const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  color: 'black',
};


const buttonStyle: CSSProperties = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
};


export default SignUp;
