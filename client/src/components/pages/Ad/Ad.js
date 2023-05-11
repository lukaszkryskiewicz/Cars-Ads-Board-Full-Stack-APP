import AdDetails from "../../features/AdDetails/AdDetails"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdById } from '../../../redux/adsRedux';
import { Button } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './Ad.module.scss';

const Ad = () => {
  const { id } = useParams();
  const ad = useSelector(state => getAdById(state, id));

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (<>
    <div className={clsx(styles.buttons)}>
      <Button className='m-1'>
        Edit
      </Button>
      <Button className='m-1' variant='danger'>
        Delete
      </Button>
    </div>
    <AdDetails ad={ad} />
  </>
  )
}

export default Ad;