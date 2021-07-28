import React from 'react';
import Loader from 'react-loader-spinner';
import { LoaderContainer } from './Spinner.styled';

export default function Spinner() {
  return (
    <LoaderContainer>
      <Loader type="ThreeDots" color="#3f51b5" height={250} width={250} />
    </LoaderContainer>
  );
}
