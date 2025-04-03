
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { zip } = req.query;

  const location = zip || "43209";
  const YELP_API_KEY = process.env.YELP_API_KEY;

  const url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=restaurants&limit=10&sort_by=rating`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Yelp data" });
  }
}
