import { usePhotoUpload } from './usePhotoUpload'
import { PhotoUploadProps } from './types.d'
import Image from 'next/image'

const PhotoUpload: React.FC<PhotoUploadProps> = (props) => {
  const { userImageSrc, userName, file, setFile, setTypeError, typeError } =
    props

  const { t, fileChangeHandler } = usePhotoUpload(
    setFile,
    setTypeError,
    typeError
  )

  return (
    <div>
      <div className='w-[188px] h-[188px] relative'>
        {!file && (
          <>
            {!userImageSrc && (
              <div
                className={`bg-slate-600 animate-scale-up w-full h-full flex justify-center items-center rounded-full`}
              >
                <p className='text-[100px] pb-4 select-none text-white'>
                  {userName[0]}
                </p>
              </div>
            )}

            {userImageSrc && (
              <div className={`w-full h-full relative`}>
                <Image
                  className='rounded-full select-none animate-scale-up'
                  loader={() =>
                    `${process.env.NEXT_PUBLIC_API_BASE_URI}/${userImageSrc}`
                  }
                  unoptimized={true}
                  alt='quote image'
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URI}/${userImageSrc}`}
                  layout='fill'
                  priority
                />
              </div>
            )}
          </>
        )}

        {file && (
          <Image
            className='animate-scale-up rounded-full'
            src={URL.createObjectURL(file)}
            unoptimized={true}
            alt='uploaded file'
            layout='fill'
            priority
          />
        )}
      </div>

      <div className='h-[55px]'>
        <label className='cursor-pointer'>
          <p className='text-center text-xl animate-fade-in font-Helvetica-Neue-Geo hover:scale-105 active:scale-100 transition-transform mt-4'>
            {t('profile:upload-new-photo')}
          </p>
          <input type='file' onChange={fileChangeHandler} />
        </label>

        {typeError && (
          <p className='text-red-500 text-base text-center'>
            {t('common:upload-image')}
          </p>
        )}
      </div>
    </div>
  )
}

export default PhotoUpload
