import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  FaEnvelope,
  FaTrash,
  FaUser,
  FaCalendarDays,
  FaMessage,
  FaArrowRotateRight,
} from "react-icons/fa6";

import api from "../../config/Api";
import { useAuth } from "../../context/AuthContext";

const ContactMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMessages = async (showToast = false) => {
    try {
      setLoading(true);
      const res = await api.get("/admin/contact-messages");
      setMessages(res.data?.data || []);
      if (showToast) {
        toast.success("Contact messages refreshed");
      }
    } catch (error) {
      console.error(error);

      if (showToast) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to refresh contact messages",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRefresh = () => {
    fetchMessages(true);
  };

  const handleDelete = async (id) => {
    //Dummy Admin can't perform this action

    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      const res = await api.delete(`/admin/contact-messages/${id}`);
      setMessages((prev) => prev.filter((message) => message._id !== id));
      toast.success(
        res.data?.message || "Contact message deleted successfully",
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete contact message",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && messages.length === 0) {
    return (
      <div className="py-10">
        <p className="text-sm font-bold text-[#8A7C6A]">
          Loading contact messages...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-[#1F1811]/20 pb-4">
        <div>
          <h1 className="font-[Archivo_Black] text-xl uppercase text-[#1F1811] sm:text-2xl">
            Contact Messages
          </h1>

          <p className="mt-1 text-sm text-[#8A7C6A]">
            Review customer questions, feedback and reported issues.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaArrowRotateRight className={loading ? "animate-spin" : ""} />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Count */}
      <div className="mt-4">
        <p className="text-xs font-bold text-[#8A7C6A]">
          Total Messages:{" "}
          <span className="text-[#E8491D]">{messages.length}</span>
        </p>
      </div>

      {/* Empty State */}
      {messages.length === 0 ? (
        <div className="mt-4 bg-white p-6 text-center shadow-[0_15px_40px_-20px_rgba(31,24,17,0.35)]">
          <div className="mx-auto flex size-11 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
            <FaEnvelope className="text-base" />
          </div>

          <h2 className="mt-3 font-[Archivo_Black] text-base uppercase text-[#1F1811]">
            No Messages Found
          </h2>

          <p className="mt-1 text-xs text-[#8A7C6A]">
            Customer contact messages will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {messages.map((message) => (
            <article
              key={message._id}
              className="bg-white shadow-[0_15px_40px_-20px_rgba(31,24,17,0.35)]"
            >
              {/* Top */}
              <div className="flex flex-row items-center justify-between gap-3 border-b border-dashed border-[#1F1811]/15 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                    <FaUser className="text-xs" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-[#1F1811]">
                      {message.fullName || "Unknown User"}
                    </h2>

                    <p className="mt-0.5 truncate text-xs text-[#8A7C6A]">
                      {message.email || "No email available"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(message._id)}
                  disabled={deletingId === message._id}
                  className="flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-[#FBF3E7] px-3 py-2 text-[11px] font-bold text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaTrash className="text-xs" />

                  {deletingId === message._id ? "Deleting..." : "Delete"}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <FaMessage className="text-xs text-[#E8491D]" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Subject
                  </p>
                </div>

                <h3 className="mt-1.5 text-base font-bold text-[#1F1811]">
                  {message.subject || "No Subject"}
                </h3>

                <div className="mt-3 border-l-2 border-[#E8491D] bg-[#FBF3E7] px-3 py-2.5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#1F1811]/80">
                    {message.query || "No message provided"}
                  </p>
                </div>

                {/* Date */}
                <div className="mt-3 flex items-center gap-2 border-t border-dashed border-[#1F1811]/15 pt-3 text-[11px] text-[#8A7C6A]">
                  <FaCalendarDays className="text-[#E8491D]" />

                  <span>
                    Received on{" "}
                    <span className="font-bold text-[#1F1811]">
                      {formatDate(message.createdAt)}
                    </span>
                    {" at "}
                    <span className="font-bold text-[#1F1811]">
                      {formatTime(message.createdAt)}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
