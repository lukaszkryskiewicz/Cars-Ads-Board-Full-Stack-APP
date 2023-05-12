import { Col, Container, Row } from "react-bootstrap";
import AdSummary from '../AdSummary/AdSummary'

const AdsGrid = ({ ads }) => {
  if (ads.length === 0) return 'There are no ads'

  return (
    <Container>
      <Row>
        {ads.map(ad =>
          <Col key={ad._id} md={4} className={'my-3'}>
            <AdSummary {...ad} />
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default AdsGrid;