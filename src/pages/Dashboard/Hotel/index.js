import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHotel from '../../../hooks/api/useHotel';
import Card from '../../../components/Hotel/Card';
import Room from '../../../components/Hotel/Rooms';

export default function Hotel() {
  const [hoteis, setHoteis] = useState([]);
  const { hotels } = useHotel();

  useEffect( () => {
    if(hotels) {
      setHoteis(hotels);
    }
  }, [hotels]);

  const [buttons, setButtons]= useState('');
  const [selectedHotelId, setSelectedHotelId] = useState(0);

  function Select(info) {
    setButtons(info.name);
    setSelectedHotelId(info.id);
  }

  return (<div>
    <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
    <ChooseHotel>Primeiro escolha seu hotel!</ChooseHotel>
    <CardContainer>{hotels?.map((i) => <Button onClick={() => Select(i)} name={i.name} disabled={i.name === buttons ? true : false}>{Card(i, i.name === buttons)}</Button>)}</CardContainer>
    <BedroomsContainer>{Room(selectedHotelId, buttons)}</BedroomsContainer>

  </div>);
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ChooseHotel = styled.div `
height: 50px;
color: lightgrey;`;

const CardContainer = styled.div `
display:flex;
flex-direction:row;
align-items: center;
justify-content: space-evenly;
height: 280px;
margin-top:20px;
overflow-x: scroll`;

const Button= styled.button `
background-color: transparent;
height: 240px;
width:210px;
z-index:4;
border-radius: 8px;`;

const BedroomsContainer = styled.div `
width: 500px;
`;

const Button2= styled.div `
background-color: ${props => props.disabled ? 'lightgray': props.color ? 'lightyellow' : 'white'};
width:100px;
height: 30px;`;
