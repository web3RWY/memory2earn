import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, articleForm, forNewArticle }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    user: articleForm.user,
    createdAt: articleForm.createdAt,
    article: articleForm.article,
  })
//   const [form, setForm] = useState({})

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/pages/api/page/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/page/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update pet')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
        form.createdAt = Date.now();
    try {
      const res = await fetch('/api/page/', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add pet')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const formValidate = () => {
    let err = {}
    if (!form.user) err.name = 'User address is required'
    if (!form.article) err.species = 'Article is required'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewArticle ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">User</label>
        <input
          type="text"
          maxLength="20"
          name="user"
          value={form.user}
          onChange={handleChange}
          required
        />

        {/* <label htmlFor="createdAt">createdAt</label>
        <input
          type="text"
          maxLength="20"
          name="createdAt"
          value={form.createdAt}
          onChange={handleChange}
          required
        /> */}

        <label htmlFor="Article">Article</label>
        <input
          type="text"
          maxLength="30"
          name="article"
          value={form.article}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default Form