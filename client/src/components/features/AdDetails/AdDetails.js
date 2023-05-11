import clsx from 'clsx';
import styles from './AdDetails.module.scss';
import { IMGS_URL } from '../../../config';

const AdDetails = ({ ad }) => {

  return (
    <div className={styles.root}>
      <div className={clsx('container', styles.adDetails)}>
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
                  <h1>{ad.title}</h1>
                </div>
                <div className={clsx(styles.publishedDate)}>
                  <div>
                    <p className={clsx(styles.date)}>Published : {ad.date}</p>
                  </div>
                </div>
                <div className={clsx(styles.addressInfo)}>
                  <div>
                    <p className={clsx(styles.address)}>Address: {ad.address}</p>
                  </div>
                </div>
                <div className={clsx(styles.priceInfo)}>
                  <div>
                    <p className={clsx(styles.price)}>Price: {ad.price}$</p>
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
                  <div className={clsx(styles.login)}>
                    Name: {ad.seller.login}
                  </div>
                  <div className={clsx(styles.phone)}>
                    Phone: {ad.seller.phone}
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
