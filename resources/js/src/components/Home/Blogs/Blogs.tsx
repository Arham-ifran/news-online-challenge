import React, { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import BlogCards from './BlogCards';
import Loader from '../../Loader/Loader';
import { getHttpRequest } from '../../../axios';
import { toast } from 'react-toastify';


// Define the functional component Blogs
const Blogs: React.FC = () => {
  // Retrieve access token from local storage and clean it
  const accessToken = localStorage.getItem('accessToken');
  const cleanedAccessToken = accessToken?.replace(/^"|"$/g, '');

  // State to store the fetched articles
  const [article, setArticle] = useState<any[]>([]);
  const [filterArticles, setFilterArticles] = useState<any[]>([])
  const [loader, setLoader] = useState(false);

  // Function to fetch articles based on access token
  const fetchArticle = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cleanedAccessToken}`,
      },
    }
    try {
      if (cleanedAccessToken) {
        try {
          const response = await getHttpRequest("/api/users/personalized-news-feed", config);
          if (response.data?.success) {
            setLoader(false);
            setArticle(response?.data?.data);
          }
        }
        catch (error:any) {
          setLoader(false)
          toast.error(error)
        }
      }
      else {
        try {
          const response = await getHttpRequest("/api/article");
          if (response.data?.success) {
            setLoader(false);
            setArticle(response?.data?.data);
          }
        }
        catch (error:any) {
          toast.error(error)
        }

      }
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchArticle();
  }, []);

  useEffect(() => {
    if (filterArticles?.length > 0) {
      setArticle(filterArticles);
    } else {
      setArticle([]);
    }
  }, [filterArticles]);

  return (
    <div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <CategoryDropdown setFilterArticles={setFilterArticles} />
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h4 className="m-0 text-uppercase font-weight-bold">Latest News</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader ? <Loader /> : <BlogCards article={article} />}
    </div>
  );
};

export default Blogs;