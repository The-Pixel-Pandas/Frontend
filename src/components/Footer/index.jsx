import React from "react";
import PropTypes from "prop-types";
import facebook from "../../assets/images/facebook.png";
import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import linkedin from "../../assets/images/linkedin.png";
import lineStyles from "../../assets/images/lineStyles.png";

const Footer = ({ isPageFooter = true }) => {
	return (
		<>
			<div className="z-50">
				<div className="flex flex-col gap-1.5 justify-center items-center z-2">
					<div className="mt-40 absolute">
						{/* Footer text */}
						<div className="text-white font-Lalezar text-2xl">
							در شبکه های اجتماعی ما را دنبال کنید
						</div>
						{/* Communication links and logo */}
						<div className="flex flex-row  justify-center items-center gap-5 mt-8">
							<a
								href="https://www.facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: "inline-block",
									transition: "transform 0.3s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.transform = "scale(1.1)")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.transform = "scale(1)")
								}
							>
								<img
									src={facebook}
									alt="facebook"
									style={{ width: 50, height: 50 }}
								/>
							</a>
							<a
								href="https://www.twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: "inline-block",
									transition: "transform 0.3s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.transform = "scale(1.1)")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.transform = "scale(1)")
								}
							>
								<img
									src={twitter}
									alt="twitter"
									style={{ width: 50, height: 50 }}
								/>
							</a>
							<a
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: "inline-block",
									transition: "transform 0.3s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.transform = "scale(1.1)")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.transform = "scale(1)")
								}
							>
								<img
									src={instagram}
									alt="instagram"
									style={{ width: 50, height: 50 }}
								/>
							</a>
							<a
								href="https://www.linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: "inline-block",
									transition: "transform 0.3s ease",
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.transform = "scale(1.1)")
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.transform = "scale(1)")
								}
							>
								<img
									src={linkedin}
									alt="linkedin"
									style={{ width: 50, height: 50 }}
								/>
							</a>
						</div>
					</div>
				</div>
				{/* Line style background */}
				{isPageFooter && (
					<div className="z-0">
						<img src={lineStyles} alt="bg footer" className="w-full" />
					</div>
				)}
			</div>
		</>
	);
};

Footer.propTypes = {
	isPageFooter: PropTypes.bool,
};

export default Footer;
