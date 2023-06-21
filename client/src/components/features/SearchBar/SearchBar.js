import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();


  const handleSubmit = () => {
    navigate(`/search/${search}`)
  }
  return (
    <Form className='col-lg-auto col-md-5 col-12 my-auto' onSubmit={handleSubmit}>
      <Form.Group controlId='formSearch' className='input-group'>
        <Form.Control type='text' className='shadow-none' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
        <Button variant='dark' type='submit'>
          Search
        </Button>
      </Form.Group>
    </Form>
  )
}

export default SearchBar;