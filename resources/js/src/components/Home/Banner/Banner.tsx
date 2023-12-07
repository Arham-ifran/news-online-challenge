import React, { useState, useEffect } from 'react'
import BannerNews6 from '../../../../assets/images/news-10.jpg'
import { Link } from 'react-router-dom'
import { getHttpRequest } from '../../../axios'
import { toast } from 'react-toastify'


// Define the Banner functional component
const Banner: React.FC = () => {
  // State to store articles fetched from the API
  const [articles, setArticles] = useState<any[]>([])

  // Function to fetch articles from the API
  const fetchArticle = async () => {
    try {
      const response = await getHttpRequest(`/api/article-limit-five`);
      const data = await response.data.data;
      setArticles(data);
    }
    catch (error:any) {
      toast.error(error)
    }
  }
  // useEffect hook to fetch articles when the component mounts
  useEffect(() => {
    fetchArticle();
  }, [])
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 px-0">
            <Link to={`/article/${btoa(String(articles[0]?.id))}`}>
              <div className="position-relative overflow-hidden" style={{ height: '500px' }}>
                  <img
                    className="img-fluid h-100 w-100"
                    src={articles[0]?.image ? articles[0]?.image : BannerNews6}
                    style={{ objectFit: 'cover' }}
                    alt="Article Image"
                  />
                <div className="overlay">
                  <div className="mb-2">
                    <Link className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      to="#">{articles[0]?.category?.name}</Link>
                    <Link className="text-white" to="#">{articles[0]?.published_at}</Link>
                  </div>
                  <Link className="h2 m-0 text-white text-uppercase font-weight-bold" to="#">{articles[0]?.title.slice(0, 25) + "..."}</Link>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-5 px-0">
            <div className="row mx-0">
              {
                articles.map((item, index) => {
                  if (index > 0) {
                    return (
                      <div className="col-md-6 px-0" key={index}>
                        <Link to={`/article/${btoa(String(item?.id))}`}>
                          <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                              <img
                                className="img-fluid h-100 w-100"
                                src={item?.image ? item?.image : BannerNews6}
                                style={{ objectFit: 'cover' }}
                                alt="Article Image"
                              />
                            <div className="overlay">
                              <div className="mb-2">
                                <Link className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2" to="#">
                                  {item?.category?.name}
                                </Link>
                                <Link className="text-white" to="#">
                                  <small>{item?.published_at}</small>
                                </Link>
                              </div>
                              <Link className="h6 m-0 text-white text-uppercase font-weight-semi-bold" to="#">
                                {item.title.slice(0, 35) + '...'}
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                  return null; // Skip rendering for index 0
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
