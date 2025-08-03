export default function Footer() {
    return (
        <footer className=" primary-button py-16 border-t border-gray-200 text-center" style={{borderRadius: '0'}}>
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">RESUMIND</h2>

                <p className="text-gray-600 max-w-xl mx-auto mb-6 text-base">
                    Smart Feedback for Your Dream Job. AI-powered resume insights & application tracking.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm font-medium text-indigo-600">
                    <a href="#about" className="hover:text-indigo-800 transition">About</a>
                    <a href="#features" className="hover:text-indigo-800 transition">Features</a>
                    <a href="#contact" className="hover:text-indigo-800 transition">Contact</a>
                    <a href="#privacy" className="hover:text-indigo-800 transition">Privacy Policy</a>
                </div>

                <p className="text-white text-sm">
                    &copy; {new Date().getFullYear()} Resumind. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
