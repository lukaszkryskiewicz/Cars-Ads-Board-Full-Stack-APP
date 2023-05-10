import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdSummary from '../AdSummary/AdSummary'
import { getAllAds } from "../../../redux/adsRedux";

const AdsGrid = () => {
  const ads = useSelector(getAllAds);

  if (ads.length === 0) return 'There are no ads'

  return (
    <Container>
      <h1>Ads Board</h1>
      <Row>
        {ads.map(ad =>
          <Col key={ad.title} md={4}>
            <AdSummary {...ad} />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default AdsGrid;