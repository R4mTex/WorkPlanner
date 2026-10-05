import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const ButtonCancel = () => {
  const navigate = useNavigate();
  return (
    <div className='btn flex' onClick={() => navigate(-1)}>
      <Icon className='svg' icon='bitcoin-icons:cross-filled' />
      Annuler
    </div>
  );
};

export default ButtonCancel;
