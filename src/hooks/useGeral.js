import { useContext } from 'react';
import GeralContext from '../contexts/GeralContext';

export default function useGeral() {
  return useContext(GeralContext);
}
