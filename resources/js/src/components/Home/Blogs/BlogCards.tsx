import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BannerNews5 from '../../../../assets/images/news-5.jpg'

// Define the interface for the BlogCardProps
interface BlogCardProps {
  article: {
    id: number;
    image: string;
    category: {
      name: string;
    };
    published_at: string;
    title: string;
    source: string;
    description: string;
    author: string;
  }[];
}

// Define the BlogCards functional component
const BlogCards: React.FC<BlogCardProps> = ({ article }) => {

  // Define the number of articles to display per page
  const articlesPerPage = 10;

  // State to manage the number of displayed articles
  const [displayedArticles, setDisplayedArticles] = useState(articlesPerPage);

  // Function to handle "Load More" button click
  const handleLoadMore = () => {
    setDisplayedArticles(prev => prev + articlesPerPage);
  };

  return (
    <div className='container'>
      <div className="row">
        {article?.length > 0 ? (
          article?.slice(0, displayedArticles)?.map((articleItem, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <Link to={`/article/${btoa(String(articleItem?.id))}`}>
                  <div className="blog-cards position-relative mb-3">
                    <div className="blog-img">
                          <img
                            className="img-fluid w-100"
                            src={articleItem?.image ? articleItem?.image : BannerNews5}
                            alt=""
                            style={{ objectFit: 'cover' }}
                          />
                    </div>
                    <div className="bg-white border border-top-0 p-4">
                      <div className="mb-2">
                        <div
                          className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                        >
                          {articleItem?.category?.name}
                        </div>
                        <div className="text-body">
                          <small>{articleItem?.published_at}</small>
                        </div>
                      </div>
                      <div
                        className="h4 news-heading d-block mb-3 text-secondary text-uppercase font-weight-bold"
                      >
                        {articleItem?.title}
                      </div>
                      <p className="m-0 news-description">{articleItem?.description?.slice(0, 100) + "..."}</p>
                    </div>
                    <div className="d-flex justify-content-between bg-white border border-top-0 blog-footer">
                      <div className="d-flex align-items-center">
                        <small>{articleItem?.author?.slice(0, 30)}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <small className="ml-3"><i className="far fa-eye mr-2"></i>{articleItem?.source}</small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : "No Data Availible"}
        {article?.length > displayedArticles && (
          <div className="load_more_btn">
            <button type="button" onClick={handleLoadMore}>
              Load More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCards;