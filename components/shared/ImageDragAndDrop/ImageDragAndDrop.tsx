import { useImageDragAndDrop } from './useImageDragAndDrop'
import { FileUploader } from 'react-drag-drop-files'
import { ImageDragAndDropProps } from './types.d'
import { PhotoIcon } from 'components'
import { useState } from 'react'
import Image from 'next/image'

const ImageDragAndDrop: React.FC<ImageDragAndDropProps> = (props) => {
  const [typeError, setTypeError] = useState(false)
  const { file, setFile } = props

  const handleChange = (file: File) => {
    setFile(file)
    if (typeError) {
      setTypeError(false)
    }
  }

  const { t } = useImageDragAndDrop()

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.includes('image/')) {
      setFile(e.target.files[0])

      if (typeError) {
        setTypeError(false)
      }
    }
  }

  return (
    <div className='flex flex-col relative h-[80px]'>
      <div className='hidden 1xl:block'>
        <FileUploader
          types={['JPG', 'PNG', 'GIF', 'JPEG', 'SVG']}
          onTypeError={() => setTypeError(true)}
          handleChange={handleChange}
          hoverTitle=' '
          name='image'
        >
          <div
            className={`pl-3 h-[70px] flex gap-2 items-center w-full text-white border border-gray-600 rounded ${
              typeError && 'border-red-500'
            } `}
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
        <div className='pl-3 h-[70px] gap-2 flex items-center w-full text-white border border-gray-600 rounded'>
          <PhotoIcon />
          <p className='text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
            {t('common:upload-image')}
          </p>{' '}
          <label>
            <span className='bg-purple p-2 ml-2 text-white text-base 2xl:text-xl font-Helvetica-Neue-Geo font-medium'>
              {t('common:choose-file')}
            </span>
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

      {typeError && (
        <p className='text-sm text-red-500'>{t('common:upload-only-image')}</p>
      )}
    </div>
  )
}

export default ImageDragAndDrop
