export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center space-x-8 py-4 bg-gray-100 shadow-lg rounded-xl">
      <button
        onClick={() => onTabChange('addApis')}
        className={`py-2 px-6 text-sm font-medium rounded-lg transition-all duration-300 ${
          activeTab === 'addApis'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        Add APIs
      </button>
      <button
        onClick={() => onTabChange('createNewsletter')}
        className={`py-2 px-6 text-sm font-medium rounded-lg transition-all duration-300 ${
          activeTab === 'createNewsletter'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        Create Newsletter
      </button>
      <button
        onClick={() => onTabChange('seeUsers')}
        className={`py-2 px-6 text-sm font-medium rounded-lg transition-all duration-300 ${
          activeTab === 'seeUsers'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        See Users
      </button>
    </div>
  );
}
