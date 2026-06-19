export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  categories: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoUrl: string | null;
  featured: boolean;
  accent: 'warm' | 'cool';
}

export const ALL_CATEGORIES = ['All', 'RAG', 'NLP', 'Computer Vision', 'Generative AI', 'DevOps/TestOps'];

export const projects: Project[] = [
  {
    id: 1,
    title: 'DiReCT — Clinical RAG for Diagnostic Reasoning',
    description: 'End-to-end clinical RAG over 511 real MIMIC-IV notes with hybrid retrieval (BM25 + FAISS fused via RRF) and cross-encoder reranking.',
    longDescription: 'Built an end-to-end Clinical RAG system over 511 real MIMIC-IV physician notes with hybrid retrieval (BM25 + FAISS fused via RRF), cross-encoder reranking (ms-marco-MiniLM-L-6-v2), and query expansion to MIMIC-style vocabulary. Dual LLM generation (Gemini 2.5-flash + Groq fallback) returns structured responses with citations and critical flags.',
    categories: ['RAG', 'NLP'],
    tags: ['FastAPI', 'React', 'LangChain', 'FAISS', 'BM25', 'Gemini 2.5-flash', 'Groq'],
    metrics: [{ label: 'Retrieval Precision@5', value: '0.64' }, { label: 'Generation Score', value: '4.93/5.0' }],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: null,
    featured: true,
    accent: 'warm',
  },
  {
    id: 2,
    title: 'Document to Markdown Generation',
    description: 'Fine-tuned Qwen2-VL-2B-Instruct on 14,236 image-markdown pairs using QLoRA (4-bit NF4) on dual T4 GPUs for document understanding.',
    longDescription: 'Fine-tuned Qwen2-VL-2B-Instruct on 14,236 image-markdown pairs (Nougat Dataset) using QLoRA (4-bit NF4) on dual T4 GPUs for document understanding — headings, citations, multi-column layouts, and structured markdown generation.',
    categories: ['Generative AI', 'Computer Vision'],
    tags: ['Qwen2-VL', 'QLoRA', 'PEFT', 'PyTorch'],
    metrics: [{ label: 'BLEU', value: '0.84' }, { label: 'ROUGE-L', value: '0.92' }, { label: 'Train Loss', value: '0.07' }],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: '#',
    featured: true,
    accent: 'cool',
  },
  {
    id: 3,
    title: 'TestHub — AI-Powered Test Automation',
    description: 'Scalable web-based test automation platform with parallel execution across Chrome/Firefox; AI script generator via LLMs.',
    longDescription: 'Built a scalable web-based test automation platform supporting parallel test execution across Chrome and Firefox using Selenium Grid and Playwright, with Python and Java support, artifact storage, and reporting. AI-powered test script generator scrapes web pages using Playwright, preprocesses DOM data, and generates executable test scripts via LLMs (Gemini with Groq fallback).',
    categories: ['DevOps/TestOps'],
    tags: ['Go', 'Python', 'Docker', 'Playwright', 'Selenium', 'LLM APIs'],
    metrics: [],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: null,
    featured: true,
    accent: 'warm',
  },
  {
    id: 4,
    title: 'Neural Storyteller — Image Captioning',
    description: 'End-to-end image captioning pipeline using ResNet50 for feature extraction and LSTM-based Seq2Seq decoder with beam search.',
    longDescription: 'Built an end-to-end image captioning pipeline using ResNet50 for feature extraction and an LSTM-based Seq2Seq decoder. Implemented greedy decoding and beam search strategies with a Gradio web app for real-time inference.',
    categories: ['Computer Vision', 'NLP'],
    tags: ['PyTorch', 'torchvision', 'ResNet50', 'LSTM', 'Gradio'],
    metrics: [],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: '#',
    featured: false,
    accent: 'cool',
  },
  {
    id: 5,
    title: 'Denoising Diffusion Probabilistic Model',
    description: 'DDPM from scratch with U-Net backbone (64→512 channels), self-attention, sinusoidal time embeddings. Trained on 30k FFHQ faces.',
    longDescription: 'Built a DDPM from scratch with U-Net backbone (64→512 channels): self-attention at 16×16 and 32×32 resolution, sinusoidal time embeddings, and residual skip connections. Trained on 30k FFHQ faces for 60 epochs using mixed precision on dual T4 GPUs.',
    categories: ['Generative AI', 'Computer Vision'],
    tags: ['PyTorch', 'U-Net', 'Mixed Precision', 'Gradio'],
    metrics: [{ label: 'PSNR', value: '11.36 dB' }, { label: 'SSIM', value: '0.21' }],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: '#',
    featured: false,
    accent: 'warm',
  },
  {
    id: 6,
    title: 'Pix2Pix GAN — Anime Sketch Colorization',
    description: 'GAN (U-Net Generator + PatchGAN Discriminator) trained on 14k+ sketch-color pairs. Deployed live on Hugging Face.',
    longDescription: 'Trained a GAN (U-Net Generator + PatchGAN Discriminator) on 14k+ sketch-color pairs with Adversarial + L1 Loss on dual T4 GPUs. Deployed live on Hugging Face Spaces for real-time colorization.',
    categories: ['Generative AI', 'Computer Vision'],
    tags: ['PyTorch', 'U-Net', 'PatchGAN', 'Hugging Face'],
    metrics: [{ label: 'SSIM', value: '0.64' }, { label: 'PSNR', value: '14.58 dB' }],
    githubUrl: 'https://github.com/Imran-Ali-Naeem',
    demoUrl: 'https://huggingface.co/Imran-Ali-Naeem',
    featured: false,
    accent: 'cool',
  },
];
