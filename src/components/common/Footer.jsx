import {
    FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt,
    FaFacebook, FaTwitter, FaInstagram, FaGithub
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-16 border-t border-base-300 text-center">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">

                    {/* Brand Info */}
                    <div className="space-y-4 flex flex-col items-center">
                        <div className="flex items-center justify-center">
                            <FaLeaf className="text-primary text-3xl mr-2" />
                            <span className="text-2xl font-bold text-primary">Greenhaven</span>
                        </div>
                        <p className="text-sm max-w-md">
                            Cultivating a community of passionate gardeners since 2025. Grow with us!
                        </p>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://facebook.com/TonmoySarkerBD" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="https://twitter.com/TonmoySarkerBD" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="https://instagram.com/TonmoySarkerBD" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="https://github.com/TonmoySarker-BD" target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors">
                                <FaGithub className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center space-y-2">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <a href="/" className="hover:text-primary transition-colors">Home</a>
                        <a href="/explore" className="hover:text-primary transition-colors">Explore Gardeners</a>
                        <a href="/tips" className="hover:text-primary transition-colors">Browse Tips</a>
                        <a href="/events" className="hover:text-primary transition-colors">Events</a>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center space-y-3">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="flex flex-col md:flex-row md:gap-2 items-center">
                            <FaEnvelope className="text-primary mb-1" />
                            <span>hello@greenhaven.com</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-2 items-center">
                            <FaPhone className="text-primary mb-1" />
                            <span>(+880) 123456789</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-2 items-center">
                            <FaMapMarkerAlt className="text-primary mb-1" />
                            <span>Bonani, Bogura, Bangladesh - 5800</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-base-300 mt-12 pt-8 flex flex-col md:flex-row self-center justify-between items-center space-y-4">
                    <div className="text-sm md:pt-6">
                        © {new Date().getFullYear()} Greenhaven. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
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