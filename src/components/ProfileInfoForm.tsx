'use client';

import { saveProfile } from '@/action/profileInfoActions';
import { supabase } from '@/lib/supabase';
import { ProfileInfo } from '@/models/ProfileInfo';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faUpload } from '@fortawesome/free-solid-svg-icons';

type Props = {
  profileInfo: ProfileInfo | null;
};

export default function ProfileInfoForm({ profileInfo }: Props) {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl || '');
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl || '');
  const [username, setUsername] = useState(profileInfo?.username || '');
  const [displayName, setDisplayName] = useState(profileInfo?.displayName || '');
  const [bio, setBio] = useState(profileInfo?.bio || '');

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profileInfo) {
      setCoverUrl(profileInfo.coverUrl || '');
      setAvatarUrl(profileInfo.avatarUrl || '');
      setUsername(profileInfo.username || '');
      setDisplayName(profileInfo.displayName || '');
      setBio(profileInfo.bio || '');
    }
  }, [profileInfo]);

  const handleUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    setUrl: (url: string) => void
  ) => {
    try {
      if (e.target.files) {
        const file = e.target.files[0];
        const { data, error } = await supabase.storage
          .from('buymeachai') // Storage bucket name
          .upload(`public/${file.name}`, file);

        if (data) {
          const publicUrl = supabase.storage
            .from('buymeachai')
            .getPublicUrl(`public/${file.name}`).data.publicUrl;

          setUrl(publicUrl);
        } else if (error) {
          console.error('Upload error:', error.message);
        }
      }
    } catch (err) {
      console.error('Unexpected error during upload:', err);
    }
  };

  async function handleFormAction(formData: FormData) {
    formData.append('coverUrl', coverUrl);
    formData.append('avatarUrl', avatarUrl);
    formData.append('username', username);
    formData.append('displayName', displayName);
    formData.append('bio', bio);

    const savePromise = new Promise<void>(async (resolve, reject) => {
      await saveProfile(formData);
      resolve();
    });

    await toast.promise(savePromise, {
      loading: 'Saving...',
      success: <b>Profile saved!!</b>,
      error: <b>Could not save</b>,
    });
  }

  return (
    <form
      action={handleFormAction}
      className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg space-y-6"
    >
      {/* Cover Image with Change Icon */}
      <div className="relative bg-gray-200 rounded-lg overflow-hidden h-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: coverUrl ? `url(${coverUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!coverUrl && (
            <span
              className="absolute inset-0 flex items-center justify-center text-gray-500 cursor-pointer"
              onClick={() => coverInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faUpload} />
            </span>
          )}
          <input
            ref={coverInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e, setCoverUrl)}
          />
          {coverUrl && (
            <div
              className="absolute top-2 right-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
              onClick={() => coverInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          )}
        </div>
      </div>

      {/* Avatar with Change Icon */}
      <div className="relative w-24 h-24 mx-auto bg-gray-300 rounded-full border-4 border-white overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!avatarUrl && (
            <span
              className="flex items-center justify-center h-full text-gray-500 cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faUpload} />
            </span>
          )}
          <input
            ref={avatarInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e, setAvatarUrl)}
          />
          {avatarUrl && (
            <div
              className="absolute bottom-2 right-2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faPencil} />
            </div>
          )}
        </div>
      </div>

      {/* Username Input */}
      <div className='grid grid-cols-2 gap-2'>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="usernameIn"
        >
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="usernameIn"
          type="text"
          placeholder="Enter your username"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      {/* Display Name Input */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="displayNameIn"
        >
          Display Name
        </label>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          name="displayName"
          id="displayNameIn"
          type="text"
          placeholder="Enter your display name"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Bio Input */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="bioIn"
        >
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          name="bio"
          id="bioIn"
          placeholder="Write a short bio"
          className="w-full p-2 border border-gray-300 rounded-lg"
        ></textarea>
      </div>

      {/* Save Profile Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg"
        >
          Save Profile
        </button>
      </div>
      </div>
    </form>
  );
}
