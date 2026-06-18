import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FooterLogo from "../../../Image/Footer/logo.png";
import "./Footer.css";

const footerSections = [
  {
    id: 1,
    title: "Shop",
    links: [
      {
        id: 1,
        label: "All Products",
        path: "/products",
      },
      {
        id: 2,
        label: "Cart",
        path: "/cart",
      },
      {
        id: 3,
        label: "My Orders",
        path: "/orders",
      },
    ],
  },
  {
    id: 2,
    title: "Company",
    links: [
      {
        id: 1,
        label: "About Us",
        path: "/about_us",
      },
      {
        id: 2,
        label: "Contact Us",
        path: "/contact",
      },
    ],
  },
  {
    id: 3,
    title: "Policies",
    links: [
      {
        id: 1,
        label: "Privacy Policy",
        path: "/policy/privacy",
      },
      {
        id: 2,
        label: "Return Policy",
        path: "/policy/return",
      },
      {
        id: 3,
        label: "Terms & Conditions",
        path: "/terms/conditions",
      },
      {
        id: 4,
        label: "Terms of Use",
        path: "/policy/Terms",
      },
    ],
  },
];

const footerSocialLinks = [
  {
    id: 1,
    label: "Instagram",
    icon: <InstagramIcon />,
    path: "https://www.instagram.com/cricket_wear_store",
  },
  {
    id: 2,
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    path: "https://www.linkedin.com/",
  },
  {
    id: 3,
    label: "GitHub",
    icon: <GitHubIcon />,
    path: "https://github.com/CodeByMan",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer_main">
        <div className="footer_container">
          <div className="footer_grid">
            <div className="footer_brand">
              <Link
                to="/"
                className="footer_logo_link"
                aria-label="Go to Cricket Wear home page"
              >
                <img
                  src={FooterLogo}
                  alt="Cricket Wear logo"
                  className="footer_logo"
                />
                <span className="footer_brand_name">Cricket Wear</span>
              </Link>

              <p className="footer_brand_description">
                A modern cricket gear store for bats, kits, protective
                equipment, sportswear, and accessories.
              </p>

              <div className="footer_social" aria-label="Social media links">
                {footerSocialLinks.map(({ id, label, icon, path }) => (
                  <a
                    key={id}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer_social_link"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer_links_area">
              {footerSections.map(({ id, title, links }) => (
                <nav
                  key={id}
                  className="footer_menu"
                  aria-label={`${title} footer links`}
                >
                  <h4>{title}</h4>

                  <ul>
                    {links.map(({ id, label, path }) => (
                      <li key={id}>
                        <Link to={path}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer_bottom">
        <div className="footer_container footer_bottom_container">
          <div className="footer_policy_links">
            <Link to="/policy/privacy">Privacy Policy</Link>
            <Link to="/terms/conditions">Terms & Conditions</Link>
            <Link to="/policy/Terms">Terms of Use</Link>
          </div>

          <p className="footer_copyright">
            &copy; {currentYear} Cricket Wear. All Rights Reserved. Built by{" "}
            <a
              href="https://github.com/CodeByMan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Muhammad Ali Nawaz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;