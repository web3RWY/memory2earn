import dbConnect from '../../../lib/dbConnect'
import Page from '../../../model/Page'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const page = await Page.findById(id)
        if (!page) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: page })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const page = await Page.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!page) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: page })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPage = await Page.deleteOne({ _id: id })
        if (!deletedPage) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}