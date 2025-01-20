import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../lib/supabase';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isClub, setIsClub] = useState(null);

  useEffect(() => {
    checkIfClub();
  }, []);

  useEffect(() => {
    // Protection des routes : rediriger si l'utilisateur n'est pas au bon endroit
    if (isClub !== null) { // Seulement après la vérification initiale
      const isClubPath = location.pathname.startsWith('/club/');
      
      if (isClub && !isClubPath) {
        navigate('/club/dashboard');
      } else if (!isClub && isClubPath) {
        navigate('/dashboard');
      }
    }
  }, [isClub, location.pathname, navigate]);

  const checkIfClub = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: clubData } = await supabase
          .from('clubs')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setIsClub(!!clubData);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du type d\'utilisateur:', error);
      setIsClub(false);
    }
  };

  return (
    <header>
      <div className="logo" style={{ cursor: isClub ? 'default' : 'pointer' }} 
           onClick={isClub ? undefined : () => navigate('/dashboard')}>
        CLUBCENTER
      </div>
      {/* ... rest of the header code ... */}
    </header>
  );
};

export default Header; 