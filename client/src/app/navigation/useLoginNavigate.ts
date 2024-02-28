import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokenSelectors } from 'src/app/store/token';
import { RootState } from '../store';

export const useLoginNavigate = () => {
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const location = useLocation();
  const navigate = useNavigate();
  if (token && location.state?.from) setTimeout(() => navigate(location.state?.from));
};
