import React, { useLayoutEffect } from 'react'
// ___________ Components ___________ //
import Banner from '../../components/Home/Banner/Banner'
import Blogs from '../../components/Home/Blogs/Blogs'
const Home = () => {

  useLayoutEffect(() => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [])

  return (
    <React.Fragment>
      <Banner />
      <Blogs />
    </React.Fragment>
  )
}

export default Home
