import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    const { prompt } = req.body;
    // console.log("cvjncjvnjvnjcvnj",process.env.REPLICATE_API_TOKEN);

    try {
      const output = await replicate.run(
        "facebookresearch/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
        {
          input: {
            model_version: "melody",
            prompt: prompt,
          },
        }
      );
      console.log("AI music generation started:", output);

      res.status(200).json({ music: output });
    } catch (error) {
      console.error("AI music generation failed:", error);
      res.status(500).json({ error: "AI music generation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}