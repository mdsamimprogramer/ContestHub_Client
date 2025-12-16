import { FaEnvelope, FaQuestionCircle, FaCog } from "react-icons/fa";

const SupportSettings = () => {
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Support & Settings</h2>

            {/* Support Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <FaQuestionCircle className="text-primary" size={22} />
                    <h3 className="text-xl font-semibold">Support</h3>
                </div>

                <p className="text-gray-600 mb-3">
                    Need help? Contact our support team anytime.
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <FaEnvelope />
                    <span>support@contesthub.com</span>
                </div>
            </div>

            {/* Settings Section */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                    <FaCog className="text-primary" size={22} />
                    <h3 className="text-xl font-semibold">Settings</h3>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Email Notifications</span>
                        <input type="checkbox" className="toggle toggle-primary" />
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Dark Mode</span>
                        <input type="checkbox" className="toggle toggle-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportSettings;
