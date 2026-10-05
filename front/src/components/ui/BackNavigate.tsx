import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const BackNavigate = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className='cursor-pointer inline-block pos'
    >
      <Icon
        icon='line-md:chevron-left'
        style={{
          fontSize: '45px',
          color: '#de6f00f1',
        }}
      />
    </div>
  );
};

export default BackNavigate;
