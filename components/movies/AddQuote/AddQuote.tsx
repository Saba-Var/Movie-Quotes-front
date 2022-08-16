import { useAddQuote } from './useAddQuote'
import { AddQuoteProps } from './types.d'
import { addQuoteSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  DefaultMovieInfo,
  ImageDragAndDrop,
  TextAreaInput,
  FormWrapper,
  ErrorAlert,
  Button,
} from 'components'

const AddQuote: React.FC<AddQuoteProps> = (props) => {
  const { setAddQuoteModal } = props

  const {
    setDuplicateQuotes,
    setEmptyFIleError,
    duplicateQuotes,
    emptyFileError,
    setFetchError,
    submitHandler,
    fetchError,
    setFile,
    file,
    t,
  } = useAddQuote(setAddQuoteModal)

  return (
    <FormWrapper
      title={t('news-feed:add-quote')}
      setShowForm={setAddQuoteModal}
      styles='1xl:top-28'
    >
      <Formik
        validationSchema={addQuoteSchema}
        onSubmit={submitHandler}
        initialValues={{
          quoteEn: '',
          quoteGe: '',
        }}
      >
        {() => {
          return (
            <Form>
              <div className='flex flex-col gap-5 xl:gap-6'>
                {fetchError && (
                  <ErrorAlert
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='news-feed:quote-add-error'
                    setShowAlert={setFetchError}
                  />
                )}

                {duplicateQuotes && (
                  <ErrorAlert
                    styles='left-1/2 !-translate-x-1/2 1xl:left-[53%]'
                    title='news-feed:duplicate-quote'
                    setShowAlert={setDuplicateQuotes}
                  />
                )}

                <div className='hidden lg:block '>
                  <DefaultMovieInfo />
                </div>

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

                <ImageDragAndDrop
                  setEmptyFIleError={setEmptyFIleError}
                  emptyFileError={emptyFileError}
                  setFile={setFile}
                  file={file}
                />

                <div className='lg:hidden'>
                  <DefaultMovieInfo />
                </div>

                <Button
                  styles='bg-orange !hover:scale-105 xl:text-xl'
                  title={t('news-feed:add-quote')}
                  onClick={() => {
                    if (!file) {
                      setEmptyFIleError(true)
                    }
                  }}
                  type='submit'
                />
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}

export default AddQuote
