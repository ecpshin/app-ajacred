import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function UseAuthContext() {
  return useContext(AuthContext);
}
