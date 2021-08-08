import Loader from 'react-loader-spinner';
import { LoaderContainer } from './Spinner.styled';

export default function Spinner() {
  return (
    <LoaderContainer>
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={200}
        width={200}
        timeout={30000}
      />
    </LoaderContainer>
  );
}
