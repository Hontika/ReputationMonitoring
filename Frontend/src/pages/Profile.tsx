import { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import useAuthContext from '../hooks/useAuthContext';
import { useTheme } from '../theme/useTheme';
import { getFromLS } from '../utils/storage';
import _ from 'lodash';

interface ProfileForm {
    name: string;
    twitter: string;
    reddit: string;
    companyName: string;
}

export default function Profile({ switchTheme }) {
    const { user, errors, updateProfile, sendEmailVerificationLink, loading } = useAuthContext();
    const [formData, setFormData] = useState<ProfileForm>({
        name: user?.name || '',
        twitter: user?.twitter || '',
        reddit: user?.reddit || '',
        companyName: user?.companyName || ''
    });
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [theme, setTheme] = useState();
    const { setMode } = useTheme();

    useEffect(() => {
        if (status) {
            console.log(status);
        }
        console.log(user)
    }, [status]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateProfile(formData);
    };

    const changeTheme = (param: string) => {
        console.log(data[param]);
        setMode(data[param]);
        setTheme(data[param]);
        switchTheme();
    }

    useEffect(() => {
        console.log('theme changed');
    }, [theme]);

    return (
        <>
            {!user?.email_verified_at && (
                    <div className="p-4 emailconfirm flex items-center gap-x-10">
                        <p className="text-sm font-bold emailconfirm">Please verify your email address.</p>
                        <button
                            className="emailconfirmbtn py-1.5 px-4 text-lg flex items-center gap-x-2 disabled:cursor-not-allowed"
                            onClick={sendEmailVerificationLink}
                            disabled={loading}
                        >
                            {loading && <Spinner loading={loading} />}
                            <span>Verify</span>
                        </button>
                    </div>
                )}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 divide-y">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                        Update Profile
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6 my-5" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6"
                            >
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
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
                                className="block text-sm font-medium leading-6"
                            >
                                Name of Company
                            </label>
                            <div className="mt-2">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
                                        }`}
                                    value={formData.companyName}
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
                                className="block text-sm font-medium leading-6"
                            >
                                Twitter handle of company
                            </label>
                            <div className="mt-2">
                                <input
                                    id="twitter"
                                    name="twitter"
                                    type="text"
                                    className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
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
                                className="block text-sm font-medium leading-6"
                            >
                                Reddit
                            </label>
                            <div className="mt-2">
                                <input
                                    id="reddit"
                                    name="reddit"
                                    type="text"
                                    className={`block w-full border-0 py-1.5 px-2 shadow-sm sm:text-sm sm:leading-6 ${errors.name && 'ring-red-500'
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
                                className="flex w-full justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm items-center gap-x-2 disabled:cursor-not-allowed"
                                disabled={loading}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex w-full justify-center px-3 py-1.5leading-6 shadow-sm items-center gap-x-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="grid grid-cols-3 gap-4 pt-5">
                        {Object.keys(data).map(theme => (
                            <button
                                key={theme}
                                className="flex w-28 h-28 justify-center px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm items-center gap-x-2 disabled:cursor-not-allowed"
                                onClick={() => changeTheme(theme)}
                            >
                                {data[theme].name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}



