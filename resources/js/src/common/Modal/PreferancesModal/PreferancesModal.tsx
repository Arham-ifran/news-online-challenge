import  { useState, useEffect, ChangeEvent } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getHttpRequest,postHttpRequest } from '../../../axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';



/**
* Prefarances Modal Component.
*
* All rights Reseverd | Arhamsoft Pvt @2023
*
* @returns {JSX.Element} - JSX representation of the component.
*/

const PreferancesModal = () => {
    // Get the access token from local storage
    const accessToken: string | null = localStorage.getItem('accessToken');
    const cleanedAccessToken: string = accessToken ? accessToken.replace(/^"|"$/g, '') : '';
  
    // Initialize React hooks
    const navigate=useNavigate();
    const [category, setCategory] = useState<any[]>([]);
    const [source, setSource] = useState<any[]>([]);
    const [author, setAuthor] = useState<any[]>([]);
    const animatedComponents = makeAnimated();
    const [categoryTag, setCategoryTag] = useState<any[]>([]);
    const [sourceTag, setSourceTag] = useState<any[]>([]);
    const [authorTag, setAuthorTag] = useState<any[]>([]);
    const [deafulatSelected, setDeafulatSelected] = useState<any[]>([]);
    const [deafulatSource, setDeafulatSource] = useState<any[]>([]);
    const [deafulatAuthor, setDeafulatAuthor] = useState<any[]>([]);



 // Handle changes for selected category tags
    const handleCategoryTag = (selectedOptions: any) => {
        setDeafulatSelected(selectedOptions)
        setCategoryTag(selectedOptions.map((option: any) => option.value));
    };
      // Handle changes for selected source tags
    const handleSourceTag = (selectedOptions: any) => {
        setDeafulatSource(selectedOptions)
        setSourceTag(selectedOptions.map((option: any) => option.value));
    };
      // Handle changes for selected author tags
    const handleAuthorTag = (selectedOptions: any) => {
        setDeafulatAuthor(selectedOptions)
        setAuthorTag(selectedOptions.map((option: any) => option.value));
    };
// Map category options for the Select component
    const categoryOptions = category.map((item) => ({
        value: item.id,
        label: item.name
    }));
// Map source options for the Select component
    const sourceOptions = source.map((item) => ({
        value: item,
        label: item
    }));
// Map author options for the Select component
    const authorOptions = author.map((item) => ({
        value: item,
        label: item
    }));

    // Fetch category data from the API
    const fetchCategory = async () => {
        try {
            const response = await getHttpRequest(`/api/category`);

            if (response.data?.success) {
                setCategory(response?.data?.data);
            }
        } catch (error:any) {
            toast.error('Error fetching articles:', error);
        }
    };
    // Fetch source data from the API
    const fetchSource = async () => {
        try {
            const response = await getHttpRequest("/api/source");
            if (response.data?.success) {
                setSource(response?.data?.data);
            }
        } catch (error:any) {
            toast.error('Error fetching articles:', error);
        }
    };
     // Fetch author data from the API
    const fetchAuthor = async () => {
        try {
            const response = await getHttpRequest("/api/author");
            if (response.data?.success) {
                setAuthor(response?.data?.data);
            }
        } catch (error:any) {
            toast.error('Error fetching author:', error);
        }
    };
 // API configuration with access token
    const config={
        headers: {
            Authorization: `Bearer ${cleanedAccessToken}`,
        },
    }
     // Fetch user preferences tags from the API
    const fetchTags = async () => {
        try {
            const response = await getHttpRequest("/api/users/preferences", config);
            if (response.data?.success) {
                setDeafulatSelected(response.data?.data?.selectedCategories?.map((item: any) => ({
                    value: item.id,
                    label: item.name
                })))
                setDeafulatSource(response.data?.data?.selectedSources?.map((item: any) => ({
                    value: item,
                    label: item,
                })))
                setDeafulatAuthor(response.data?.data?.selectedAuthors?.map((item: any) => ({
                    value: item,
                    label: item,
                })))
                setCategoryTag(response.data?.data?.selectedCategories.map((option: any) => option.id));
                setSourceTag(response.data?.data?.selectedSources.map((option: any) => option));
                setAuthorTag(response.data?.data?.selectedAuthors.map((option: any) => option));

            }
        } catch (error:any) {
            toast.error('Error fetching author:', error);
        }
    }
     // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchCategory();
        fetchSource()
        fetchAuthor()
        fetchTags();
    }, [])
    const handleSubmit = async (event: ChangeEvent<any>) => {
        event.preventDefault();
        const payload = {
            selected_categories: categoryTag,
            selected_sources: sourceTag,
            selected_authors: authorTag
    
        }
        const response = await postHttpRequest("/api/users/save-preferences", payload,config)
        if(response.data.success){
            toast.success(response.data.message)
            window.location.reload()
            navigate("/")
        }
    }

    return (
        <div className="preferences_wrapper">
            <div className='prefences__btn f-size'>
                <button className="btn" type="button" data-bs-toggle="modal"
                    data-bs-target="#preferencesModal2">Preferences
                </button>
            </div>

            <div className="modal fade" id="preferencesModal2" tabIndex={-1}
                aria-labelledby="prefernceModal2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-white" id="prefernceModal2Label">Preferences
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="preference_custom-modal">
                                    <div className="select_wrapper">
                                        <div className="main">
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                value={deafulatSelected}
                                                isMulti
                                                className='handle_option'
                                                options={categoryOptions}
                                                onChange={(selectedOptions) => {
                                                    handleCategoryTag(selectedOptions);
                                                }}
                                            />
                                        </div>
                                        <div className="main">
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                value={deafulatSource}
                                                isMulti
                                                className='handle_option'
                                                options={sourceOptions}
                                                onChange={(selectedOptions) => {
                                                    handleSourceTag(selectedOptions);
                                                }}
                                            />
                                        </div>
                                        <div className="main">
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                value={deafulatAuthor}
                                                isMulti
                                                className='handle_option'
                                                options={authorOptions}
                                                onChange={(selectedOptions) => {
                                                    handleAuthorTag(selectedOptions);
                                                }}
                                            />
                                        </div>
                                        <div className='prefences__btn text-end'>
                                            <button className='submit_btn' data-bs-dismiss="modal">Submit</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferancesModal
