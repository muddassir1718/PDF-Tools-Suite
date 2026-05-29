import { Tool } from '../types';

export const toolsRegistry: Tool[] = [
  // CATEGORY 1: CONVERT PDF
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
      { question: 'How does in-browser PDF-to-Word conversion operate?', answer: 'Our tool parses raw PDF character layouts on-the-fly and generates a true .docx document directly in browser memory. No third-party network APIs are called.' },
      { question: 'Are there file size limits?', answer: 'Files under 100MB process flawlessly. Large files run strictly on your local CPU memory.' }
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
      { question: 'How is DOCX rendered to PDF?', answer: 'The structure of your DOCX text and tables is parsed directly in browser and structured as layouts to create a clean PDF file.' }
    ]
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to Excel',
    shortDesc: 'Extract tables and data from PDF to Excel spreadsheet',
    longDesc: 'Locally analyze vector tables and vertical alignment inside PDF pages to automatically formulate spreadsheet grids and output editable .xlsx files.',
    path: '/pdf-to-excel',
    icon: 'Table2',
    color: 'from-green-500 to-emerald-600',
    seoTitle: 'Convert PDF to Excel Spreadsheet Online Free',
    seoDesc: 'Extract tables and datasets from your PDF file into highly compatible Excel (.xlsx) formats right in your browser. Fully local and private.',
    faqs: [
      { question: 'Are my tables preserved?', answer: 'Horizontal and vertical grid alignments are calculated in your browser to match sheet grid elements.' }
    ]
  },
  {
    id: 'pdf-to-ppt',
    name: 'PDF to PowerPoint',
    shortDesc: 'Convert each PDF page into a PowerPoint slide',
    longDesc: 'Render the layouts of your PDF document pages onto local HTML canvas nodes and instantly compile them into widescreen PowerPoint slides.',
    path: '/pdf-to-ppt',
    icon: 'Presentation',
    color: 'from-orange-500 to-amber-600',
    seoTitle: 'Convert PDF to PowerPoint (PPTX) Slides Free Online',
    seoDesc: 'Generate crisp Microsoft PowerPoint presentation decks from your PDF documents entirely offline inside your browser.',
    faqs: [
      { question: 'Are slides editable?', answer: 'PDF pages are mapped into high-fidelity widescreen image layers embedded inside .pptx slide structures for pixel-perfect display.' }
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
      { question: 'How are images grouped?', answer: 'If your PDF has multiple pages, they are packed instantly inside a ZIP archive.' }
    ]
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    shortDesc: 'Convert JPG photos to vertical or horizontal PDF portfolios easily.',
    longDesc: 'Reorder uploaded JPG slides and merge them instantly into a single PDF document. Zero quality degradation.',
    path: '/jpg-to-pdf',
    icon: 'Image',
    color: 'from-orange-500 to-yellow-600',
    seoTitle: 'Convert JPG to PDF Online - Free Image to PDF Merger',
    seoDesc: 'Convert JPG photos into a single PDF slideshow or portfolio. Reorder slides easily before merging totally client-side.',
    faqs: [
      { question: 'Are images safe?', answer: 'Yes, your images never leave your local environment.' }
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
      { question: 'Which image formats are supported?', answer: 'We support PNG, JPG, JPEG, WEBP, and static GIF structures.' }
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
      { question: 'Can scanned PDF texts be extracted?', answer: 'Only embedded digital fonts in vector pages are selectable. For scanned paper documents, utilize our OCR scanner tool.' }
    ]
  },
  {
    id: 'pdf-to-png',
    name: 'PDF to PNG',
    shortDesc: 'Render PDF pages into clear, lossless PNG images with custom DPI options.',
    longDesc: 'Convert your PDF into highly crisp, background-friendly PNG images. Select 72, 150 or 300 DPI quality, load thumbnails, and package the results in a ZIP.',
    path: '/pdf-to-png',
    icon: 'FileImage',
    color: 'from-teal-500 to-cyan-600',
    seoTitle: 'PDF to PNG Converter - High Quality Local Conversion',
    seoDesc: 'Save PDF pages to lossless PNG images. Completely secure in-browser execution with quality rendering layers.',
    faqs: [{ question: 'What is the benefit of PNG?', answer: 'PNG offers lossless formatting, excellent for digital overlays and transparent backgrounds.' }]
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML',
    shortDesc: 'Turn PDF document elements into styled, structured HTML codes.',
    longDesc: 'Scan text content, positions, and coordinates inside PDF pages to construct standard readable inline HTML components.',
    path: '/pdf-to-html',
    icon: 'FileCode',
    color: 'from-cyan-600 to-blue-700',
    seoTitle: 'Convert PDF to HTML Online - Clean Web Layouts',
    seoDesc: 'Translate vector PDF text layers into styled HTML code that is easily readable and fully search-engine friendly.',
    faqs: [{ question: 'Is the page layout preserved?', answer: 'Our converter estimates spacing and CSS bounds to structure layouts inline.' }]
  },
  {
    id: 'pdf-to-epub',
    name: 'PDF to EPUB',
    shortDesc: 'Convert PDF files into standard, reflowable EPUB e-books.',
    longDesc: 'Extract texts dynamically and package pages into structured XML layouts, OEBPS manifests, stylesheet templates, and standard .epub archives.',
    path: '/pdf-to-epub',
    icon: 'BookOpen',
    color: 'from-emerald-600 to-green-700',
    seoTitle: 'Free PDF to EPUB Converter - Local e-Book Compilation',
    seoDesc: 'Convert your digital PDF files into standard, reflowable e-book format EPUB that is ready to launch on any e-reader.',
    faqs: [{ question: 'Is this ebook reader compatible?', answer: 'Yes, we output strict OEBPS structures compliant with ebook device guidelines.' }]
  },
  {
    id: 'png-to-pdf',
    name: 'PNG to PDF',
    shortDesc: 'Securely convert PNG images to a highly optimized PDF document.',
    longDesc: 'Upload multiple PNG or WEBP graphics, arrange page order via click selectors, adjust sizing margins, and build a unified vector PDF.',
    path: '/png-to-pdf',
    icon: 'FileImage',
    color: 'from-blue-600 to-indigo-700',
    seoTitle: 'PNG to PDF Converter - Free Image compilation',
    seoDesc: 'Turn your high-quality PNG illustrations into structured PDF documents. Adjust layout format constraints (A4, Letter, Fit).',
    faqs: [{ question: 'Can I upload WebP?', answer: 'Yes, modern formats like WEBP and PNG are supported with auto-scaling layout margins.' }]
  },
  {
    id: 'excel-to-pdf',
    name: 'Excel to PDF',
    shortDesc: 'Convert Excel spreadsheets directly to printable PDF tables.',
    longDesc: 'Upload sheets, render tabular elements into responsive clean cell arrays and export PDF tables using SheetJS parsing capabilities.',
    path: '/excel-to-pdf',
    icon: 'Table',
    color: 'from-emerald-500 to-teal-650',
    seoTitle: 'Convert Excel to PDF Free - SheetJS Local Compiler',
    seoDesc: 'Compile sheets (XLS, XLSX) into printable grid tables embedded inside standard vector PDF dimensions.',
    faqs: [{ question: 'Will columns fit on one page?', answer: 'We auto-fit table coordinates dynamically to preserve margins.' }]
  },
  {
    id: 'ppt-to-pdf',
    name: 'PowerPoint to PDF',
    shortDesc: 'Compile Microsoft PPTX presentation slides to PDF format.',
    longDesc: 'Upload .pptx presentation layouts and convert each slide to standard PDF page sizes locally with layout preserving overlays.',
    path: '/ppt-to-pdf',
    icon: 'Presentation',
    color: 'from-orange-600 to-rose-600',
    seoTitle: 'Convert PowerPoint (PPTX) to PDF Online Free',
    seoDesc: 'Convert PPTX slideshows into portable PDF files. Quick, high-speed, local compilation.',
    faqs: [{ question: 'Can I convert animations?', answer: 'Animations are flattened to maintain page sequence layouts.' }]
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    shortDesc: 'Render pasted HTML tags or web files directly into PDF.',
    longDesc: 'Input raw HTML code or upload .html templates to render and compile page blocks into vectors. Custom A4/Letter size options.',
    path: '/html-to-pdf',
    icon: 'Globe',
    color: 'from-blue-700 to-sky-600',
    seoTitle: 'Render HTML to PDF Online - Code compiler',
    seoDesc: 'Convert web HTML layout matrices into standard PDF records. Perfect for saving receipts, newsletters, or webpages.',
    faqs: [{ question: 'Can I paste raw code?', answer: 'Yes, a live code box accepts raw tags and previews styling outputs immediately.' }]
  },
  {
    id: 'txt-to-pdf',
    name: 'TXT to PDF',
    shortDesc: 'Convert standard text files or notes to structured PDF files.',
    longDesc: 'Input notes, configure professional fonts, letter sizing margins, page line spacing, and output a pristine PDF document.',
    path: '/txt-to-pdf',
    icon: 'FileText',
    color: 'from-slate-600 to-gray-750',
    seoTitle: 'Convert TXT Plain Text to PDF Online Free',
    seoDesc: 'Transform txt notes or scripts into professional print-ready PDF formats inside your browser with clean formatting options.',
    faqs: [{ question: 'Can I set font sizing?', answer: 'Yes, you can choose layout size options from 10px to 16px.' }]
  },
  {
    id: 'epub-to-pdf',
    name: 'EPUB to PDF',
    shortDesc: 'Convert reflowable EPUB e-books directly to printable PDF pages.',
    longDesc: 'Unpack standard e-books in EPUB format, extract raw HTML text files, parse body structures, and compile into cleanly separated PDF documents.',
    path: '/epub-to-pdf',
    icon: 'Book',
    color: 'from-emerald-500 to-cyan-600',
    seoTitle: 'Convert EPUB e-Book to PDF Online Free',
    seoDesc: 'Turn e-books into clean PDF documents beautifully split by chapters. Entirely offline processing.',
    faqs: [{ question: 'Are chapter divisions kept?', answer: 'Yes, each HTML chapter initializes a fresh page break in the output PDF.' }]
  },

  // CATEGORY 2: ORGANIZE PDF
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    shortDesc: 'Combine multiple PDF files into one single document in seconds.',
    longDesc: 'Drag, reorder, and merge your PDFs online. All processing runs right inside your browser.',
    path: '/merge-pdf',
    icon: 'Combine',
    color: 'from-blue-500 to-indigo-600',
    seoTitle: 'Merge PDF Files Online - Free and Secure',
    seoDesc: 'Easily merge PDF files entirely local. No size limits, no server uploads, or hidden fees.',
    faqs: [{ question: 'Can I order documents?', answer: 'Yes, use simple reorder arrow controls to arrange them perfectly.' }]
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    shortDesc: 'Extract specific pages or split a PDF into separate files.',
    longDesc: 'Split PDFs by customized ranges (e.g., 1-5), extract specific separate pages, or split every N pages into separate document indices.',
    path: '/split-pdf',
    icon: 'Scissors',
    color: 'from-indigo-500 to-fuchsia-600',
    seoTitle: 'Split PDF Online - Extract Pages of PDF In-Browser',
    seoDesc: 'Extract pages from your PDF file or split every page into a standalone document in seconds. 100% client side and secure.',
    faqs: [{ question: 'Can I download all at once?', answer: 'Yes, multiple outputs are bundled into a convenient ZIP archive.' }]
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    shortDesc: 'Extract select pages from PDF into a new separate document.',
    longDesc: 'Define selective ranges such as "1, 3, 5-8" to extract pages on-the-fly using pdf-lib copyPages functionality.',
    path: '/extract-pages',
    icon: 'FilePlus',
    color: 'from-sky-500 to-indigo-600',
    seoTitle: 'Extract Pages from PDF - Select page range',
    seoDesc: 'Isolate pages of a PDF into a custom standalone PDF document instantly. Entirely local browser compilation.',
    faqs: [{ question: 'How do I specify pages?', answer: 'Upload a PDF and enter range layouts like "2, 4-6, 9" and hit Extract.' }]
  },
  {
    id: 'delete-pages',
    name: 'Delete Pages',
    shortDesc: 'Remove unwanted pages or headers from your PDF file.',
    longDesc: 'Render page thumbnails in-browser, select checkboxes on pages you wish to delete, and generate a new PDF omitting those pages.',
    path: '/delete-pages',
    icon: 'Trash2',
    color: 'from-red-500 to-rose-600',
    seoTitle: 'Delete Pages from PDF Online - Free PDF editor',
    seoDesc: 'Select specific pages to remove from your PDF and save the result as a new file instantly on your browser.',
    faqs: [{ question: 'Can I view the page thumbnail?', answer: 'Yes! PDFJS renders visual previews to guide your selections.' }]
  },
  {
    id: 'rearrange-pdf',
    name: 'Rearrange PDF',
    shortDesc: 'Change the slide order of your PDF document pages.',
    longDesc: 'Preview page thumbnails and reorder pages easily with fully responsive adjustment arrows to alter the sequential page structures.',
    path: '/rearrange-pdf',
    icon: 'Move',
    color: 'from-amber-600 to-orange-500',
    seoTitle: 'Rearrange PDF Pages - Reorder files offline',
    seoDesc: 'Drag, click, and reorder PDF pages instantly in-browser. Zero server overhead and complete privacy.',
    faqs: [{ question: 'Our app supports reordering?', answer: 'Yes! Responsive action selectors allow sorting from desktop or mobile devices.' }]
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    shortDesc: 'Rotate individual pages or all pages of a PDF.',
    longDesc: 'Rotate PDF pages individually by 90° clockwise, 90° counterclockwise, or 180° flips, or rotate all pages at once.',
    path: '/rotate-pdf',
    icon: 'RotateCw',
    color: 'from-blue-500 to-teal-500',
    seoTitle: 'Rotate PDF Pages Free Online - Simple Orientation Fix',
    seoDesc: 'Fix portrait or landscape alignments inside your PDF. Rotate pages easily and download the compiled file.',
    faqs: [{ question: 'Can I rotate just one page?', answer: 'Yes, each thumbnail frame features separate left and right rotation controls.' }]
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    shortDesc: 'Crop layout margins or borders from your PDF pages.',
    longDesc: 'Specify layout dimensions or define precise margin values to crop pages uniformly or target individual sheet layers.',
    path: '/crop-pdf',
    icon: 'Crop',
    color: 'from-purple-500 to-indigo-650',
    seoTitle: 'Crop PDF Page Margins - Trim PDF Documents',
    seoDesc: 'Trim margins and redundant paper fields inside your PDF frames. Clean, secure browser processing.',
    faqs: [{ question: 'Can I crop all pages at once?', answer: 'Yes, an option checkbox lets you apply uniform crop coordinates to all pages.' }]
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    shortDesc: 'Add uniform page numbers to headers or footers in PDF.',
    longDesc: 'Customize page number layouts. Choose fonts, sizes, text format (e.g., "Page X of Y"), exact locations, and page indexes to start numbering.',
    path: '/add-page-numbers',
    icon: 'Hash',
    color: 'from-teal-500 to-emerald-600',
    seoTitle: 'Add Page Numbers to PDF Free - Footer Stamp Online',
    seoDesc: 'Stamp page count integers into custom locations (Top Left, Bottom Right, etc.) in your PDF files.',
    faqs: [{ question: 'Is the page count updated automatically?', answer: 'Yes, standard format templates dynamically calculate total counts.' }]
  },
  {
    id: 'duplicate-pages',
    name: 'Duplicate Pages',
    shortDesc: 'Copy individual PDF pages multiple times.',
    longDesc: 'Target a page number (e.g. page 1, 3) and specify the duplicate factor to copy page nodes into sequential lists.',
    path: '/duplicate-pages',
    icon: 'Copy',
    color: 'from-indigo-600 to-fuchsia-600',
    seoTitle: 'Duplicate PDF Pages - Copy sheets in browser',
    seoDesc: 'Repeat pages inside a PDF files directly on your computer.',
    faqs: [{ question: 'How is duplication configured?', answer: 'Enter target pages separated by commas alongside repetition rates.' }]
  },
  {
    id: 'combine-files',
    name: 'Combine Files',
    shortDesc: 'Combine PDFs and multiple image formats into a single PDF.',
    longDesc: 'Upload a mixture of PDF, PNG, JPG, and WEBP files, arrange the unified list order, and compile them into a cohesive PDF format.',
    path: '/combine-files',
    icon: 'Combine',
    color: 'from-violet-600 to-pink-650',
    seoTitle: 'Combine Files Online - PDF & image merger',
    seoDesc: 'Unify custom images and sheets into one single PDF format.',
    faqs: [{ question: 'Can I upload files simultaneously?', answer: 'Yes, you can drop images and PDFs together onto the asset area.' }]
  },

  // CATEGORY 3: OPTIMIZE PDF
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    shortDesc: 'Reduce your PDF file size without losing essential quality.',
    longDesc: 'Select from multiple compression configurations to shrink graphics and eliminate redundant resources instantly.',
    path: '/compress-pdf',
    icon: 'Minimize2',
    color: 'from-emerald-500 to-emerald-700',
    seoTitle: 'Compress PDF Online - Reduce PDF File Size',
    seoDesc: 'Easily shrink the size of your PDFs in your browser without sacrificing premium visual quality.',
    faqs: [{ question: 'Will my text stay sharp?', answer: 'Yes! Vector graphics and text nodes remain completely selectable and clear.' }]
  },
  {
    id: 'resize-pdf',
    name: 'Resize PDF',
    shortDesc: 'Change printable page sizes of your PDF file.',
    longDesc: 'Re-scale PDF pages to standard dimensions (A4, A3, letter, Legal, Custom) and adjust orientation constraints.',
    path: '/resize-pdf',
    icon: 'Expand',
    color: 'from-blue-500 to-cyan-500',
    seoTitle: 'Resize PDF Pages - Change Paper Sizes Offline',
    seoDesc: 'Scale layouts of your PDF pages to standard sizes inside your browser.',
    faqs: [{ question: 'Is scaling uniform?', answer: 'An fit-to-page content option expands or fits graphics to match parameters.' }]
  },
  {
    id: 'reduce-pdf-size',
    name: 'Reduce PDF Size',
    shortDesc: 'Re-compress heavy image layers in PDFs to shrink files.',
    longDesc: 'Select optimization qualities (Basic 60%, Standard 40%, Maximum 20%) to downsample and compress image graphics in PDFs.',
    path: '/reduce-pdf-size',
    icon: 'Minimize2',
    color: 'from-rose-500 to-red-600',
    seoTitle: 'Reduce PDF Dimensions - Image Optimizer',
    seoDesc: 'Interprets embedded PDF backgrounds to downscale canvas representations and save space local.',
    faqs: [{ question: 'What is maximum rate?', answer: 'Maximum reduces size significantly by encoding visuals down to 20% quality.' }]
  },
  {
    id: 'optimize-web',
    name: 'Optimize for Web',
    shortDesc: 'Linearize and clean up PDF streams for fast web loading.',
    longDesc: 'Optimize PDF structure blocks, discard unused redundant metadata headers, and annotations lists for faster frame rendering on the web.',
    path: '/optimize-web',
    icon: 'Globe',
    color: 'from-cyan-600 to-blue-700',
    seoTitle: 'Optimize PDF for Web - Fast Web View Linearize',
    seoDesc: 'Re-organize structural bytes to enable fast, progressive page rendering in browsers.',
    faqs: [{ question: 'What is web optimization?', answer: 'It reorganizes internal stream blocks to allow browsers to display page 1 before reading other file bytes.' }]
  },
  {
    id: 'grayscale-pdf',
    name: 'Grayscale PDF',
    shortDesc: 'Convert all colors in PDF to monochromatic black & white.',
    longDesc: 'Rewrite background graphics and pixel buffers into clean grayscale values (using luminance math equations) for toner-saving print jobs.',
    path: '/grayscale-pdf',
    icon: 'Sliders',
    color: 'from-slate-600 to-gray-700',
    seoTitle: 'Convert PDF to Grayscale - Black and White Printer Fix',
    seoDesc: 'Strip colors from your PDF assets locally on your device.',
    faqs: [{ question: 'Does this save printer ink?', answer: 'Absolutely! Grayscale conversions replace cyan, magenta, yellow with black grids.' }]
  },
  {
    id: 'flatten-pdf',
    name: 'Flatten PDF',
    shortDesc: 'Flatten form inputs, annotations, or graphic layers.',
    longDesc: 'Render interactive forms and stamps directly to permanent pixels, locking content and preventing edit compromises.',
    path: '/flatten-pdf',
    icon: 'Layers',
    color: 'from-sky-700 to-blue-600',
    seoTitle: 'Flatten PDF Forms and Annotations Free - local merge',
    seoDesc: 'Lock form field text strings, stamps and comments layers to avoid layout alterations.',
    faqs: [{ question: 'Are forms editable after?', answer: 'No, flattening merges text entries into permanent vector path layers.' }]
  },

  // CATEGORY 4: EDIT PDF
  {
    id: 'add-text',
    name: 'Add Text',
    shortDesc: 'Add text strings or custom notes onto PDF pages.',
    longDesc: 'Upload a PDF, load an interactive canvas editor, choose font parameters and point to insert text entries.',
    path: '/add-text',
    icon: 'Type',
    color: 'from-sky-550 to-blue-600',
    seoTitle: 'Add Text to PDF Online Free - Direct document annotator',
    seoDesc: 'Add texts overlays to PDF layers. Align, recolor and set custom font dimensions safely.',
    faqs: [{ question: 'Is text adjustable?', answer: 'Yes, configure font family, sizing, and picker colors on the boards.' }]
  },
  {
    id: 'add-images',
    name: 'Add Images',
    shortDesc: 'Overlay images, graphics, or logos on PDF sheets.',
    longDesc: 'Place png, jpeg illustrations directly on existing PDF page frames. Resize handles let you translate and position layers.',
    path: '/add-images',
    icon: 'Image',
    color: 'from-purple-600 to-pink-600',
    seoTitle: 'Add Image to PDF Online - Photo Layer Overlay',
    seoDesc: 'Upload photos, resize, and place them on top of your client PDF layouts.',
    faqs: [{ question: 'Can I upload transparencies?', answer: 'Yes, PNG files maintain transparent properties when layered.' }]
  },
  {
    id: 'draw-on-pdf',
    name: 'Draw on PDF',
    shortDesc: 'Draw freehand or sketch on PDF pages.',
    longDesc: 'Use pencil and brush canvas elements directly to markup documents. Customize colors, sliders widths, and apply highlights.',
    path: '/draw-on-pdf',
    icon: 'PenTool',
    color: 'from-emerald-500 to-blue-500',
    seoTitle: 'Freehand Sketch and Draw on PDF Online Free',
    seoDesc: 'Add custom pen markings, drawings, and circles on your papers without print-outs.',
    faqs: [{ question: 'Is mobile drawing supported?', answer: 'Yes! Touch pointer listeners recognize screen grids seamlessly.' }]
  },
  {
    id: 'highlight-pdf',
    name: 'Highlight PDF',
    shortDesc: 'Highlight text structures and sections in PDF.',
    longDesc: 'Overlay semi-transparent highlight rectangles (color: yellow, green, pink, etc.) over key layout sentences.',
    path: '/highlight-pdf',
    icon: 'Highlighter',
    color: 'from-yellow-400 to-amber-500',
    seoTitle: 'Highlight Text inside PDF - PDF Marker Online',
    seoDesc: 'Mark key phrases inside your documents. Fully client-side highlighting layers.',
    faqs: [{ question: 'Can I customize colors?', answer: 'Choose from five classic high-contrast highlighter presets.' }]
  },
  {
    id: 'annotate-pdf',
    name: 'Annotate PDF',
    shortDesc: 'Add comments, shapes, text, and pens to PDF files.',
    longDesc: 'Full design board suite compiling stamps, comments, arrows, shapes, highlighters, and pencils directly onto page templates.',
    path: '/annotate-pdf',
    icon: 'Edit3',
    color: 'from-indigo-500 to-purple-600',
    seoTitle: 'Pristine PDF Annotation Suite - Local Markups',
    seoDesc: 'All editing features in one neat control bar.',
    faqs: [{ question: 'Where are annotations saved?', answer: 'We compile shapes and lines straight into the final byte array outputs.' }]
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark PDF',
    shortDesc: 'Add text or logo watermarks to your PDF pages.',
    longDesc: 'Stamp repeating watermark words or high-resolution logos. Control slant, transparent density levels, and page constraints.',
    path: '/watermark-pdf',
    icon: 'FileText',
    color: 'from-gray-500 to-stone-600',
    seoTitle: 'Watermark PDF Online - Secure Stamp Protection',
    seoDesc: 'Stamp diagonal texts warnings or logos over PDF layouts to avoid replication abuses.',
    faqs: [{ question: 'Can I apply watermarks to all pages?', answer: 'Yes, the stamp applies uniformly to all pages by default.' }]
  },
  {
    id: 'fill-pdf-forms',
    name: 'Fill PDF Forms',
    shortDesc: 'Fill out interactive form fields in your PDF.',
    longDesc: 'Locate form field coordinates and render active forms input boxes over pages, saving finished string datasets to final documents.',
    path: '/fill-pdf-forms',
    icon: 'CheckSquare',
    color: 'from-teal-500 to-blue-600',
    seoTitle: 'Fill PDF Forms Free Online - Form filler',
    seoDesc: 'Type text inside form placeholders and download a polished copy offline.',
    faqs: [{ question: 'Does it support checkboxes?', answer: 'Yes, interactive checkboxes and text elements are fully supported.' }]
  },
  {
    id: 'add-shapes',
    name: 'Add Shapes',
    shortDesc: 'Add rectangles, circles, lines, or arrows onto PDF.',
    longDesc: 'Overlay geometric designs to draft highlights or point features. Customize path widths and fill properties.',
    path: '/add-shapes',
    icon: 'Square',
    color: 'from-sky-600 to-cyan-550',
    seoTitle: 'Draw Shapes on PDF - Circle, Square, Lines',
    seoDesc: 'Map professional vector lines, arrows, rectangles directly over layout sheets.',
    faqs: [{ question: 'Can I scale shapes?', answer: 'Drag active corner anchor nodes of any placed shape to resize them.' }]
  },
  {
    id: 'add-signature',
    name: 'Add Signature',
    shortDesc: 'Place or draw custom signatures onto PDF.',
    longDesc: 'Draw dynamic signatures, type script cursives, or load images, arranging the output cleanly over any page margins.',
    path: '/add-signature',
    icon: 'Edit',
    color: 'from-indigo-600 to-indigo-800',
    seoTitle: 'Add Signature to PDF Online Free - Local signing',
    seoDesc: 'Sign invoice agreements or contracts. Fully private, browser-based draw board overlays.',
    faqs: [{ question: 'Is my drawn signature kept?', answer: 'No, signatures exist purely during active browser memory frames.' }]
  },

  // CATEGORY 5: SECURITY
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    shortDesc: 'Secure PDF with passwords and custom user boundaries.',
    longDesc: 'Encrypt documents, limit copying constraints, and lock print parameters on PDF structures using encryption algorithms.',
    path: '/protect-pdf',
    icon: 'Lock',
    color: 'from-blue-600 to-indigo-700',
    seoTitle: 'Protect PDF Online - Passwords & Restrictions Encryption',
    seoDesc: 'Add owner passwords and secure encryption standards to restrict malicious reads.',
    faqs: [{ question: 'What is Owner Password?', answer: 'Owner passwords restrict access to editing, copying metadata, and printing actions.' }]
  },
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    shortDesc: 'Remove password restrictions from locked PDFs.',
    longDesc: 'Simply enter the correct password to strip any printing restrictions or editing locks, saving a copy that opens without prompt.',
    path: '/unlock-pdf',
    icon: 'Unlock',
    color: 'from-fuchsia-500 to-pink-600',
    seoTitle: 'Unlock PDF - Remove Password Security',
    seoDesc: 'Instantly remove security passwords and restrictions from your PDF file. Fully client-side decryption preserves original file metadata.',
    faqs: [{ question: 'Do I need to know the password to unlock a PDF?', answer: 'Yes, you must input the correct password to decrypt and unlock the file structure.' }]
  },
  {
    id: 'remove-password',
    name: 'Remove Password',
    shortDesc: 'Remove user password protection from PDF documents.',
    longDesc: 'Alias utility designed to quickly decrypt user passwords and output un-protected page vectors.',
    path: '/remove-password',
    icon: 'Unlock',
    color: 'from-rose-500 to-fuchsia-600',
    seoTitle: 'Remove PDF Protection Password Online',
    seoDesc: 'Unprotect files and discard login popups. Runs 100% locally.',
    faqs: [{ question: 'Is my password safe?', answer: 'Everything executes inside local variables; passwords never traverse external nets.' }]
  },
  {
    id: 'encrypt-pdf',
    name: 'Encrypt PDF',
    shortDesc: 'Encrypt PDF archives with strong password algorithms.',
    longDesc: 'Generate strong user passwords and encrypt file indexes, preventing leaks on files.',
    path: '/encrypt-pdf',
    icon: 'ShieldAlert',
    color: 'from-indigo-700 to-blue-800',
    seoTitle: 'Strong PDF Encryption - Cryptography online',
    seoDesc: 'Encrypt text nodes and structures in your PDF with high-quality password hashes.',
    faqs: [{ question: 'Is there password generation?', answer: 'Yes, an integrated button creates secure random password sets.' }]
  },
  {
    id: 'decrypt-pdf',
    name: 'Decrypt PDF',
    shortDesc: 'Decrypt protected PDFs using standard user parameters.',
    longDesc: 'Provide keys to decrypt objects and export public PDF documents.',
    path: '/decrypt-pdf',
    icon: 'Key',
    color: 'from-pink-500 to-purple-600',
    seoTitle: 'Decrypt PDF Documents Free Online',
    seoDesc: 'Perform mathematical decryption routines locally on locked structures.',
    faqs: [{ question: 'Why choose our decryptor?', answer: 'All computations happen inside client CPU registers.' }]
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    shortDesc: 'Permanently blackout sensitive information in PDF.',
    longDesc: 'Draw black blocks over text strings, metadata databases or images to scrub secrets permanently.',
    path: '/redact-pdf',
    icon: 'EyeOff',
    color: 'from-rose-600 to-red-600',
    seoTitle: 'Redact PDF Content - Blackout Text Free',
    seoDesc: 'Permanently remove sensitive info. No trace of redacted vectors is left in output files.',
    faqs: [{ question: 'Is redaction reversible?', answer: 'No, we flatten black rectangles and wipe covered paragraphs permanently.' }]
  },
  {
    id: 'esign-pdf',
    name: 'eSign PDF',
    shortDesc: 'Add formal, verified electronic signatures to PDF.',
    longDesc: 'Configure date/time fields, signature indicators, user confirmation markers, and generate cleanly stamped documents.',
    path: '/esign-pdf',
    icon: 'CheckSquare',
    color: 'from-teal-600 to-emerald-700',
    seoTitle: 'eSign PDF Documents Free Online - Secure digital signature',
    seoDesc: 'Electronically sign contracts and agreement sheets locally.',
    faqs: [{ question: 'Is it legally compliant?', answer: 'Provides high-quality physical stamps and audit timestamps.' }]
  },
  {
    id: 'verify-signature',
    name: 'Verify Signature',
    shortDesc: 'Check signature stamps and metadata certifications.',
    longDesc: 'Scan internal PDF parameters, detect validation dictionaries, and display certificates details.',
    path: '/verify-signature',
    icon: 'ShieldCheck',
    color: 'from-emerald-600 to-blue-600',
    seoTitle: 'Verify PDF Electronic Signatures - Cert checker',
    seoDesc: 'Validate validation layers of signed documents with immediate results.',
    faqs: [{ question: 'Can it check image signatures?', answer: 'Detects structural signature dictionaries and digital stamp structures.' }]
  },

  // CATEGORY 6: AI PDF TOOLS
  {
    id: 'ai-summarizer',
    name: 'AI PDF Summarizer',
    shortDesc: 'Summarize PDF texts in detailed bullet points.',
    longDesc: 'Extract all texts and use Gemini Flash to write brief, standard, or detailed bulleted summaries.',
    path: '/ai-summarizer',
    icon: 'Brain',
    color: 'from-purple-500 to-violet-700',
    seoTitle: 'AI PDF Summarizer - Instant Document Summarizer',
    seoDesc: 'Condense long papers into key takeaways using Gemini 1.5/2.5. Requires client-stored API key.',
    faqs: [{ question: 'Where is my API Key saved?', answer: 'Saved in LocalStorage and only called directly to Google endpoints.' }]
  },
  {
    id: 'chat-with-pdf',
    name: 'Chat with PDF',
    shortDesc: 'Chat directly with your PDF and ask questions.',
    longDesc: 'Upload a PDF, extract all text details, and open a beautiful messaging thread querying Gemini.',
    path: '/chat-with-pdf',
    icon: 'MessageSquareText',
    color: 'from-violet-500 to-pink-500',
    seoTitle: 'Chat with PDF AI - Interactive Document Q&A',
    seoDesc: 'Ask questions, retrieve clauses, or simplify text inside any scanned PDF with AI.',
    faqs: [{ question: 'How much text can it understand?', answer: 'We pass the parsed texts as context alongside your messages to Gemini.' }]
  },
  {
    id: 'pdf-translator',
    name: 'PDF Translator',
    shortDesc: 'Translate PDF layouts into multiple world languages.',
    longDesc: 'Convert extracted text structures to Bengali, French, German, Spanish, Arabic, or French in a neat side-by-side view.',
    path: '/pdf-translator',
    icon: 'Languages',
    color: 'from-blue-600 to-pink-600',
    seoTitle: 'AI PDF Translator - Multilingual Document Converter',
    seoDesc: 'Translate scripts inside any PDF documents instantly.',
    faqs: [{ question: 'Does it rewrite the PDF file?', answer: 'Outputs clean translated plain text layout ready for easy download.' }]
  },
  {
    id: 'ai-ocr',
    name: 'AI OCR Reader',
    shortDesc: 'Read scanned PDF layouts or screenshot images using AI.',
    longDesc: 'Upload images, convert PDF pages to bitmap data, and query Gemini Vision API to convert and extract text.',
    path: '/ai-ocr',
    icon: 'Eye',
    color: 'from-purple-600 to-rose-600',
    seoTitle: 'AI PDF OCR Reader - Handwritings and Image Scan',
    seoDesc: 'Ditch basic OCR tools. Feed visual sheets to Gemini for highly accurate transcription.',
    faqs: [{ question: 'Can it read messy letters?', answer: 'Yes, modern neural models translate handwriting and tilted text blocks with remarkable accuracy.' }]
  },
  {
    id: 'ai-notes',
    name: 'AI Notes Extractor',
    shortDesc: 'Extract vital bullet points and action tracks from PDF.',
    longDesc: 'Scan body content, extract tasks lists, project deadlines, meeting notes, and action plans with bullet lists.',
    path: '/ai-notes',
    icon: 'ClipboardList',
    color: 'from-indigo-600 to-blue-700',
    seoTitle: 'AI PDF Notes Extractor - Action Items Summarizer',
    seoDesc: 'Quickly digest meeting files or textbooks into organized checklists.',
    faqs: [{ question: 'Can I export notes?', answer: 'Yes, copy to clipboard or download as .txt elements.' }]
  },
  {
    id: 'ai-questions',
    name: 'AI Question Generator',
    shortDesc: 'Produce test quizzes and questions datasets from PDF.',
    longDesc: 'Generate custom questions (MCQs, short query patterns, Fill in blanks) from textbooks text using AI.',
    path: '/ai-questions',
    icon: 'HelpCircle',
    color: 'from-cyan-600 to-indigo-650',
    seoTitle: 'AI PDF Question Generator - Quiz Maker',
    seoDesc: 'Create exams or study prep worksheets from lecture syllabus documents.',
    faqs: [{ question: 'Can I specify question amounts?', answer: 'Generate assemblies of 5, 10, 15, or 20 questions in one click.' }]
  },
  {
    id: 'ai-flashcards',
    name: 'AI Flashcard Maker',
    shortDesc: 'Convert textbooks and files into animated Q&A study cards.',
    longDesc: 'Create study flashcards from textbook paragraphs. Interactive CSS 3D flipping card layout displays questions and answers.',
    path: '/ai-flashcards',
    icon: 'Layers',
    color: 'from-fuchsia-600 to-rose-600',
    seoTitle: 'AI Interactive Flashcard Maker from PDF',
    seoDesc: 'Input course PDF material and generate flipping flashcards with CSS transitions.',
    faqs: [{ question: 'Do the cards flip?', answer: 'Yes! Tap any card to rotate and view the answer with animations.' }]
  },
  {
    id: 'ai-resume',
    name: 'AI Resume Parser',
    shortDesc: 'Extract structured credentials, education, and roles from raw CV PDF.',
    longDesc: 'Query Gemini schema outputs to organize contact indicators, certifications list, and skills into structured JSON files.',
    path: '/ai-resume',
    icon: 'UserCheck',
    color: 'from-blue-600 to-emerald-500',
    seoTitle: 'AI Resume Parser - Extract JSON profile CVs',
    seoDesc: 'Convert resume text arrays into JSON schemas or standard lists.',
    faqs: [{ question: 'Does it support scanned CV layouts?', answer: 'AI parses unstructured text blocks into clean JSON templates.' }]
  },
  {
    id: 'ai-contract',
    name: 'AI Contract Analyzer',
    shortDesc: 'Examine clauses, payment criteria, flags, or risks inside contracts.',
    longDesc: 'Identify contracting parties, deliverables deadlines, financial sections, and highlight risky clauses or warning red flags.',
    path: '/ai-contract',
    icon: 'ShieldAlert',
    color: 'from-rose-600 to-indigo-700',
    seoTitle: 'AI PDF Contract Analyzer - Legal Clause Scanner',
    seoDesc: 'Highlight deadlines, terms limits, and risky paragraphs in agreements with color coded lists.',
    faqs: [{ question: 'Is it legal advice?', answer: 'Designed for analytical highlights. Users should consult legal practitioners.' }]
  },
  {
    id: 'ai-invoice',
    name: 'AI Invoice Reader',
    shortDesc: 'Extract quantities, prices, subtotals, and vendor details to clean tables.',
    longDesc: 'Read invoice PDFs or snapshots, isolate tax rows, item descriptions, and display outputs inside structured grids.',
    path: '/ai-invoice',
    icon: 'Receipt',
    color: 'from-emerald-600 to-cyan-600',
    seoTitle: 'Extract Invoice Details with AI - Automated Reader',
    seoDesc: 'Avoid manual entries. Parse vendor billing documents straight into structured tables.',
    faqs: [{ question: 'Can I download data?', answer: 'Yes, download the parsed tables directly as CSV formats.' }]
  },

  // CATEGORY 7: OCR & SCANNER
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    shortDesc: 'Extract text from scanned, non-selectable PDF sheets.',
    longDesc: 'Render page matrices to high contrast bit images and parse structures using Tesseract.js directly inside your browser.',
    path: '/ocr-pdf',
    icon: 'Scan',
    color: 'from-blue-600 to-emerald-600',
    seoTitle: 'Convert Scanned PDF to Selectable Text - Local OCR',
    seoDesc: 'Run high-quality optical character recognition on scans. No upload necessary, support of standard languages.',
    faqs: [{ question: 'Which languages does it support?', answer: 'English, Bengali, Spanish, Hindi, French are fully processed.' }]
  },
  {
    id: 'image-to-text',
    name: 'Image to Text',
    shortDesc: 'Convert JPG, PNG, WEBP snapshots to editable TXT.',
    longDesc: 'Upload multiple page photos and execute local OCR transcription inside the client browser. No backend streams required.',
    path: '/image-to-text',
    icon: 'FileText',
    color: 'from-cyan-500 to-blue-550',
    seoTitle: 'Batch Image to Text OCR Free - Photo reader',
    seoDesc: 'Extract words from images offline on your computer.',
    faqs: [{ question: 'Is handwritten text supported?', answer: 'Excellent for clean print blocks. Neat handwriting may also process.' }]
  },
  {
    id: 'scan-to-pdf',
    name: 'Scan to PDF',
    shortDesc: 'Convert document photos into high contrast scanned PDFs.',
    longDesc: 'Process document captures with pixel sharpening layers, increase black margins contrast to flatten shadows, and export a clean PDF.',
    path: '/scan-to-pdf',
    icon: 'FileLock',
    color: 'from-indigo-600 to-teal-600',
    seoTitle: 'Scan to PDF - Turn Photos into Crisp Documents',
    seoDesc: 'Adjust contrast benchmarks on document photos to simulate flat PDF scanner scans.',
    faqs: [{ question: 'What does sharpening do?', answer: 'Adjusts threshold pixels to isolate dark ink structures from background paper shadows.' }]
  },
  {
    id: 'handwriting-to-text',
    name: 'Handwriting to Text',
    shortDesc: 'OCR and read handwritten notes from photos.',
    longDesc: 'Enhance handwriting image structures with contrast boost filters and run optical character recognition layers.',
    path: '/handwriting-to-text',
    icon: 'PenTool',
    color: 'from-amber-600 to-rose-600',
    seoTitle: 'Handwriting to Text OCR Converter Online',
    seoDesc: 'Convert written notes snapshots into editable text logs.',
    faqs: [{ question: 'How is handwritten text recognized?', answer: 'Undergoes pixel binarization filters before being parsed in OCR pipelines.' }]
  },
  {
    id: 'screenshot-to-text',
    name: 'Screenshot to Text',
    shortDesc: 'Paste an image directly to extract text.',
    longDesc: 'Hit Ctrl+V on the active boards area to instantly grab clipboard images, pre-process textures, and transcribe text layers.',
    path: '/screenshot-to-text',
    icon: 'Image',
    color: 'from-rose-500 to-indigo-600',
    seoTitle: 'Screenshot to Text - Direct Copy Paste OCR Reader',
    seoDesc: 'Instantly paste coordinates prints or snips to transcribe copyable paragraphs online.',
    faqs: [{ question: 'Can I copy directly?', answer: 'Yes, a clipboard button copies all transcribed results in one keypress.' }]
  },
  {
    id: 'extract-tables',
    name: 'Extract Tables from PDF',
    shortDesc: 'Extract structured grids from vector pages to CSV files.',
    longDesc: 'Map layout cells based on spacing and x-y coordinates layers, rendering parsed records into structured table views.',
    path: '/extract-tables',
    icon: 'Table2',
    color: 'from-emerald-500 to-blue-650',
    seoTitle: 'Extract PDF Tables to Spreadsheet CSV formats',
    seoDesc: 'Ditch manual typing. Scrape and map tables coordinate maps.',
    faqs: [{ question: 'How is tabular content saved?', answer: 'Outputs plain layout tables with standard comma-separated columns (.csv).' }]
  },
  {
    id: 'searchable-pdf',
    name: 'Searchable PDF Maker',
    shortDesc: 'Create selectable, searchable layers on scanned PDFs.',
    longDesc: 'Run Tesseract OCR on page images and append invisible text coordinates precisely behind bitmap structures.',
    path: '/searchable-pdf',
    icon: 'Award',
    color: 'from-violet-600 to-teal-555',
    seoTitle: 'Make PDF Searchable - Local invisible text overlay',
    seoDesc: 'Overlays a selectable text layer on top of scanned pages, making standard searches work again.',
    faqs: [{ question: 'What is a searchable PDF?', answer: 'A PDF that holds both image pixels and searchable characters coordinates underneath.' }]
  }
];
