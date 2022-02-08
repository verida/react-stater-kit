import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import VeridaClient from '../api/veridaClient';

const useAuth = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    const connectVault = async () => {
        setIsLoading(!isLoading);
        try {
            await VeridaClient.connect();
            setIsLoading(!isLoading);
            navigate('/');
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(!isLoading);
        }
    };


    useEffect(() => {
        return () => {
            setIsLoading(true);
        };
    }, []);

    return {
        error,
        isLoading,
        connectVault,
    }
}

export default useAuth
