import { Tool } from '../types';

export const toolsRegistry: Tool[] = [
  // CONVERT GROUP
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    shortDesc: 'Convert PDF documents to editable Microsoft Word files instantly.',
    longDesc: 'Extract text layers directly from your PDF documents and package them into editable DOCX files without any server-side upload.',
    path: '/pdf-to-word',
    icon: 'FileText',
    color: 'from-blue-500 to-blue-700',
    seoTitle: 'Convert PDF to Word Free Online - Local Browser Processing',
    seoDesc: 'Easily parse and convert PDF files into editable Microsoft Word DOCX documents completely offline. Secure browser execution preserves your text layout.',
    faqs: [
      {
        question: 'How does in-browser PDF-to-Word conversion operate?',
        answer: 'Our tool parses raw PDF character layouts on-the-fly and generates a true .docx document directly in browser memory. No third-party network APIs are called, keeping your personal file information 100% confidential.'
      },
      {
        question: 'Are there file-size or usage restrictions?',
        answer: 'None! Since the conversion relies purely on local hardware, you can convert as many files as you want regardless of their scale.'
      }
    ]
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    shortDesc: 'Convert Microsoft Word DOCX documents to standard PDF files in your browser.',
    longDesc: 'Parse Microsoft Word DOCX content on client-side and output a perfectly formatted PDF document instantly.',
    path: '/word-to-pdf',
    icon: 'FileOutput',
    color: 'from-violet-500 to-violet-700',
    seoTitle: 'Convert Word to PDF Free Online - Simple document converter',
    seoDesc: 'Instantly compile Docx files into highly compatible PDF files locally in your browser. All parsing occurs inside your device.',
    faqs: [
      {
        question: 'How are DOCX elements rendered to PDF format?',
        answer: 'Using Mammoth parsing libraries, the text flow is accurately mapped layout-by-layout and structured dynamically into pages with standard jsPDF dimensions.'
      }
    ]
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    shortDesc: 'Extract tables and data from PDF to Excel spreadsheet',
    longDesc: 'Locally analyze vector tables and vertical alignment inside PDF pages to automatically formulate spreadsheet grids and output editable .xlsx files.',
    path: '/pdf-to-excel',
    icon: 'Table2',
    color: 'from-green-550 to-emerald-600',
    seoTitle: 'Convert PDF to Excel Spreadsheet Online Free',
    seoDesc: 'Extract tables and datasets from your PDF file into highly compatible Excel (.xlsx) formats right in your browser. Fully local and private.',
    faqs: [
      {
        question: 'How does PDF to Excel extraction work technically?',
        answer: 'Our local parsing engine scans horizontal layout coordinates of text nodes in the PDF to determine column alignment, organizing structured records directly into Microsoft Excel worksheets without server transmission.'
      },
      {
        question: 'What happens if my PDF contains simple sentences rather than spreadsheets?',
        answer: 'If no table alignment is identified, the parser fallback structures each simple sentence line-by-line as separate continuous rows in a single column worksheet.'
      },
      {
        question: 'Are there security protocols applied?',
        answer: '100% Client-Side execution. No API endpoints or data queues are reached; all worksheet compilation runs completely on your CPU.'
      },
      {
        question: 'Can I select sheets to convert?',
        answer: 'The converter parses all pages of your PDF document and places them safely in order into a uniform Sheet layout.'
      }
    ]
  },
  {
    id: 'pdf-to-ppt',
    name: 'PDF to PowerPoint',
    shortDesc: 'Convert each PDF page into a PowerPoint slide',
    longDesc: 'Render the high-precision layouts of your PDF document pages onto local HTML canvas nodes and instantly compile them into widescreen PowerPoint slides.',
    path: '/pdf-to-ppt',
    icon: 'Presentation',
    color: 'from-orange-500 to-amber-600',
    seoTitle: 'Convert PDF to PowerPoint (PPTX) Slides Free Online',
    seoDesc: 'Generate crisp Microsoft PowerPoint presentation decks from your PDF documents entirely offline inside your browser.',
    faqs: [
      {
        question: 'How are presentation slides formatted from PDF?',
        answer: 'Your PDF pages are rendered on high-density graphics contexts, packed into PNG images, and mapped to fit widescreen 16:9 slides precisely.'
      },
      {
        question: 'Will my vectors and text stay fully selectable?',
        answer: 'To lock down exact positioning and avoid misaligned text styles on foreign devices, the pages are compiled into pixel-perfect full-bleed slide canvases.'
      },
      {
        question: 'Is there a page number warning?',
        answer: 'Extremely long files take extra canvas cycles to render. We recommend files under 100 pages for optimized performance.'
      },
      {
        question: 'What widescreen specification is used?',
        answer: 'We default to standard 16:9 widescreen layout formats mapping to standard dimensions (13.33 inches by 7.5 inches).'
      }
    ]
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    shortDesc: 'Convert every PDF page into a high-quality JPG image.',
    longDesc: 'Render PDF page assets into standalone downloadable JPG images. Control resolution quality and download as a neat ZIP archive.',
    path: '/pdf-to-jpg',
    icon: 'FileImage',
    color: 'from-rose-500 to-orange-600',
    seoTitle: 'Convert PDF to JPG Online - High Quality Images',
    seoDesc: 'Turn each page of your PDF file into a separate high-resolution JPG image inside your browser. No registration required, simple and fast.',
    faqs: [
      {
        question: 'How do I download converted page images?',
        answer: 'After conversion completes, a download package is compiled as a ZIP file, which extracts on your desktop to reveal individual JPGs.'
      },
      {
        question: 'What does the Quality setting do?',
        answer: 'Adjusting Quality scales the canvas rendering. High quality renders PDF vector letters with superior resolution and crisp pixel definition.'
      }
    ]
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    shortDesc: 'Convert JPG photos to vertical or horizontal PDF portfolios easily.',
    longDesc: 'Reorder uploaded JPG slides and merge them instantly into a single PDF document. Zero quality degradation.',
    path: '/jpg-to-pdf',
    icon: 'FileSpreadsheet',
    color: 'from-orange-500 to-yellow-600',
    seoTitle: 'Convert JPG to PDF Online - Free Image to PDF Merger',
    seoDesc: 'Convert JPG photos into a single PDF slideshow or portfolio. Reorder slides easily before merging totally client-side.',
    faqs: [
      {
        question: 'Can I combine multiple JPG files into a single PDF?',
        answer: 'Yes! That is exactly what this tool is designed for. Simply upload all your JPG slides, sort their slots, and click Compile.'
      }
    ]
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    shortDesc: 'Convert JPG, PNG, or WEBP images into an elegant PDF document.',
    longDesc: 'Upload multiple images, drag to change their order, and export with custom layouts (A4, Letter, Auto-fit) and custom orientation constraints.',
    path: '/image-to-pdf',
    icon: 'Image',
    color: 'from-pink-500 to-rose-600',
    seoTitle: 'Image to PDF Converter - JPG, PNG to PDF Online',
    seoDesc: 'Easily convert images (JPG, PNG, WEBP) to PDF page-sets online. Customize page format, orientation, and reorder files instantly.',
    faqs: [
      {
        question: 'What image formats can I convert to PDF?',
        answer: 'We support standard PNG, JPG, JPEG, and WebP, as well as GIF static images.'
      },
      {
        question: 'What is the "Auto-fit" Page Size option?',
        answer: '"Auto-fit" sizes each individual page of the output PDF to exactly match the width and height of the original source image, preventing stretching.'
      }
    ]
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    shortDesc: 'Extract all text from PDF — copy or download as .txt',
    longDesc: 'Fast, secure online text extractor. Scan character layouts inside your PDF pages client-side and download as formatted raw txt layout.',
    path: '/pdf-to-text',
    icon: 'FileText',
    color: 'from-cyan-500 to-teal-600',
    seoTitle: 'Extract Text from PDF Free - PDF to Text Converter Local',
    seoDesc: 'Instantly parse and extract all selectable text layouts inside PDF files into standard plain txt files in your browser. Completely private and local.',
    faqs: [
      {
        question: 'How is textual data extracted locally?',
        answer: 'We scan character metadata using local rendering engines to assemble text rows. Scanned images do not contain selectable text unless processed with OCR.'
      },
      {
        question: 'Does the parser save copies of my text?',
        answer: 'Our tool runs entirely client-side. No databases, networks, or cloud nodes see your textual info. Privacy in-browser is completely private.'
      },
      {
        question: 'Are page indicators preserved?',
        answer: 'Yes! Each page is cleanly separated with explicit dividers so you know exactly where section changes occur.'
      },
      {
        question: 'What is the maximum file size supported?',
        answer: 'Usually files up to 100MB process flawlessly. Larger files might depend on your computer CPU power.'
      }
    ]
  },

  // ORGANIZE GROUP
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one single document in seconds.',
    longDesc: 'Drag, reorder, and merge your PDFs online. All processing runs right inside your browser.',
    path: '/merge-pdf',
    icon: 'Combine',
    color: 'from-blue-500 to-indigo-600',
    seoTitle: 'Merge PDF Files Online - Free and Secure',
    seoDesc: 'Easily merge multiple PDF files in your preferred order completely in-browser. No size limits, no file upload to third-party servers, or hidden fees.',
    faqs: [
      {
        question: 'Are my uploaded PDF files safe?',
        answer: 'Absolutely. Unlike other online converters, PDFTools Suite operates entirely local. Your files are never uploaded to any server. They are processed entirely within your browser memory.'
      },
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'No! There is no page limit or upload count limit since the files are processed directly on your system CPU.'
      },
      {
        question: 'Can I reorder files before merging?',
        answer: 'Yes! Simply use the up/down Arrow buttons on any uploaded file card to reorder them in the exact order you want them merged.'
      },
      {
        question: 'Does this tool support password-protected files?',
        answer: 'To merge encrypted or password-protected PDFs, you must first unlock them using our "Unlock PDF" tool before combining them.'
      }
    ]
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    shortDesc: 'Extract specific pages or split a PDF into separate files.',
    longDesc: 'Split PDFs by customized ranges (e.g., 1-5), extract specific separate pages, or split every N pages into dynamic separate document indices.',
    path: '/split-pdf',
    icon: 'Scissors',
    color: 'from-indigo-500 to-violet-600',
    seoTitle: 'Split PDF Online - Extract Pages of PDF In-Browser',
    seoDesc: 'Extract pages from your PDF file or split every page into a standalone document in seconds. 100% client side and secure.',
    faqs: [
      {
        question: 'How do I split a PDF file using this tool?',
        answer: 'Upload your PDF, choose from one of the three splitting methods (by Range, Every N pages, or Extract specific page numbers), adjust values and click Split.'
      },
      {
        question: 'Can I download all split files at once?',
        answer: 'Yes! If multiple split documents are created, they are packed instantly into a compressed ZIP file on your client, letting you trigger one fast download.'
      },
      {
        question: 'What does "Split every N pages" mean?',
        answer: 'This option cuts the document into equal, separate parts containing N pages each. For example, a 10-page document split every 2 pages produces 5 separate PDFs.'
      }
    ]
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    shortDesc: 'Reduce your PDF file size without losing essential quality.',
    longDesc: 'Select from multiple compression level configurations to shrink vector graphics and eliminate redundant resources instantly in-browser.',
    path: '/compress-pdf',
    icon: 'Minimize2',
    color: 'from-violet-500 to-fuchsia-600',
    seoTitle: 'Compress PDF Online - Reduce PDF File Size',
    seoDesc: 'Easily shrink the size of your PDFs in your browser without sacrificing premium visual quality. Choose compression levels securely.',
    faqs: [
      {
        question: 'Will compressing my PDF reduce text quality?',
        answer: 'Our compression algorithm focuses on optimizing object streams and structural elements, leaving text layers completely sharp and fully searchable.'
      },
      {
        question: 'What are the compression levels?',
        answer: '"Low" maintains original quality while applying standard compression formulas. "Medium" offers the best balance of file size versus quality. "High" produces the smallest files.'
      },
      {
        question: 'Is there a limit on the PDF size I can upload for compression?',
        answer: 'We warn users about files exceeding 100MB to avoid browser freeze, but you may process larger files if your computer has ample RAM.'
      }
    ]
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    shortDesc: 'Remove password and copy/print restrictions from secure PDFs.',
    longDesc: 'Simply enter the correct password to strip any printing restrictions or editing locks, saving a copy that opens without prompt.',
    path: '/unlock-pdf',
    icon: 'Unlock',
    color: 'from-fuchsia-500 to-pink-600',
    seoTitle: 'Unlock PDF - Remove Password Security',
    seoDesc: 'Instantly remove security passwords and restrictions from your PDF file. Fully client-side decryption preserves original file metadata.',
    faqs: [
      {
        question: 'Do I need to know the password to unlock a PDF?',
        answer: 'Yes, you must input the correct password to decrypt and unlock the file structure. This tool removes the restriction so you don\'t have to input it on subsequent opens.'
      },
      {
        question: 'Is my input password sent to any backend server?',
        answer: 'Never. Decryption is processed entirely in your web browser memory using pdf-lib. No external network request is ever dispatched.'
      }
    ]
  }
];
