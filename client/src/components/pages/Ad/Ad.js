import AdDetails from "../../features/AdDetails/AdDetails"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';

const Ad = () => {
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));
  console.log('ad:', ad);

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (
    <AdDetails ad={ad} />
  )
}

export default Ad;