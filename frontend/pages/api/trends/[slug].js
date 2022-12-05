// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";


export default async function handler(req, res) {
  if(req.method === 'GET') {
    const { slug } = req.query;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/trends/rss/${slug}/`,
    );
  }
  res.status(200).json({ message: 'Success!' })
}
