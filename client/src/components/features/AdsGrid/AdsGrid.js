import clsx from "clsx";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getRequestStatus } from "../../../redux/adsRedux";
import AdSummary from '../AdSummary/AdSummary'
import styles from './AdsGrid.module.scss'

const AdsGrid = ({ ads }) => {
  const status = useSelector(getRequestStatus);
  const [activePage, setActivePage] = useState(1);
  const [requestStatus, setRequestStatus] = useState(null)
  const productsOnPage = 6

  useEffect(() => {
    if (status) {
      if (status?.pending === true) {
        setRequestStatus('pending')
      } else if (status.error !== null) {
        setRequestStatus('error')
      } else if (status.success === true) {
        setRequestStatus('success')
      }
    }
  }, [status])

  const pagesCount = Math.ceil(ads.length / productsOnPage)
  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <li key={number} className={clsx('page-item', styles.pageItem)} onClick={() => setActivePage(number)}>
        <button className={clsx('page-link', styles.pageLink, activePage === number && styles.active)}>{number}</button>
      </li>
    );
  }

  return (
    <Container>
      <Row>
        {(requestStatus === 'null' || requestStatus === 'pending') &&
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}
        {(requestStatus === 'success' && ads.length > 0) &&
          ads.slice(
            (activePage - 1) * productsOnPage,
            activePage * productsOnPage)
            .map(ad =>
              <Col key={ad._id} xl={4} md={6} xs={12} className={'my-3'}>
                <AdSummary {...ad} />
              </Col>
            )}
        {(requestStatus === 'success' && pagesCount > 1) &&
          <nav aria-label="page-navigation">
            <ul className={clsx('pagination', styles.pagination)}>
              {items}
            </ul>
          </nav>
        }
        {(requestStatus === 'success' && ads.length === 0) &&
          <h2>There are no ads</h2>}
        {(requestStatus === 'error') &&
          <h2>There is a server issue, please try again</h2>}
      </Row >
    </Container >
  )
}

export default AdsGrid;