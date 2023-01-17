import React from 'react';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
interface FormData {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}
function PostBox() {
  const { data: session, status } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async data => {
    console.log(data);
  });
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-40 border bg-white rounded-md p-2 border-gray-300"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          className="bg-gray-50 p-2 pl-2 outline-none flex-1 rounded-md"
          type="text"
          disabled={!session}
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign In to post'
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 transition ease-in ${
            imageBoxOpen && 'text-blue-600'
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]"> Body:</p>
            <input
              {...register('postBody', {})}
              className="flex-1 m-2 p-2 outline-none bg-blue-50"
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]"> SubReddit:</p>
            <input
              {...register('subreddit', {
                required: true,
              })}
              className="flex-1 m-2 p-2 outline-none bg-blue-50"
              type="text"
              placeholder="i.e. nextjs"
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]"> Image Url:</p>
              <input
                {...register('postImage', {})}
                className="flex-1 m-2 p-2 outline-none bg-blue-50"
                type="text"
                placeholder="i.e. nextjs"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-blue-400 text-center p-2 text-white mt-2"
          >
            Create Post
          </button>

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-600">
              {errors.postTitle?.type === 'required' && (
                <p>Post title is required</p>
              )}
              {errors.subreddit?.type === 'required' && (
                <p>Subreddit is required</p>
              )}
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
