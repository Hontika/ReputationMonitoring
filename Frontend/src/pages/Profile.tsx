import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';

interface ProfileForm {
    name: string;
    twitter: string;
    reddit: string;
  }

export default function Profile() {
    const { user, errors, updateProfile, loading } = useAuthContext();
    const [formData, setFormData] = useState<ProfileForm>({
        name: user?.name || '',
        twitter: user?.twitter || '',
        reddit: user?.reddit || '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateProfile(formData);
    };
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Update Profile
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`block w-full border-0 rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
                                    }`}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-red-400 text-sm">{errors.name[0]}</span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="twitter"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Twitter handle of company
                        </label>
                        <div className="mt-2">
                            <input
                                id="twitter"
                                name="twitter"
                                type="text"
                                className={`block w-full border-0 rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
                                    }`}
                                value={formData.twitter}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-red-400 text-sm">{errors.name[0]}</span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="reddit"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Reddit
                        </label>
                        <div className="mt-2">
                            <input
                                id="reddit"
                                name="reddit"
                                type="text"
                                className={`block w-full border-0 rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
                                    }`}
                                value={formData.reddit}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.name && (
                            <span className="text-red-400 text-sm">{errors.name[0]}</span>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center gap-x-2 disabled:cursor-not-allowed"
                            disabled={loading}>
                                Submit
                            </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


  
