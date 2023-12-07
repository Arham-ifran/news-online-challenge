import axios from 'axios';
import React, { useState, useEffect, ChangeEvent } from 'react'
import searchImg from '../../../../assets/images/search.png';
import { postHttpRequest, getHttpRequest } from '../../../axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';


interface BlogCardProps {
  setFilterArticles: any;
}

/**
* Category Dropdown Component.
*
* All rights Reseverd | Arhamsoft Pvt @2023
*
* @returns {JSX.Element} - JSX representation of the component.
*/

const CategoryDropdown: React.FC<BlogCardProps> = ({ setFilterArticles }) => {

  const [category, setCategory] = useState<any[]>([]);
  const [source, setSource] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [filterBlogs, setFilterBlogs] = useState<any[]>([]);
  const [searchBlogs, setSearchBlogs] = useState<string>('');
  const [startDate, setStartDate] = useState<any>(new Date());

  // Handler for search input change
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchBlogs(event.target.value);
  }
  const search = {
    search: searchBlogs
  }

  // Handler for search form submit
  const handleSearchSubmit = async (event: ChangeEvent<any>) => {
    event.preventDefault();
    try {
      const response = await postHttpRequest("/api/filter", search);
      if (response.data?.success) {
        setFilterBlogs(response?.data?.data);
      }
    } catch (error:any) {
      toast.error('Error fetching articles:', error);
    }

  }
  
 

  // Handler for category dropdown change
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Handler for source dropdown change
  const handleSourceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSource(event.target.value);
  };

  // Function to fetch categories
  const fetchCategory = async () => {
    try {
      const response = await getHttpRequest("/api/category");
      if (response.data?.success) {
        setCategory(response?.data?.data);
      }
    } catch (error:any) {
      toast.error('Error fetching articles:', error);
    }
  };

  // Function to fetch sources
  const fetchSource = async () => {
    try {
      const response = await getHttpRequest("/api/source");
      if (response.data?.success) {
        setSource(response?.data?.data);
      }
    } catch (error:any) {
      toast.error('Error fetching sources', error);
    }
  };
  const payload = {
    category_id: parseInt(selectedCategory, 10),
    source: selectedSource,
    start_date: startDate?.toLocaleDateString('en-GB').split('/').reverse().join('-') || ''

  }

  // Function to fetch filtered blogs
  const fetchBlogs = async () => {
    try {
      const response = await postHttpRequest("/api/filter", payload);
      if (response.data?.success) {
        setFilterBlogs(response?.data?.data);
      }
    } catch (error:any) {
      toast.error('Error fetching blogs', error);
    }
  };

// useEffect hook to fetch categories, sources, and filtered blogs
setFilterArticles(filterBlogs)
useEffect(() => {
  fetchCategory();
  fetchSource();
  fetchBlogs();
}, [selectedCategory, selectedSource,startDate]);

  return (
    <div className="row dropdowns-categories">
      <div className="col-lg-3">
        <select className="form__field" id="dropdownMenuButton1" value={selectedCategory}
          onChange={handleCategoryChange}>
          <option value="Categories" hidden>Categories</option>
          {category.map(item => (
            <option key={item.name} value={item.id} className="dropdown-item">{item.name}</option>
          ))}
        </select>
      </div>
      <div className="col-lg-3">
        <select className="form__field" id="dropdownMenuButton1" value={selectedSource}
          onChange={handleSourceChange}>
          <option value="Source" hidden>Source</option>
          {source.map(item => (
            <option key={item} selected={item.name} className="dropdown-item">{item}</option>
          ))}
        </select>
      </div>
      <div className="col-lg-2">
      <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)} />
      </div>
      <div className="col-lg-4">
        <form className="d-flex items-center" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="form-control"
            onChange={handleSearchChange}
            placeholder="Keyword"
          />
          <div className="input-group-append">
            <button
              className="input-group-text bg-primary text-dark border-0 px-3"
              type="submit"
            >
              <img src={searchImg} alt="Search" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryDropdown
