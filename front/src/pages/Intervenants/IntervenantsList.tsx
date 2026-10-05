// import ButtonAddIntervenant from '@/components/ui/btn/ButtonAddIntervenant';

import { useEffect, useState } from 'react';

import { getAllIntervenant } from '@/api/intervenant';
import CardIntervenant from '@/components/Card/CardIntervenant';
import { IntervenantInterface } from '@/interfaces/IntervenantInterface';

const IntervenantsList = () => {
  const [intervenant, setIntervenant] = useState<IntervenantInterface[]>([]);

  useEffect(() => {
    const loadAllIntervenant = async () => {
      const response = await getAllIntervenant();
      setIntervenant(response ?? []);
    };
    loadAllIntervenant();
  }, []);

  return (
    <div>
      <h1>Intervenants</h1>
      {intervenant.map((intervenant: IntervenantInterface) => (
        <CardIntervenant key={intervenant.id} {...intervenant} />
      ))}
      {/* <ButtonAddIntervenant /> */}
    </div>
    // id={newId}
  );
};

export default IntervenantsList;
