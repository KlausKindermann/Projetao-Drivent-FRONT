import styled from 'styled-components';
import { Label } from '../../../components/Auth';
import useTicket from '../../../hooks/api/useTicket';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import ActivitiesBlock from '../../../components/Activities';

export default function Activities() {
//Área liberada somente após usuário terminar a inscrição, pagar e escolher o hotel (se for o caso)
//Não sendo o caso, a tela “Atividades - Não Disponível” aparece.
//Isto é /msg de confirmação de pagamento
//Se o ingresso não inclui hospedagem, o usuário já tem acesso a todas as atividades, 
//como demonstrado na tela “Atividades - Tudo Incluído”.
// msg: Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
  //Buscar atividades
/*   Instruções
As atividades são divididas por dias e espaços.
Cada atividade tem um número limitado de vagas, sendo assim, se estiver esgotada, 
novos integrantes não podem se cadastrar (lembrando que aqui estamos considerando 
a participação em um espaço físico).
O usuário não pode se cadastrar em dois eventos que acontecem simultaneamente.
Não é possível desfazer uma reserva em um evento. */
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [isAllInclusive, setIsAllInclusive] = useState(false);

  const { ticket } = useTicket();

  if (ticket?.status !== 'PAID') {
    /* return (
      <>
        <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
        <Paragraph>
          Você precisa ter confirmado o pagamento antes de fazer a escolha de atividades
        </Paragraph>
      </>
    ); */
  }

  return (
    <>
      <StyledTypography variant="h4">{isAllInclusive ? 'Escolha de hotel e quarto' : 'Escolha de atividades'}</StyledTypography>
      {isNotAvailable ? (
        <Paragraph> Você precisa ter confirmado o pagamento antes de fazer a escolha de atividades 
        </Paragraph>
      ):( isAllInclusive ? (
        <Paragraph> Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
        </Paragraph>
      ) : (
        <ActivitiesBlock />
      )
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Paragraph = styled.div`
  font-size: 20px;
  line-height: 23.44px;
  text-align: center;
  color: #8E8E8E;
  width: 411px;
  height: 46px;
  position: absolute; 
  top: 40%;
  left: 30%;
`;

