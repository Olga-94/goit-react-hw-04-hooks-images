import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalContainer, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({selectedImg, tags, onClose}){
  useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.addEventListener('keydown', handleKeyDown)
        }
  })
  
  const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

  return createPortal(
            <ModalOverlay onClick={handleBackdropClick}>
             <ModalContainer>
        <Image
          src={selectedImg}
          alt={tags}
        />
             </ModalContainer>
            </ModalOverlay>, modalRoot)
}


Modal.propTypes = {
        selectedImg: PropTypes.string,
        tags: PropTypes.string,
        onClose: PropTypes.func,
    }
// export default class Modal extends Component {
//   static propTypes = {
//     selectedImg: PropTypes.string,
//     tags: PropTypes.string,
//     onClose: PropTypes.func,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { selectedImg, tags } = this.props;

//     return createPortal(
//       <ModalOverlay onClick={this.handleBackdropClick}>
//         <ModalContainer>
//           <Image src={selectedImg} alt={tags} />
//         </ModalContainer>
//       </ModalOverlay>,
//       modalRoot,
//     );
//   }
// }
