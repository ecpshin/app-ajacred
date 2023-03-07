import { useContext } from 'react';
import ModalContext from '../contexts/ModalContext';

export default function useModalContext() {
  return useContext(ModalContext);
}
