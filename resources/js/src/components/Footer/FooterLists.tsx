import React from 'react'
import { Link } from 'react-router-dom'

const FooterLists = () => {
    return (
        <div className="container bg-dark mt-5">
            <div className="row py-4">
                <div className="col-lg-4 col-md-6 mb-5">
                    <h5 className="mb-4 text-white text-uppercase font-weight-bold">Get In Touch</h5>
                    <p className="font-weight-medium"><i className="fa fa-map-marker-alt mr-2"></i>123 Street, New York, USA</p>
                    <p className="font-weight-medium"><i className="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                    <p className="font-weight-medium"><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                    <h6 className="mt-4 mb-3 text-white text-uppercase font-weight-bold">Follow Us</h6>
                    <div className="d-flex justify-content-start">
                        <Link to="/" className="btn btn-lg btn-secondary btn-lg-square mr-2" ><i className="fab fa-twitter"></i></Link>
                        <Link to="/" className="btn btn-lg btn-secondary btn-lg-square mr-2" ><i
                            className="fab fa-facebook-f"></i></Link>
                        <Link to="/" className="btn btn-lg btn-secondary btn-lg-square mr-2" ><i
                            className="fab fa-linkedin-in"></i></Link>
                        <Link to="/" className="btn btn-lg btn-secondary btn-lg-square mr-2" ><i
                            className="fab fa-instagram"></i></Link>
                        <Link to="/" className="btn btn-lg btn-secondary btn-lg-square" ><i className="fab fa-youtube"></i></Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-5">
                    <h5 className="mb-4 text-white text-uppercase font-weight-bold">Popular News</h5>
                    <div className="mb-3">
                        <div className="mb-2">
                            <Link to="/" className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            >Business</Link>
                            <Link to="/" className="text-body"><small>Jan 01, 2045</small></Link>
                        </div>
                        <Link to="/" className="small text-body text-uppercase font-weight-medium">Lorem ipsum dolor sit amet
                            elit. Proin vitae porta diam...</Link>
                    </div>
                    <div className="mb-3">
                        <div className="mb-2">
                            <Link to="/" className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            >Business</Link>
                            <Link to="/" className="text-body"><small>Jan 01, 2045</small></Link>
                        </div>
                        <Link to="/" className="small text-body text-uppercase font-weight-medium">Lorem ipsum dolor sit amet
                            elit. Proin vitae porta diam...</Link>
                    </div>
                    <div className="">
                        <div className="mb-2">
                            <Link to="/" className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                            >Business</Link>
                            <Link to="/" className="text-body"><small>Jan 01, 2045</small></Link>
                        </div>
                        <Link to="/" className="small text-body text-uppercase font-weight-medium">Lorem ipsum dolor sit amet
                            elit. Proin vitae porta diam...</Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-5">
                    <h5 className="mb-4 text-white text-uppercase font-weight-bold">Categories</h5>
                    <div className="m-n1">
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Politics</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Corporate</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Health</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Education</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Science</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Foods</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Entertainment</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Travel</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Lifestyle</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Politics</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Corporate</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Health</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Education</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Science</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Business</Link>
                        <Link to="/" className="btn btn-sm btn-secondary m-1">Foods</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterLists
