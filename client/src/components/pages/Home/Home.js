import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { Row, Form, Button, Pagination } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";


const Home = () => {
  const ads = useSelector(getAllAds);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);

  const pagesCount = Math.ceil(ads.length / 6)
  let items = [];
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

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
    <Pagination className='justify-content-center'>{items}</Pagination>
  </>
  )
}

export default Home;