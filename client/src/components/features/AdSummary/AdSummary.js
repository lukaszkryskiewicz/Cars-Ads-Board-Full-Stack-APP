import styles from './AdSummary.module.scss';
import clsx from 'clsx'
import { IMGS_URL } from '../../../config';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdSummary = ({ title, image, address, _id }) => {

  return (
    <div className={clsx(styles.root, 'p-3 border border-primary')}>
      <div className={clsx(styles.adSummaryContainer)}>
        <h3>{title}</h3>
        <div className={clsx(styles.photoContainer)}>
          <img src={IMGS_URL + image} alt={title} />
        </div>
        <p>{address}</p>
        <NavLink to={"/ad/" + _id}>
          <Button variant="primary">
            Read more
          </Button>
        </NavLink>

      </div>
    </div>
  )
}

export default AdSummary;