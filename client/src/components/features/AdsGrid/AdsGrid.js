import clsx from "clsx";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdSummary from '../AdSummary/AdSummary'
import styles from './AdsGrid.module.scss'

const AdsGrid = ({ ads }) => {
  const [activePage, setActivePage] = useState(1);
  const productsOnPage = 6

  const pagesCount = Math.ceil(ads.length / productsOnPage)
  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <li key={number} className={clsx('page-item', styles.pageItem)} onClick={() => setActivePage(number)}>
        <button className={clsx('page-link', styles.pageLink, activePage === number && styles.active)}>{number}</button>
      </li>
    );
  }
  if (ads.length === 0) return 'There are no ads'

  return (
    <Container>
      <Row>
        {ads.slice(
          (activePage - 1) * productsOnPage,
          activePage * productsOnPage)
          .map(ad =>
            <Col key={ad._id} xl={4} md={6} xs={12} className={'my-3'}>
              <AdSummary {...ad} />
            </Col>
          )}
        <nav aria-label="page-navigation">
          <ul className={clsx('pagination', styles.pagination)}>
            {items}
          </ul>
        </nav>
      </Row >
    </Container >
  )
}

export default AdsGrid;