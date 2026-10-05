import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

const ButtonAddIntervenant = ({ id }: { id?: number }) => {
  return (
    <NavLink to={`/intervenant/ajout/${id}`} className="btn add btn-shadow">
      <Icon
        className="svg"
        icon="ic:baseline-plus"
        style={{
          color: 'black',
        }}
      />
      Ajouter un intervenant
    </NavLink>
  );
};

export default ButtonAddIntervenant;
