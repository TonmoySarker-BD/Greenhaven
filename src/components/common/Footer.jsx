import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <FaLeaf className="text-primary text-3xl mr-2" />
                            <span className="text-2xl font-bold text-primary">Greenhaven</span>
                        </div>
                        <p className="text-sm">
                            Cultivating a community of passionate gardeners since 2025. Grow with us!
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com/TonmoySarkerBD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base-content/70 hover:text-primary transition-colors"
                            >
                                <FaFacebook className="text-xl" />
                            </a>
                            <a
                                href="https://twitter.com/TonmoySarkerBD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base-content/70 hover:text-primary transition-colors"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                            <a
                                href="https://instagram.com/TonmoySarkerBD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base-content/70 hover:text-primary transition-colors"
                            >
                                <FaInstagram className="text-xl" />
                            </a>
                            <a
                                href="https://github.com/TonmoySarker-BD"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base-content/70 hover:text-primary transition-colors"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/explore" className="hover:text-primary transition-colors">Explore Gardeners</a></li>
                            <li><a href="/tips" className="hover:text-primary transition-colors">Browse Tips</a></li>
                            <li><a href="/events" className="hover:text-primary transition-colors">Events</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaEnvelope className="text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>hello@greenhaven.com</span>
                            </li>
                            <li className="flex items-start">
                                <FaPhone className="text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>(+880) 123456789</span>
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                                <span>Bonani, Bogura, Bangladesh - 5800</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-base-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm">
                        © {new Date().getFullYear()} Greenhaven. All rights reserved.
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="/" className="text-sm hover:text-primary transition-colors">Terms of Service</a>
                        <a href="/" className="text-sm hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="/" className="text-sm hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;