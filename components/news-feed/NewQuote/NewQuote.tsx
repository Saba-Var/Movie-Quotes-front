import { useNewQuote } from './useNewQuote'
import { addQuoteSchema } from 'schemas'
import { Form, Formik } from 'formik'
import {
  ImageDragAndDrop,
  MovieMultiSelect,
  TextAreaInput,
  FormWrapper,
  WriteIcon,
  Button,
} from 'components'

const NewQuote = () => {
  const {
    setSelectedMovieId,
    setEmptyFIleError,
    setMovieIdError,
    selectedMovieId,
    emptyFileError,
    setShowAddForm,
    movieIdError,
    showAddForm,
    setFile,
    file,
    t,
  } = useNewQuote()

  return (
    <>
      <div className={`lg:bg-backgroundGray rounded-lg !w-full`}>
        <div
          onClick={() => setShowAddForm(true)}
          className='!w-full flex gap-3 cursor-pointer pt-1 lg:py-3 pl-4 hover:scale-[1.03] active:scale-100 transition-transform'
        >
          <WriteIcon />
          <p className='text-white select-none font-Helvetica-Neue-Geo text-xl'>
            {t('news-feed:write-quote')}
          </p>
        </div>
      </div>

      {showAddForm && (
        <FormWrapper
          styles='1xl:top-[10%] 1xl:w-[550px] lg:!w-[650px] xl:!w-[800px] 2xl:!w-[990px]  1xl:left-[335px] lg:!left-[405px] 2xl:!left-[497px]'
          title={t('news-feed:write-quote')}
          setSelectedMovieId={setSelectedMovieId}
          setEmptyFIleError={setEmptyFIleError}
          setMovieIdError={setMovieIdError}
          setShowForm={setShowAddForm}
          disableOverflow={true}
          setFile={setFile}
        >
          <Formik
            validationSchema={addQuoteSchema}
            validateOnMount={false}
            initialValues={{
              quoteEn: '',
              quoteGe: '',
            }}
            onSubmit={() => {}}
          >
            {() => {
              return (
                <Form>
                  <div className='flex flex-col gap-8 mt-9'>
                    <TextAreaInput
                      placeholder='Start create new quote'
                      language='Eng'
                      name='quoteEn'
                    />

                    <TextAreaInput
                      placeholder='ახალი ციტატა'
                      language='ქარ'
                      name='quoteGe'
                    />

                    <ImageDragAndDrop
                      setEmptyFIleError={setEmptyFIleError}
                      emptyFileError={emptyFileError}
                      setFile={setFile}
                      file={file}
                    />

                    <MovieMultiSelect
                      setSelectedMovieId={setSelectedMovieId}
                      setMovieIdError={setMovieIdError}
                      movieIdError={movieIdError}
                    />

                    <Button
                      onClick={() => {
                        if (!file) {
                          setEmptyFIleError(true)
                        }

                        if (!selectedMovieId) {
                          setMovieIdError(true)
                        }
                      }}
                      styles='bg-orange w-full'
                      title={t('news-feed:post')}
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

export default NewQuote
