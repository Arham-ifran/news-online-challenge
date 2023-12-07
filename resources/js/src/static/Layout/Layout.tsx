import React from "react";

// ___________ Helper ___________ //
import { Outlet } from "react-router-dom";

// ___________ Components ___________ //
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";

const Layout = () => {
	return (
		<React.Fragment>
			<Header />
			<Outlet/>
			<Footer />
		</React.Fragment>
	);
};

export default Layout;
