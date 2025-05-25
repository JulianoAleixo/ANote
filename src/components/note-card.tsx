import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";

interface NoteCardProps {
    note: {
        id: string;
        date: Date;
        content: string;
    };
    onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex flex-col outline-none bg-zinc-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-zinc-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className="text-sm font-medium text-zinc-200">
                    {formatDistanceToNow(note.date, {
                        locale: ptBR,
                        addSuffix: true,
                    })}
                </span>
                <p className="text-sm leading-6 line-clamp-6 text-white">
                    {note.content}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-2/6 bg-gradient-to-t from-black to-black-0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-zinc-700 md:rounded-md flex flex-col outline-none">
                    <Dialog.Close className="absolute right-0 top-0 bg-zinc-800 p-1.5 text-zinc-400 hover:text-zinc-100">
                        <X className="size-5" />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
                        <span className="text-sm font-medium text-zinc-200 p-5 pb-0">
                            {formatDistanceToNow(note.date, {
                                locale: ptBR,
                                addSuffix: true,
                            })}
                        </span>
                        <div className="flex-1 overflow-auto px-5">
                            <p className="text-sm leading-6 text-zinc-400">
                                {note.content}
                            </p>
                        </div>

                        <button
                            onClick={() => onNoteDeleted(note.id)}
                            type="button"
                            className="w-full bg-zinc-800 py-4 text-center text-sm text-zinc-300 outline-none font-medium group"
                        >
                            Deseja{" "}
                            <span className="text-red-400 group-hover:underline">
                                apagar essa nota
                            </span>
                            ?
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
