import React from 'react';
import { 
  Sparkles, ShieldCheck, Zap, Lock, Eye, Brain, BookOpen, Users, CheckCircle, FileText, Layers, Key
} from 'lucide-react';
import { SEO } from '../components/ui/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="font-sans py-8 max-w-5xl mx-auto leading-relaxed">
      <SEO 
        title="সম্পূর্ণ বিস্তারিত ডক্যুমেন্টারি ও ওভারভিউ - PDFMaster" 
        description="PDFMaster এর সকল টুলস, ব্যবহারের অসাধারণ সুবিধা, কাদের জন্য এটি এবং যাবতীয় তথ্যাবলীর একটি পুঙ্খানুপুঙ্খ বিবরণী।"
        path="/about"
      />

      {/* Header Panel */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-450 border border-blue-100/10 text-xs font-black">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>১০০% ক্লায়েন্ট-সাইড অফলাইন ডক্যুমেন্টারি স্যুট</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight pb-2">
          PDFMaster এর বিস্তারিত ওভারভিউ ও ব্যবহার নির্দেশিকা
        </h1>
        <p className="text-sm sm:text-base text-gray-550 dark:text-gray-400 max-w-3xl mx-auto font-medium">
          আপনার ফাইলগুলোর ১০০% প্রাইভেসী বজায় রেখে ব্রাউজারেই সরাসরি লোকাল মেমরিতে প্রসেস করার আধুনিকতম অল-ইন-ওয়ান পিডিএফ প্ল্যাটফর্ম।
        </p>
      </div>

      {/* Section 1: Core Architecture Docs */}
      <section className="mb-14 space-y-6">
        <div className="border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-900 pb-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            PDFMaster কী এবং কিভাবে এটি কাজ করে?
          </h2>
          <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed font-semibold">
            সাধারণত অধিকাংশ অনলাইন পিডিএফ কনভার্টার আপনার ফাইলগুলোকে তাদের রিমোট ক্লাউড সার্ভারে আপলোড করে প্রসেস করে। এটি আপনার অতি সংবেদনশীল ফাইল যেমন—ব্যক্তিগত পরিচয়পত্র, আর্থিক বিবরণী বা কর্পোরেট ডকুমেন্টের ক্ষেত্রে চরম তথ্য ফাঁসের ঝুঁকি তৈরি করে।
          </p>
          <p className="text-xs sm:text-sm text-gray-650 dark:text-gray-300 leading-relaxed font-semibold">
            <strong className="text-blue-600 dark:text-blue-400">PDFMaster</strong> এই সমস্যার একটি চূড়ান্ত নিরাপদ সমাধান। আমাদের প্ল্যাটফর্মটি সম্পূর্ণরূপে <strong className="text-emerald-600 dark:text-emerald-450">WebAssembly (WASM)</strong> এবং <strong className="text-blue-600">Pure Local Browser Memory</strong> কম্পাইলার প্রযুক্তি ব্যবহার করে তৈরি। যখন আপনি কোনো ফাইল আপলোড করেন, ফাইলটি ইন্টারনেটের মাধ্যমে কোনো সার্ভারে যায় না; বরং আপনার ডিভাইসের RAM এবং CPU-এর ভেতরেই সরাসরি ফাইলটি প্রসেস হয়ে রূপান্তরিত হয়। আপনি চাইলে ইন্টারনেট বন্ধ করেও অফলাইনে এই সার্ভিসটি নিরবচ্ছিন্নভাবে ব্যবহার করতে পারবেন।
          </p>
        </div>
      </section>

      {/* Section 2: Core Areas & Tool Breakdown */}
      <section className="mb-14 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-600" />
          ওয়েবসাইটের ভিতরে কি কি আছে? (৫৬+ শক্তিশালী বৈশিষ্ট্য ও টুলস)
        </h2>
        
        <p className="text-xs sm:text-sm text-gray-550 dark:text-gray-400 font-semibold mb-6">
          PDFMaster অত্যন্ত সুসজ্জিতভাবে সাজানো ৫৬টিরও বেশি অ্যাডভান্সড পিডিএফ মেমরি টুল নিয়ে গঠিত, যা নিচের ক্যাটাগরিগুলোতে বিভক্ত:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tool card 1 */}
          <div className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-sm uppercase tracking-wide">
              <span>🔄 PDF রূপান্তরকারী (Conversions)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              যেকোনো ডকুমেন্ট ফরম্যাট থেকে পিডিএফে অথবা পিডিএফ থেকে অন্য ফরম্যাটে মাত্র কয়েক সেকেন্ডে চমৎকার স্পীডে রূপান্তর করুন:
            </p>
            <ul className="list-disc pl-5 text-[11px] font-bold text-gray-600 dark:text-gray-400 space-y-1">
              <li>PDF to Word (.docx), Excel (.xlsx / .csv), Presentation (.pptx).</li>
              <li>PDF to Images (JPG, PNG frames), EPUB (e-Book), HTML Web Page.</li>
              <li>যেকোনো ছবি বা টেক্সট ফাইলকে একক বা সাজানো পিডিএফে রূপান্তর (JPG/PNG to PDF, TXT to PDF).</li>
            </ul>
          </div>

          {/* Tool card 2 */}
          <div className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm uppercase tracking-wide">
              <span>🛠️ পিডিএফ অর্গানাইজার (Organize Panels)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              পিডিএফ ডকুমেন্টের লেআউট ও পৃষ্ঠাগুলোকে নিজের মতো করে সেকেন্ডের মধ্যে পরিচালনা ও ডেকোরেশন করুন:
            </p>
            <ul className="list-disc pl-5 text-[11px] font-bold text-gray-600 dark:text-gray-400 space-y-1">
              <li>একাধিক পিডিএফ ফাইলকে একটি ফাইলে মার্জ (Merge) করা।</li>
              <li>পিডিএফ থেকে নির্দিষ্ট কিছু পেজ আলাদা করা বা পেজ রেঞ্জ স্প্লিট (Split) করা।</li>
              <li>অপ্রয়োজনীয় পেজ ডিলিট করা, পেজের ক্রম পরিবর্তন (Rearrange) এবং নতুন পেজ ডুপ্লিকেট করা।</li>
              <li>পেজ আবর্তন করা (Rotate) এবং অতিরিক্ত মার্জিন ক্রপ (Crop) করে সাজানো।</li>
            </ul>
          </div>

          {/* Tool card 3 */}
          <div className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-extrabold text-sm uppercase tracking-wide">
              <span>⚡ অপটিমাইজেশন স্যুট (Optimization Utilities)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              ডকুমেন্টের ভেতরের মেটাডেটা অপটিমাইজ করে ফাইল সাইজ হ্রাস করুন যেন সহজে ইমেইলে বা অনলাইন পোর্টালে আপলোড করা যায়:
            </p>
            <ul className="list-disc pl-5 text-[11px] font-bold text-gray-600 dark:text-gray-400 space-y-1">
              <li>পিডিএফ সাইজ কম্প্রেশন (Compress PDF offline) ডবল স্ট্রীম কম্প্রেশন প্রযুক্তির সাহায্যে।</li>
              <li>পৃষ্ঠার ডাইমেনশন পরিবর্তন (Resize) যেমন—A4, A3, Letter, বা Legal-এ কনফিগার করা।</li>
              <li>কালার পিডিএফকে ব্ল্যাক অ্যান্ড হোয়াইট ফাইলে রূপান্তর (Grayscale filter)।</li>
              <li>পিডিএফ ফর্মের ইন্টারেক্টিভ ভ্যালুগুলোকে ফ্ল্যাটেন (Flatten) করে সিকিউর করা।</li>
            </ul>
          </div>

          {/* Tool card 4 */}
          <div className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-extrabold text-sm uppercase tracking-wide">
              <span>🤖 এআই ও স্মার্ট এডিটিং স্যুট (AI & Visual Edit)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              আপনার পিডিএফের ওপরে যেকোনো এডিটিং কার্যক্রম ও আধুনিক আর্টিফিশিয়াল ইন্টেলিজেন্স ব্যবহার করুন সম্পূর্ণ নিরাপদে:
            </p>
            <ul className="list-disc pl-5 text-[11px] font-bold text-gray-600 dark:text-gray-400 space-y-1">
              <li>ফ্রিহ্যান্ড ক্যানভাস ড্রয়িং, হাইলাইট অ্যানোটেশনস এবং যেকোনো টেক্সট ওভারলে স্ট্যাম্পিং।</li>
              <li>ইলেকট্রনিক সিগনেচার ড্রয়িং বা পেইন্ট করে পেজের যেকোনো অবস্থানে প্লেস করা।</li>
              <li>গোপনীয় ওয়াটারমার্ক (Watermark) এবং ড্রাফট সিগমা ব্যাকগ্রাউন্ড অ্যাপ্লাই।</li>
              <li>লোকাল জেসমিন এআই মডিউলের মাধ্যমে পিডিএফ এর সারসংক্ষেপ তৈরি (AI Summarizer), ডাইরেক্ট চ্যাট বট (Chat with PDF), এবং প্রশ্ন ও উত্তর বা কুইজ জেনারেটর।</li>
            </ul>
          </div>

          {/* Tool card 5 */}
          <div className="p-6 bg-white dark:bg-gray-950 border border-gray-150 dark:border-gray-900 rounded-3xl space-y-3 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-extrabold text-sm uppercase tracking-wide">
              <span>🔒 নিরাপত্তা ও OCR স্ক্যানার (Security & Characters Reader)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed">
              পিডিএফের সর্বোচ্চ প্রাইভেট লেয়ার প্রোটেকশন এবং স্ক্যান করা ইমেজ থেকে টেক্সট এক্সট্রাকশন টেকনোলজি:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc pl-5 text-[11px] font-bold text-gray-600 dark:text-gray-400">
              <li>মালিকানাধীন পাসওয়ার্ড লক দিয়ে পিডিএফ এনক্রিপ্ট ও সীলগালা এবং পূর্বের পাসওয়ার্ড ডিমোভাল (Decrypt)।</li>
              <li>পিডিএফ ফাইলের ভেতরের সংবেদনশীল টেক্সট বা এলাকা কালো করে আড়াল বা ব্ল্যাকআউট করা (Redact PDF)।</li>
              <li>Tesseract OCR প্রযুক্তির সমন্বয়ে হাতে লেখা ডক্যুমেন্ট বা স্ক্রিনশটকে এডিটেবল টেক্সটে কনভার্ট করা।</li>
              <li>সার্টিফিকেট ডিজিটাল সিগনেচার ভ্যালিডিটি স্ট্যাটাস রিয়েল-টাইম ভেরিফাই করা।</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Section 3: Benefits and Advantages of using this site */}
      <section className="mb-14 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          এই সাইট ব্যবহারের অসাধারণ সুবিধাসমূহ
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mb-1" />
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">১০০% ডেটা প্রাইভেসি</h4>
            <p className="text-[10px] sm:text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed font-semibold">
              আপনার ফাইল কখনো কোনো সার্ভারে পৌঁছায় না। ফাইল আপলোড বা ডাউনলোডের জন্য অতিরিক্ত নেটওয়ার্ক ডেটার প্রয়োজন হয় না। আপনি সম্পূর্ণরূপে নিরাপদ ও সুরক্ষিত।
            </p>
          </div>

          <div className="p-6 bg-pink-500/[0.02] border border-pink-500/10 rounded-2xl space-y-2">
            <Zap className="w-8 h-8 text-pink-600 mb-1" />
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">লোকাল মেমরি এক্সিকিউশন</h4>
            <p className="text-[10px] sm:text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed font-semibold">
              ব্রাউজারে রানিং আধুনিক কম্পাইলার ইঞ্জিনগুলোর জন্য ফাইলের মার্জিং, স্প্লিটিং বা কম্প্রেশন অত্যন্ত দ্রুত ও গতিশীল উপায়ে সম্পন্ন হয়। কোনরূপ কিউই ফ্লো বা লোডিংয়ের অপেক্ষা নেই।
            </p>
          </div>

          <div className="p-6 bg-blue-500/[0.02] border border-blue-500/10 rounded-2xl space-y-2">
            <CheckCircle className="w-8 h-8 text-blue-600 mb-1" />
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">আনলিমিটেড ও সম্পূর্ণ ফ্রি</h4>
            <p className="text-[10px] sm:text-[11px] text-gray-550 dark:text-gray-400 leading-relaxed font-semibold">
              ফাইল সাইজের ওপর কোন লুকানো পেওয়াল, সাইন-আপ কার্ড রিকোয়েস্ট বা ব্যবহারের সময়সীমার কোনো বাধ্যবাধকতা নেই। সম্পূর্ণ টুলস্যুট ফ্রিতে আনলিমিটেড অ্যাক্সেস করতে পারবেন।
            </p>
          </div>

        </div>
      </section>

      {/* Section 4: Target Audience / Who is this for? */}
      <section className="mb-14 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-sky-500" />
          উপকারভোগী: কাদের জন্য ও কী কী কাজের ক্ষেত্রে সবচেয়ে বেশি উপকারি?
        </h2>

        <div className="space-y-4">
          
          <div className="flex gap-4 p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-150 dark:border-gray-900">
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl max-h-12 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">১. শিক্ষার্থী ও গবেষকবৃন্দ (Students & Academics)</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                অনলাইন অ্যাসাইনমেন্ট বা থিসিস সাবমিশনের পূর্বে ফাইল মার্জ করতে, একাধিক স্লাইডকে একক ডকুমেন্টে রূপান্তর করতে, কিংবা বড় পিডিএফে থেকে নির্বাচিত অধ্যায় বা পৃষ্ঠা আলাদা করতে এই প্ল্যাটফর্ম জাদুর মতো কাজ করে। এছাড়াও মেমরি এআই চ্যাট বটের মাধ্যমে জটিল বৈজ্ঞানিক জার্নালের সংক্ষিপ্ত অনুবাদ এবং কুইজ বানিয়ে পরীক্ষার প্রস্তুতি গ্রহণ করা যায় অনায়াসেই।
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-150 dark:border-gray-900">
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl max-h-12 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">২. অফিস পেশাদার ও এক্সিকিউটিভ (Office Employees & Corporate Professionals)</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                 অফিসের নানাবিধ ফাইনান্সিয়াল স্প্রেডশীট এক্সেলে এক্সট্রাক্ট করা, বিভিন্ন কোম্পানির ব্রোশিওর বা রিপোর্টস কম্প্রেশন করা, ইমেজ থেকে Tesseract OCR-এর মাধ্যমে ডকুমেন্ট টেক্সট রিট্রিভ করা, বা এমএস ওয়ার্ড ডকের কনভার্টেশনের ক্ষেত্রে এটি দারুণ উপযোগী। ফাইল আপলোড করতে হয় না বলে কর্পোরেট ডেটা ফাঁসের কোনো ঝুঁকি থেকে চমৎকারভাবে নিজেদের মুক্ত রাখতে পারেন অফিসের দায়িত্বশীল কর্মকর্তাবৃন্দ।
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-white dark:bg-gray-950 rounded-2xl border border-gray-150 dark:border-gray-900">
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl max-h-12 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase">৩. আইনজীবী, হিসাবরক্ষক ও ব্যাংকিং সেবা (Lawyers, HRs & Finance Experts)</h4>
              <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                জরুরি ব্যবসায়িক চুক্তিনামাতে ইলেকট্রনিক স্বাক্ষর দেওয়া, সংবেদনশীল শর্তবাণী পাসওয়ার্ড লক দিয়ে কঠোর উপায়ে ইনক্রিপ্ট করা, আর্থিক তথ্যাবলীর অংশবিশেষ চিরতরে আড়াল করতে নিখুঁত রেড্যাকশন (Redaction) ব্যবহার করা এবং ডকুমেন্টে ওয়াটারমার্ক সিল লাগানোর মতো উচ্চপর্যায়ের আইনি ও দাপ্তরিক কাজ শতভাগ নিরাপদে সম্পাদন করতে এই টুল অত্যন্ত অনন্য।
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Guide Rules */}
      <section className="mb-8 p-6 sm:p-8 bg-blue-500/[0.02] border border-blue-500/10 rounded-3xl space-y-4">
        <h3 className="text-sm font-black uppercase text-center tracking-widest text-blue-600">
          অনলাইন পিডিএফে আধুনিক বিশ্বমানের সুরক্ষার ঠিকানা — PDFMaster
        </h3>
        <p className="text-[11.5px] sm:text-xs text-gray-550 dark:text-gray-400 text-center leading-relaxed font-semibold max-w-3xl mx-auto">
          মেমরি সেভিং অ্যালগরিদম ও লোকাল প্রসেসিং ইঞ্জিনের অসাধারণ চমৎকার মেলবন্ধন নিয়ে PDFMaster ব্রাউজারের ভেতর সবথেকে শক্তিশালী ও নিরাপদ পিডিএফ সহযোগী হয়ে উঠেছে প্রতিদিনের সহায়ক হিসেবে।
        </p>
      </section>
    </div>
  );
};
