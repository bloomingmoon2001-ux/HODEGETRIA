"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Сообщение отправлено");
    setMessage("");
    setIsSending(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
          <div className="w-full sm:max-w-md bg-background rounded-t-xl sm:rounded-xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Обратная связь</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Сообщение</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишите ваш вопрос или пожелание..."
                  required
                  rows={5}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSending || !message.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
