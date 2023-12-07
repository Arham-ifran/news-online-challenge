import  { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { getHttpRequest } from "../../axios";
import { toast } from "react-toastify";


interface Article {
  id: number;
  title: string;
  image: string;
  description: string;
  author: string;
  source: string;
  category: {
    name: string;
  };
  content:string;
}

interface ArticleDetailPageProps {}

function ArticleDetailPage(props: ArticleDetailPageProps): JSX.Element {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams<{ id: string }>();
  
  useLayoutEffect(() => {
    // Scroll to the top of the page with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id])

  const fetchData = async () => {
    try {
      const response = await getHttpRequest(`/api/article/${id}`);

      if (response.data?.success) {
        setArticle(response.data?.data);
      }
    } catch (error:any) {
      toast.error('Error fetching article:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='detail-page-main'>
        <div className='detail-page-inner'>
          <h2>{article?.title}</h2>
          <div className='detail-img'>
            <img src={article?.image} alt={article?.title} />
          </div>
          <h3>Description</h3>
          <p className='description'>{article?.description}</p>
          <div className='filters'>
          <h4>Content</h4>
            <div className="content_detail">
             {article?.content}
            </div>
            <div className="auther__wrapers">
          <p>
              <span className="author_name">Author:</span>
              <span className='authorname'>{article?.author}</span>
            </p>
            <p>
            <span className="author_name">Source:</span>
              <span className='source'>{article?.source}</span>
            </p>
            <p>
            <span className="author_name">Category:</span>
              <span className='category'>{article?.category?.name}</span>
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleDetailPage;