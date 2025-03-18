import { useState, useEffect } from 'react';

export default function AddApis() {
  const [credentials, setCredentials] = useState({
    Spotify: { clientId: '', clientSecret: '' },
    YouTube: { YouTubeAPI: '' },  // Updated YouTube credentials structure
    SoundCloud: { clientId: '', clientSecret: '' },
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchCredentials();
    }
  }, [isLoading]);

  const fetchCredentials = async () => {
    try {
      // console.log('Fetching credentials...');
      const res = await fetch('/admin/api/credentials');
      const data = await res.json();
      setCredentials({
        Spotify: {
          clientId: data?.Spotify?.clientId || '',
          clientSecret: data?.Spotify?.clientSecret || '',
        },
        YouTube: {
          YouTubeAPI: data?.YouTube?.YouTubeAPI || '',
        },
        SoundCloud: {
          clientId: data?.SoundCloud?.clientId || '',
          clientSecret: data?.SoundCloud?.clientSecret || '',
        },
      });
      setIsDirty(false);
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to fetch credentials:', error);
    }
  };

  const handleChange = (type, field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
    setIsDirty(true);
    setIsSaved(false);
  };

  const saveCredentials = async () => {
    if (Object.values(credentials).some(({ clientId, clientSecret, YouTubeAPI }) => !clientId && !clientSecret && !YouTubeAPI)) {
      alert('All fields must be filled!');
      return;
    }
  
    try {
      await fetch('/admin/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      setIsDirty(false);
      setIsSaved(true);
    } catch (error) {
      console.error('Failed to save credentials:', error);
    }
  };
  
  const isFormValid = Object.values(credentials).every(
    ({ clientId, clientSecret, YouTubeAPI }) => clientId && clientSecret || YouTubeAPI
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add API</h1>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-48">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {['Spotify', 'YouTube'].map((type) => (
            <div key={type} className="mb-6">
              <h2 className="text-xl font-medium text-gray-700 mt-8 mb-4 text-center">{type} Credentials</h2>

              {type === 'YouTube' ? (
                <div className="mb-4">
                  <label
                    htmlFor={`${type}-YouTubeAPI`}
                    className="block text-gray-600 font-medium"
                  >
                    YouTube API
                  </label>
                  <input
                    type="text"
                    id={`${type}-YouTubeAPI`}
                    name="YouTubeAPI"
                    value={credentials[type].YouTubeAPI}
                    onChange={(e) => handleChange(type, 'YouTubeAPI', e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor={`${type}-clientId`}
                      className="block text-gray-600 font-medium"
                    >
                      Client ID
                    </label>
                    <input
                      type="text"
                      id={`${type}-clientId`}
                      name="clientId"
                      value={credentials[type].clientId}
                      onChange={(e) => handleChange(type, 'clientId', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={`${type}-clientSecret`}
                      className="block text-gray-600 font-medium"
                    >
                      Client Secret
                    </label>
                    <input
                      type="text"
                      id={`${type}-clientSecret`}
                      name="clientSecret"
                      value={credentials[type].clientSecret}
                      onChange={(e) => handleChange(type, 'clientSecret', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              onClick={saveCredentials}
              disabled={!isFormValid || isSaved}
              className={`px-8 py-3 text-white rounded-lg focus:outline-none transition-all duration-300 
                ${isFormValid && !isSaved ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              {isSaved ? 'Saved' : 'Save All'}
            </button>

            {isSaved && <span className="text-sm text-green-500 ml-6">All Credentials Saved!</span>}
          </div>
        </>
      )}
    </div>
  );
}
