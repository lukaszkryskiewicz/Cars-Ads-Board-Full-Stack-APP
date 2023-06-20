import styles from './AdSummary.module.scss';
import clsx from 'clsx'
import { IMGS_URL } from '../../../config';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdSummary = ({ price, title, image, address, _id }) => {

  return (
    <div className={clsx(styles.root, 'p-3 border border-dark')}>
      <div className={clsx(styles.adSummaryContainer)}>
        <div className={clsx(styles.photoContainer)}>
          <img src={IMGS_URL + image} alt={title} />
        </div>
        <h3 className={clsx('py-2', styles.title)}>{title}</h3>
        <div className={clsx('d-flex justify-content-between', styles.additionalInfo)}>
          <p className={clsx('')}>{address}</p>
          <p>$ {price}</p>
        </div>
        <NavLink to={"/ad/" + _id}>
          <Button className='w-100' variant="dark">
            Read more
          </Button>
        </NavLink>
      </div>
    </div>
  )
}

export default AdSummary;