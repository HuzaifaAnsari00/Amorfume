import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const url = import.meta.env.VITE_BACKEND_URL; // Use process.env in CRA
    const { id, token } = useParams();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }
        axios.post(`${url}/reset-password/${id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsModalOpen(true);
                    setTimeout(() => {
                      setIsModalOpen(false);
                      navigate('/login');
                    }, 5000);
                } else {
                    setMessage('Failed to reset password. Please try again.');
                }
            }).catch(err => {
                console.log(err);
                setMessage('An error occurred. Please try again later.');
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
      };
    

    return (
<div className="max-w-md mx-auto p-6 my-20 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Reset Password</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
    >
      Reset Password
    </button>
  </form>
  {message && <p className="text-green-600 text-center mt-4">{message}</p>}
  <Modal isOpen={isModalOpen} onClose={closeModal} title="Password Reset">
        <p>Password has been reset successfully. You will be redirected to the login page shortly.</p>
      </Modal>
</div>

    );
}

export default ResetPassword;