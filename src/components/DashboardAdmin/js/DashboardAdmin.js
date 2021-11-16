import React, { useState, useEffect } from "react";
import Header from "../../Header/js/Header";
import { Row, Col, Container, Navbar, Nav } from "react-bootstrap";
import "../scss/DashboardAdmin.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import LeftNavigation from "../../LeftNavigation/js/LeftNavigation";
import DashboardComponent from "../../DashboardComponent/js/DashboardComponent";
import ManageComponent from "../../ManageComponent/js/ManageComponent";
import ReportsPermissionAndPreference from "../../Reports/js/Reports-PermissionAndPreference";
import ReportsAudit from "../../Reports/js/Reports-Audit";
function DashboardAdmin(props) {
  let history = useHistory();
  const [brand, setBrand] = useState("Toyota");
  const onClickTab = (childPath) => {
    history.push(childPath);
  };
  useEffect(() => {
    console.log(brand);
  }, [brand]);
  return (
		<div className="dashboardadmin-wrapper">
			<Header DashboardAdmin={true} />
			<Container fluid className="dashboardadmin">
				<div className="dashboardadmin-inner">
					<div className="dashboardadmin-navbar">
						<Navbar>
							<Nav className="me-auto" defaultActiveKey="#Toyota">
								<Nav.Link
									activeclassname="active"
									href="#Toyota"
									onClick={() => setBrand("Toyota")}
								>
									Toyota
								</Nav.Link>

								<Nav.Link href="#Lexus" onClick={() => setBrand("Lexus")}>
									Lexus
								</Nav.Link>
							</Nav>
						</Navbar>
					</div>

					<div className="dashboardadmin-body">
						<Row>
							<Col md={2} className="left-col">
								<LeftNavigation
									path={props.match.path}
									location={window.location.pathname}
									onClickTab={onClickTab}
								/>
							</Col>

							<Col md={10} className="right-col" id="activity">
								<Router>
									<Switch>
										<Route exact path="/dashboard-admin">
											<Redirect to="/dashboard-admin/dashboard#dashboard" />
										</Route>
										<Route
											exact
											path={`${props.match.path}/dashboard`}
											render={() => (
												<DashboardComponent brand={brand} type={"dashboard"} />
											)}
										/>
										<Route
											exact
											path={`${props.match.path}/manage`}
											render={() => (
												<ManageComponent brand={brand} type={"metaDataList"} />
											)}
										/>
										<Route
											exact
											path={`${props.match.path}/report-perm`}
											render={() => (
												<ReportsPermissionAndPreference
													brand={brand}
													type={"dashboard"}
												/>
											)}
										/>
										<Route
											exact
											path={`${props.match.path}/report-audit`}
											render={() => (
												<ReportsAudit
													brand={brand}
													type={"dashboard"}
												/>
											)}
										/>
									</Switch>
								</Router>
							</Col>
						</Row>
					</div>
				</div>
			</Container>
		</div>
	);
}

export default DashboardAdmin;
