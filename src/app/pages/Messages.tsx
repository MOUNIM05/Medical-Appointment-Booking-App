import { useMemo, useState } from 'react';
import { ArrowLeft, Send, Circle, Search, Phone, Video } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { mockDoctors } from '../data/mockData';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

type Message = { from: 'doctor' | 'me'; text: string; time: string };

export function Messages() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultId = searchParams.get('doctorId') ?? mockDoctors[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const [draft, setDraft] = useState('');

  const threads = useMemo(
    () =>
      mockDoctors.map((doc, idx) => ({
        id: doc.id,
        name: doc.name,
        specialty: doc.specialty,
        image: doc.image,
        unread: idx === 0 ? 2 : 0,
        online: idx % 3 !== 0,
        last: 'À tout à l’heure pour la consultation.',
      })),
    []
  );

  const conversation: Message[] = [
    { from: 'doctor', text: 'Bonjour, comment puis-je vous aider aujourd’hui ?', time: '09:12' },
    { from: 'me', text: 'J’aimerais confirmer notre rendez-vous de demain.', time: '09:13' },
    { from: 'doctor', text: 'Parfait, je vous attends à 10h00. Apportez vos résultats.', time: '09:14' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Messages</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <Card className="border border-slate-200 rounded-2xl">
          <CardContent className="p-3 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input placeholder="Rechercher" className="pl-9 h-10 bg-slate-50 border-slate-200" />
            </div>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedId(thread.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition ${
                    selectedId === thread.id ? 'bg-[#eef1ff]' : 'hover:bg-slate-50'
                  }`}
                >
                  <img src={thread.image} alt={thread.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{thread.name}</p>
                      {thread.online && <Circle className="w-2.5 h-2.5 text-green-500 fill-green-500" />}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{thread.last}</p>
                  </div>
                  {thread.unread > 0 && (
                    <span className="ml-auto text-[11px] bg-[#5a6ff0] text-white px-2 py-0.5 rounded-full">
                      {thread.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <img
                src={threads.find((t) => t.id === selectedId)?.image}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{threads.find((t) => t.id === selectedId)?.name}</p>
                <p className="text-xs text-slate-500">{threads.find((t) => t.id === selectedId)?.specialty}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-[#5a6ff0] border-[#dfe3ff]" onClick={() => navigate(`/doctor/${selectedId}`)}>
                  <Phone className="w-4 h-4" />
                </Button>
                <Button className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-72 overflow-auto bg-white">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-2xl px-3 py-2 max-w-[75%] text-sm shadow-sm ${
                      msg.from === 'me'
                        ? 'bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[10px] block mt-1 opacity-70">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Écrire un message"
                className="h-11 rounded-xl bg-white border-slate-200"
              />
              <Button className="bg-gradient-to-r from-[#5a6ff0] to-[#6ad0f5] text-white h-11 px-4" onClick={() => setDraft('')}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
