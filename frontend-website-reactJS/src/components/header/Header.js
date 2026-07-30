import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ searchTerm, setSearchTerm }) => {

    const navigate = useNavigate();

    return (

        <Navbar bg="dark" variant="dark" expand="lg">

            <Container fluid>

                <Navbar.Brand
                    href="/"
                    style={{
                        color: "gold",
                        fontWeight: "bold",
                        fontSize: "24px",
                        width: "180px"
                    }}
                >
                    <FontAwesomeIcon icon={faVideoSlash} /> X-FLIX
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">

                    <Nav
                        style={{
                            width: "420px"
                        }}
                    >

                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>

                        <NavLink className="nav-link" to="/watchList">
                            Watch List
                        </NavLink>

                        <NavLink className="nav-link" to="/reports">
                            Reports
                        </NavLink>

                        <NavLink className="nav-link" to="/trending">
                            Trending
                        </NavLink>

                    </Nav>

                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >

                        <Form style={{ width: "420px" }}>

                            <Form.Control
                                type="search"
                                placeholder="🔍 Search Movies..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                        </Form>

                    </div>

                    <Button
                        variant="outline-warning"
                        onClick={() => navigate("/dashboard")}
                    >
                        👤 Dashboard
                    </Button>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

};

export default Header;