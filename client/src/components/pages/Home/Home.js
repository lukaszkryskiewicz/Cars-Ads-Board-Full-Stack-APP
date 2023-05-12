import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";


const Home = () => {
  const ads = useSelector(getAllAds);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search/${search}`)
  }
  return (<>
    <Row className='justify-content-between align-items-center'>
      <h1 className='col-sm-3'>Ads Board</h1>
      <Form className='col-sm-3 my-auto' onSubmit={handleSubmit}>
        <Form.Group controlId='formSearch' className='input-group'>
          <Form.Control type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Form.Group>
      </Form>
    </Row>
    <AdsGrid ads={ads} />
  </>
  )
}

export default Home;