import { useImageDragAndDrop } from './useImageDragAndDrop'
import { FileUploader } from 'react-drag-drop-files'
import { PhotoIcon, ErrorAlert } from 'components'
import { ImageDragAndDropProps } from './types.d'
import Image from 'next/image'

const ImageDragAndDrop: React.FC<ImageDragAndDropProps> = (props) => {
  const { file, setFile, emptyFileError, setEmptyFIleError } = props

  const { t, fileChangeHandler, handleChange, setTypeError, typeError } =
    useImageDragAndDrop(setEmptyFIleError, setFile, emptyFileError)

  return (
    <div className='flex flex-col relative h-[74px]'>
      <div className='hidden 1xl:block'>
        <FileUploader
          types={['JPG', 'PNG', 'GIF', 'JPEG', 'WEBP']}
          onTypeError={() => setTypeError(true)}
          handleChange={handleChange}
          hoverTitle=' '
          name='image'
        >
          <div
            className={`pl-3 h-[70px] flex gap-2 items-center w-full text-white border border-gray-600 rounded ${
              emptyFileError && 'border-red-500'
            } ${file && '!border-green'}`}
          >
            <PhotoIcon />
            <p className='text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
              {t('common:drag-drop-image')}{' '}
              <span className='bg-purple p-2 ml-2 rounded cursor-pointer text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
                {t('common:choose-file')}
              </span>
            </p>
          </div>
        </FileUploader>
      </div>

      <div className='block 1xl:hidden'>
        <div
          className={`pl-3 h-[70px] gap-1 flex items-center w-full text-white border border-gray-600 rounded ${
            emptyFileError && 'border-red-500'
          } ${file && '!border-green'}`}
        >
          <PhotoIcon />
          <p className='text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
            {t('common:upload-image')}
          </p>
          <label>
            <p className='bg-purple p-1 ml-2 text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
              {t('common:choose-file')}
            </p>
            <input type='file' onChange={fileChangeHandler} />
          </label>
        </div>
      </div>

      {file && (
        <div className='absolute right-0 z-[-2]'>
          <Image
            src={URL.createObjectURL(file)}
            alt='uploaded file'
            height='70px'
            width='70px'
          />
        </div>
      )}

      <div className='-left-1/2 2x'></div>

      {typeError && (
        <ErrorAlert
          styles='left-[35%] 1xl:left-[44%] 2xl:!left-[45%]'
          title='common:upload-only-image'
          setShowAlert={setTypeError}
        />
      )}

      {emptyFileError && (
        <p className='text-sm text-red-500'>{t('common:upload-image')}</p>
      )}
    </div>
  )
}

export default ImageDragAndDrop
