import clsx from 'clsx';
import styles from './AdDetails.module.scss';
import { IMGS_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AdDetails = ({ ad }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ad/userAds/' + ad.seller.login)
  }

  return (
    <div className={styles.root}>
      <div className={clsx(styles.adDetails)}>
        <div className={clsx('row', styles.mainRow)}>
          <div className={clsx('col-lg-5 col-md-12', styles.photoSection)}>
            <div
              className={clsx(
                'row g-0 align-items-center',
                styles.photo
              )}
            >
              {' '}
              <img src={IMGS_URL + ad.image} alt={ad.title} />
            </div>
          </div>
          <div className={clsx('col-lg-7 col-md-12', styles.infoSection)}>
            <div className={clsx('row', styles.infoContainer)}>
              <div className={clsx('row', styles.infoRow)}>
                <div className={styles.title}>
                  <h1 className='col-md-9'>{ad.title}</h1>
                </div>
                <div className={clsx(styles.publishedDate)}>
                  <div>
                    <p className={clsx(styles.date)}><span className={clsx(styles.item)}>Published: </span>{ad.date}</p>
                  </div>
                </div>
                <div className={clsx(styles.addressInfo)}>
                  <div>
                    <p className={clsx(styles.address)}><span className={clsx(styles.item)}>Address: </span>{ad.address}</p>
                  </div>
                </div>
                <div className={clsx(styles.priceInfo)}>
                  <div>
                    <p className={clsx(styles.price)}><span className={clsx(styles.item)}>Price: $ </span>{ad.price}</p>
                  </div>
                </div>
              </div>
              <div className={clsx('row', styles.contentRow)}>
                <div className={clsx(styles.content)}>
                  {ad.content}
                </div>
              </div>
              <div className={clsx('row', styles.sellerRow)}>
                <div className={clsx(styles.sellerInfo)}>
                  <div>
                    <div className={clsx(styles.avatar)}>
                      <img src={IMGS_URL + ad.seller.avatar} alt={ad.title} />
                    </div>
                  </div>
                  <div className={clsx(styles.contactInfo, 'd-flex flex-sm-row flex-column justify-center')} onClick={handleClick}>
                    <Button variant='dark' className={clsx(styles.login)}>
                      <i className='fa fa-user' /> {ad.seller.login}
                    </Button>
                    <p className={clsx(styles.phone, 'my-auto pt-1 mx-sm-3')}>
                      <i className='fa fa-phone' /> {ad.seller.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default AdDetails;
