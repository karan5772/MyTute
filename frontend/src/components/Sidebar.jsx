import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Upload,
  Trash2,
  ArrowLeft,
  Loader2,
  FileText,
  CheckCircle,
  X,
  Youtube,
} from "lucide-react";

const YouTubeLogo = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Sidebar = ({ isOpen, onClose, onClearChat }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Initialize documents from local storage
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("uploadedDocuments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("uploadedDocuments", JSON.stringify(documents));
  }, [documents]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    if (documents.some((doc) => doc.name === selectedFile.name)) {
      toast.error("This file has already been uploaded");
      return;
    }

    const loadingToast = toast.loading("Uploading document...");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Document processed successfully!", { id: loadingToast });

      const newDoc = {
        name: selectedFile.name,
        date: new Date().toLocaleDateString(),
        size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
        type: "pdf",
      };

      setDocuments((prev) => [...prev, newDoc]);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleYoutubeUpload = async () => {
    if (!youtubeUrl) return;

    const loadingToast = toast.loading("Processing YouTube video...");
    setUploading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/yt`, {
        url: youtubeUrl,
      });
      console.log(res);

      toast.success("Video processed successfully!", { id: loadingToast });

      const newDoc = {
        name: res.data.title,
        date: new Date().toLocaleDateString(),
        size: "Link",
        type: "youtube",
      };

      setDocuments((prev) => [...prev, newDoc]);
      setYoutubeUrl("");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to process video", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const performClearDB = async () => {
    const loadingToast = toast.loading("Clearing database...");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-embed`);
      setDocuments([]);
      localStorage.removeItem("uploadedDocuments");
      if (onClearChat) onClearChat();
      toast.success("Knowledge base cleared!", { id: loadingToast });
    } catch (error) {
      console.error("Clear DB error:", error);
      toast.error("Failed to clear database", { id: loadingToast });
    }
  };

  const handleClearDB = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 min-w-[200px]">
          <span className="font-medium text-sm text-center text-gray-800">
            Delete all documents?
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performClearDB();
              }}
              className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000, style: { maxWidth: "300px" } }
    );
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
          mt-16 md:mt-0 md:relative
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${
            isOpen
              ? "md:w-72 md:translate-x-0"
              : "md:w-0 md:translate-x-0 md:overflow-hidden md:border-none"
          }
        `}
        style={{ height: "calc(100vh - 4rem)" }} // Adjust height for navbar
      >
        {/* Mobile Close Button (Only visible on mobile) */}
        <div className="md:hidden p-4 pb-0 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-8">
          {/* Upload Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Add Knowledge
            </h3>
            <div
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-200 bg-gray-50/50 ${
                selectedFile
                  ? "border-black/20 bg-blue-50/30"
                  : "border-gray-200 hover:border-black/20"
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center gap-2 w-full"
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-sm border flex items-center justify-center transition-colors ${
                    selectedFile
                      ? "bg-black border-black"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <Upload
                    size={18}
                    className={selectedFile ? "text-white" : "text-gray-600"}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 truncate max-w-[180px]">
                  {selectedFile ? selectedFile.name : "Click to upload PDF"}
                </span>
                <span className="text-xs text-gray-400">PDF only</span>
              </label>
            </div>

            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Document"
                )}
              </button>
            )}
            {/* Divider */}
            <div className="relative flex items-center py-3">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink-0 px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider bg-white">
                Or Import From
              </span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            {/* YouTube Input */}
            <div className="relative group transition-all duration-200">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <div className="w-8 h-8 rounded-md flex items-center justify-center  transition-colors">
                  <YouTubeLogo className="w-full h-full text-red-600" />
                </div>
              </div>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="block w-full pl-13 pr-16 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-red-200 focus:ring-4 focus:ring-red-50/50 transition-all bg-white shadow-sm hover:border-gray-300"
                disabled={uploading}
              />
              <button
                onClick={handleYoutubeUpload}
                disabled={!youtubeUrl || uploading}
                className="absolute inset-y-1.5 right-1.5 px-3 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-0 disabled:translate-x-2 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
              >
                {uploading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <>
                    Add
                    <ArrowLeft size={10} className="rotate-180" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Processed Documents List */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Knowledge Base</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[10px]">
                {documents.length}
              </span>
            </h3>

            {documents.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                <p className="text-xs text-gray-400">
                  No documents uploaded yet
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 `}
                    >
                      {doc.type === "youtube" ? (
                        <YouTubeLogo className="w-6 h-6 text-red-600" />
                      ) : (
                        <FileText size={29} className="text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium text-gray-700 truncate"
                        title={doc.name}
                      >
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <CheckCircle size={10} className="text-green-500" />
                          Indexed
                        </span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] text-gray-400">
                          {doc.size}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-5  space-y-3 shrink-0">
          <button
            onClick={handleClearDB}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-white hover:bg-red-50 rounded-xl transition-colors border border-gray-200 hover:border-red-200 shadow-sm"
          >
            <Trash2 size={16} />
            Clear Knowledge Base
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden mt-16"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
