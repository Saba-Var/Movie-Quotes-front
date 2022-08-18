import { useEditQuote } from './useEditQuote'
import { EditQuoteProps } from './types.d'
import { addQuoteSchema } from 'schemas'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import {
  TextAreaInput,
  FormWrapper,
  ErrorAlert,
  PhotoIcon,
  Button,
} from 'components'

const EditQuote: React.FC<EditQuoteProps> = (props) => {
  const { setEditModal, setDeleteModal, quoteId } = props

  const {
    fileChangeHandler,
    submitHandler,
    setFetchError,
    currentQuote,
    fetchError,
    imageSrc,
    file,
    t,
  } = useEditQuote(quoteId, setEditModal)

  return (
    <>
      {currentQuote && (
        <FormWrapper
          title={t('news-feed:add-quote')}
          setDeleteModal={setDeleteModal}
          setShowForm={setEditModal}
          styles='1xl:top-24'
          modal='edit'
        >
          <Formik
            validationSchema={addQuoteSchema}
            onSubmit={submitHandler}
            initialValues={{
              quoteEn: currentQuote?.quoteEn,
              quoteGe: currentQuote?.quoteGe,
            }}
          >
            {() => {
              return (
                <Form>
                  <div className='flex flex-col gap-6 mt-9 1xl:mt-0'>
                    {fetchError && (
                      <ErrorAlert
                        setShowAlert={setFetchError}
                        styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                        title='movies:edit-quote-failed'
                      />
                    )}

                    <TextAreaInput
                      placeholder={`"Quote in English."`}
                      name='quoteEn'
                      language='Eng'
                    />

                    <TextAreaInput
                      placeholder={`"ციტატა ქართულ ენაზე."`}
                      name='quoteGe'
                      language='ქარ'
                    />

                    <div className='animate-fold-out relative h-[302px] 2xl:h-[38vh]'>
                      <label className='absolute hover:scale-105 gap-2 transition-transform active:scale-100 cursor-pointer rounded-[10px] bg-black bg-opacity-60 w-[135px] h-[84px] flex flex-col justify-center items-center z-[999] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                        <PhotoIcon />
                        <p className='select-none text-base'>
                          {t('movies:change-photo')}
                        </p>
                        <input type='file' onChange={fileChangeHandler} />
                      </label>

                      {!file && (
                        <Image
                          className='rounded-xl select-none'
                          loader={() => imageSrc}
                          unoptimized={true}
                          alt='quote image'
                          src={imageSrc}
                          layout='fill'
                          priority
                        />
                      )}

                      {file && (
                        <Image
                          className='animate-scale-up rounded-xl select-none'
                          src={URL.createObjectURL(file)}
                          unoptimized={true}
                          alt='uploaded file'
                          layout='fill'
                          priority
                        />
                      )}
                    </div>

                    <Button
                      styles='bg-orange !hover:scale-105 xl:text-xl'
                      title={t('movies:save-changes')}
                      type='submit'
                    />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </FormWrapper>
      )}
    </>
  )
}

export default EditQuote
