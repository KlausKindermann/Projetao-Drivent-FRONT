import styled from 'styled-components';
import useBookingByRoomId from '../../hooks/api/useBookingByRoomId';
import { useEffect, useState } from 'react';

export default function SpecificRoom({ roomInfo, disabled, cor }) {
  const { bookings } = useBookingByRoomId(roomInfo.id);

  let quantidade = [];
  for (let i=0; i < roomInfo.capacity; i++) {
    quantidade.push(i);
  }
  
  let tam= quantidade.length;
  let dif;
  let notAvailable=0;
  let reservado=[];
  let difArray=[];

  if(bookings) {
    notAvailable= bookings.length;
    dif = tam - notAvailable;
    for (let i=0; i < notAvailable; i++) {
      reservado.push(i);
    }
    for (let i=0; i < dif; i++) {
      difArray.push(i);
    }
  }

  return (
    <Container unavailable={tam === notAvailable}>
      <Div>{roomInfo.id}</Div>
      <Div>{tam === notAvailable ? quantidade?.map((i) => <ion-icon name="person"></ion-icon>) 
        : dif === tam ? quantidade?.map((i) => <ion-icon name="person-outline" color={disabled ? 'lightyellow': cor ? 'lightyellow' : 'white' }></ion-icon>) :
          <Container2><div>{reservado?.map((i) => <><ion-icon name="person" color="pink"></ion-icon></>)}</div><div>{ difArray?.map((i) => <ion-icon name="person-outline" color={disabled ? 'lightyellow': cor ? 'lightyellow' : 'white' }></ion-icon>)}</div></Container2>}</Div>
    </Container>
  );
};

const Container = styled.div `
width:160px;
height: 30px;
display:flex;
flex-direction:row;
justify-content: space-between;
background-color:${props => props.unavailable? 'gray' : 'white'}
`;

const Div = styled.div `
width:60px;
ion-icon {
  color: blue;
};`;

const Container2= styled.div `
display:flex;
flex-direction:row;`;

